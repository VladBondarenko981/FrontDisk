import React, { useEffect, useState } from "react";
import TableRow from "./TableRow.tsx";
import { deleteFile, getFiles, renameFile } from "../../api/filesApi.ts";
import { File } from "../../interfaces/Interfaces.tsx";
import io from "socket.io-client";

interface TableFilesProps {
  searchTerm: string;
}

const TableFiles: React.FC<TableFilesProps> = ({ searchTerm }) => {
  const socket = io("http://localhost:5000");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesData = await getFiles();
      setFiles(filesData || []);
    };
    fetchFiles();
    socket.on("filesUpdated", (updatedFile) => {
      if (updatedFile.action === "deleted") {
        setFiles((prevFiles) =>
          prevFiles.filter((file) => file.filename !== updatedFile.filename)
        );
      } else if (updatedFile.action === "rename") {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.filename === updatedFile.fileName
              ? { ...file, filename: updatedFile.newName }
              : file
          )
        );
      }
    });
    return () => {
      socket.off("filesUpdated");
    };
  }, [socket]);

  const handleRename = async (fileName: string, newName: string) => {
    await renameFile(fileName, newName);
    socket.emit("fileUpdate", { fileName, newName, action: "rename" });
  };

  const handleDelete = async (fileName: string) => {
    await deleteFile(fileName);
    socket.emit("fileUpdate", { fileName, action: "deleted" });
  };

  const filteredFiles = files
    ? files.filter((file) => {
        if (!searchTerm) {
          return !file.deletedAt;
        }
        return (
          !file.deletedAt &&
          file.filename.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <table className="w-screen table-auto">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">File type</th>
          <th className="px-4 py-2 text-left">Size</th>
          <th className="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredFiles?.map((file) => (
          <TableRow
            key={file.id}
            name={file.filename}
            mimetype={file.mimetype}
            size={file.size}
            favFile={file.favFile}
            filename={file.filename}
            onRename={(newName) => handleRename(file.filename, newName)}
            onDelete={() => handleDelete(file.filename)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableFiles;
