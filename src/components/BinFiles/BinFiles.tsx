import React, { useEffect, useState } from "react";
import TableRow from "../TableFiles/TableRow.tsx";
import { deleteFile, getFiles, renameFile } from "../../api/filesApi.ts";
import { File } from "../../interfaces/Interfaces.tsx";

interface BinFilesProps {
  searchTerm: string;
}

const BinFiles: React.FC<BinFilesProps> = ({ searchTerm }) => {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    const fetchFiles = async () => {
      const filesData = await getFiles();
      setFiles(filesData);
    };

    fetchFiles();
  }, []);

  const handleRename = async (fileName: string, newName: string) => {
    renameFile(fileName, newName);
    window.location.reload();
  };

  const handleDelete = async (fileName: string) => {
    deleteFile(fileName);
    window.location.reload();
  };

  const binFiles = files.filter((file) => file.isDeleted);

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
        {binFiles?.map((file) => (
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

export default BinFiles;
