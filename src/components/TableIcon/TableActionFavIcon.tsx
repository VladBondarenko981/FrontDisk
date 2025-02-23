import React from "react";
import { handleLogin } from "../../api/authApi.ts";
import { redactFileFavOption } from "../../api/filesApi.ts";

interface TableActionIconProps {
  src: string;
  alt: string;
  tooltip: string;
  favFile: boolean;
  filename: string;
}

const TableActionIcon: React.FC<TableActionIconProps> = ({
  src,
  alt,
  tooltip,
  favFile,
  filename,
}) => {
  const setFavFileFalse = async () => {
    await redactFileFavOption({ filename: filename, favOption: false });
    window.location.reload();
  };
  const setFavFileTrue = async () => {
    await redactFileFavOption({ filename: filename, favOption: true });
    window.location.reload();
  };
  return (
    <div className="relative group">
      {favFile ? (
        <img
          src={src}
          className="h-[25px] bg-yellow-500 hover:bg-yellow-500 hover:border-black hover:border-2 rounded cursor-pointer"
          alt={alt}
          onClick={setFavFileFalse}
        />
      ) : (
        <img
          src={src}
          className="h-[25px] hover:bg-gray-100 hover:border-black hover:border-2 rounded cursor-pointer"
          alt={alt}
          onClick={setFavFileTrue}
        />
      )}
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
        {tooltip}
      </span>
    </div>
  );
};

export default TableActionIcon;
