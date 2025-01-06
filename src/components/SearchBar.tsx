"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

interface Metadata {
  text: string;
  // TO-DO: Add other metadata fields if needed
}

// Match interface matching the structure
export interface Match {
  id: string;
  score: number;
  metadata: Metadata;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && !isLoading) {
      onSearch(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-8">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className={`w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 shadow-lg ${isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      ></input>
    </form>
  );
}
