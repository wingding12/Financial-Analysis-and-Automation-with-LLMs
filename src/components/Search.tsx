"use client";

import { useState } from "react";
import { Match, SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { getRelevantContent } from "@/lib/search";
import { Loader2 } from "lucide-react";
import { SearchTypeSelector } from "@/components/SearchTypeSelector";

const formatMetadataToMarkdown = (metadata: any): string => {
  const fields = [
    "Ticker",
    "Name",
    "City",
    "State",
    "Country",
    "Industry",
    "Sector",
    "Business Summary",
  ];

  return fields
    .map((field) => `**${field}:**\n${metadata[field] || "N/A"}`)
    .join("\n\n");
};

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<
    "keyword" | "semantic" | "hybrid"
  >("keyword");

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const { relevantContent } = await getRelevantContent(query, searchType);

      const formattedContent = relevantContent.map((match: Match) =>
        formatMetadataToMarkdown(match.metadata)
      );

      setSearchResults(formattedContent);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 items-center mb-4">
        <SearchTypeSelector
          onSearchTypeChange={setSearchType}
          defaultValue={searchType}
        />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-16">
          <Loader2 className="h-16 w-16 animate-spin text-gray-500" />
        </div>
      ) : (
        searchResults.length > 0 && <SearchResults results={searchResults} />
      )}
    </div>
  );
}
