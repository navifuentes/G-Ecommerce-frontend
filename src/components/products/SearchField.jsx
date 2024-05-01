import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ products }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    products
      ? setSearchResults(
          products.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : null;
  }, [searchTerm]);

  // Function to handle search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle clicking on a search result
  const handleResultClick = (result) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/products/${result._id}`);
  };

  // Function to handle clicks outside of the input field and dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setSearchResults([]);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-black" ref={dropdownRef}>
      <input
        type="text"
        className="w-full max-h-5 px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded border border-gray-300 shadow-lg">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleResultClick(result)}
            >
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
