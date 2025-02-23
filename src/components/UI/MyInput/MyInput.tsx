import React from "react";

interface MyInputProps {
  type: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const MyInput: React.FC<MyInputProps> = ({ type, value, onChange }) => {
  return (
    <input
      className="border-2 h-[50px] w-[400px] border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black bg-gray-50 shadow-md hover:bg-gray-100 transition-all duration-200"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
