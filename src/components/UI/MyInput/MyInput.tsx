import React from "react";

interface MyInputProps {
  type: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const MyInput: React.FC<MyInputProps> = ({ type, value, onChange }) => {
  return (
    <input
      className="border-2 border-gray-300 rounded-xl p-4 w-[400px] h-[50px] bg-gray-50 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
