import ReactMarkdown from "react-markdown";

interface SearchResultsProps {
  results: string[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full py-3">
        {results.map((text, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg mb-6 bg-gray-100 shadow-[0_0_8px_rgba(0,0,0,0.1)]"
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
