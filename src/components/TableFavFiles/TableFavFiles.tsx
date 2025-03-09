import React, { useEffect, useState } from "react";
import TableRow from "../TableFiles/TableRow.tsx";
import { getFiles } from "../../api/filesApi.ts";
import { deleteFile } from "../../api/filesApi.ts";
import { renameFile } from "../../api/filesApi.ts";
import { File } from "../../interfaces/Interfaces.tsx";

interface TableFavFilesProps {
  searchTerm: string;
}

const TableFavFiles: React.FC<TableFavFilesProps> = ({ searchTerm }) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesData = await getFiles();
      setFiles(filesData || []);
    };

    fetchFiles();
  }, []);

  const handleRename = async (fileName: string, newName: string) => {
    renameFile(fileName, newName);
    window.location.reload();
  };

  const handleDelete = async (fileName: string) => {
    deleteFile(fileName);
    // window.location.reload();
  };

  const favoriteFiles = files.filter((file) => file.favFile && !file.deletedAt);

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
        {favoriteFiles?.map((file) => (
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

export default TableFavFiles;
