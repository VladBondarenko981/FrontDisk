import React from "react";
import MyInput from "../UI/MyInput/MyInput.tsx";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div className="flex items-center space-x-2">
      <MyInput type="text" onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
