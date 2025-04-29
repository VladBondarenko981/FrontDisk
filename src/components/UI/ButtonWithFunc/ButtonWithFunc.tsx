import React from "react";

interface ButtonWithFuncProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonWithFunc: React.FC<ButtonWithFuncProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-transparent rounded-full p-4 bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 shadow-lg active:scale-95"
    >
      {children}
    </button>
  );
};

export default ButtonWithFunc;
