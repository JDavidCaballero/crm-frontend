import React from "react"

interface SearchInputProps {
  searchTerm: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearch,
  placeholder = "Ingresa un nombre o apellido",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default SearchInput
