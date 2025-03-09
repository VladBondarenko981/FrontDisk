import React, { useState } from "react";
import TableActionIcon from "../TableIcon/TableActionIcon.tsx";
import TableActionFavIcon from "../TableIcon/TableActionFavIcon.tsx";
import TableActionDownloadIcon from "../TableIcon/TableActionDownloadIcon.tsx";
import { openFile } from "../../api/filesApi.ts";

interface TableRowProps {
  name: string;
  mimetype: string;
  size: number;
  favFile: boolean;
  filename: string;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  name,
  mimetype,
  size,
  favFile,
  filename,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);

  const handleOpen = async () => {
    if (!isEditing) await openFile(filename);
  };

  const handleRename = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (newName !== name) {
      await onRename(newName);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      if (newName !== name) {
        await onRename(newName);
      }
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
      setNewName(name);
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <tr className="border-b h-[50px] hover:bg-gray-200">
      <td className="px-4 py-2 hover:font-bold">
        <span
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onClick={handleOpen}
          onBlur={handleBlur}
          onInput={(e) => setNewName(e.currentTarget.textContent || "")}
          onKeyDown={handleKeyDown}
          className={`inline-block ${
            isEditing ? "border-b border-gray-400" : ""
          }`}
        >
          {newName}
        </span>
      </td>
      <td className="px-4 py-2">{mimetype}</td>
      <td className="px-4 py-2">{(size / 1000000).toFixed(2)} Mb</td>
      <td className="px-4 py-2">
        <div className="flex flex-row justify-center gap-5">
          <TableActionFavIcon
            src="http://surl.li/xyoabd"
            alt="favorite"
            tooltip="Add to favorites"
            favFile={favFile}
            filename={filename}
          />
          <TableActionDownloadIcon
            src="http://surl.li/jpxuua"
            alt="download"
            tooltip="Download"
            filename={filename}
          />
          <TableActionIcon
            src="http://surl.li/dkhprx"
            alt="rename"
            tooltip="Rename"
            onClick={handleRename}
          />
          <TableActionIcon
            src="https://goo.su/YjHa"
            alt="delete"
            tooltip="Add to cart"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
