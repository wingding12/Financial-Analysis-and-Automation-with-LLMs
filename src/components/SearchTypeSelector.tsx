import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SearchType = "keyword" | "semantic" | "hybrid";

interface SearchTypeSelectorProps {
  onSearchTypeChange: (type: SearchType) => void;
  defaultValue?: SearchType;
}

export function SearchTypeSelector({
  onSearchTypeChange,
  defaultValue = "keyword",
}: SearchTypeSelectorProps) {
  return (
    <div className="flex justify-center mt-8">
      <Select
        defaultValue={defaultValue}
        onValueChange={(value: SearchType) => onSearchTypeChange(value)}
      >
        <div className="">
          <SelectTrigger className="w-[168px] h-[54px] text-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 shadow-lg">
            <SelectValue placeholder="Select search type" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectItem
            value="keyword"
            // className="px-6 py-3"
          >
            Keyword Search
          </SelectItem>
          <SelectItem
            value="semantic"
            // className="px-6 py-3"
          >
            Semantic Search
          </SelectItem>
          <SelectItem
            value="hybrid"
            // className="px-6 py-3"
          >
            Hybrid Search
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
