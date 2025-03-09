import React from "react";

interface MyButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyButton: React.FC<MyButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="border-2 border-transparent rounded-full p-4 bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 shadow-lg active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
