import React from "react";

interface TableActionIconProps {
  src: string;
  alt: string;
  tooltip: string;
  onClick?: () => void;
}

const TableActionIcon: React.FC<TableActionIconProps> = ({
  src,
  alt,
  tooltip,
  onClick,
}) => {
  return (
    <div className="relative group">
      <img
        src={src}
        className="h-[25px] hover:bg-gray-100 hover:border-black hover:border-2 rounded cursor-pointer"
        alt={alt}
        onClick={onClick}
      />
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
        {tooltip}
      </span>
    </div>
  );
};

export default TableActionIcon;
