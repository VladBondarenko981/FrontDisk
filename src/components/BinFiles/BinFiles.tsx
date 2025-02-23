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
      console.log(filesData);
    };

    fetchFiles();
  }, []);

  const handleRename = async (fileName: string, newName: string) => {
    renameFile(fileName, newName); // await ??
    window.location.reload();
  };

  const handleDelete = async (fileName: string) => {
    console.log("Пробуем удалить файл");
    deleteFile(fileName); // await ??
    console.log("Файл удален");
    window.location.reload();
  };

  const binFiles = files.filter((file) => file.isDeleted);

  return (
    <table className="w-screen table-auto">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-4 py-2 text-left">Название</th>
          <th className="px-4 py-2 text-left">Тип файла</th>
          <th className="px-4 py-2 text-left">Размер</th>
          <th className="px-4 py-2 text-right">Действия</th>
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
