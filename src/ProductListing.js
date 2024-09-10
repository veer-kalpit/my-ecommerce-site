// src/ProductListing.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 9; // Number of products per page

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        // Extract unique categories from the products
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(["All", ...uniqueCategories]);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Listing</h1>

      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4 text-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-1 border rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="relative border p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 text-center overflow-hidden"
          >
            {/* Product Info */}
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <Link
              to={`/products/${product.id}`}
              className="text-blue-500 mt-2 block hover:underline"
            >
              View Details
            </Link>

            {/* Hover Details */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-75 text-white p-4 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h3 className="text-lg font-bold mb-2">More Details</h3>
              <p>{product.description}</p>
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center">
          <button
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductListing;
