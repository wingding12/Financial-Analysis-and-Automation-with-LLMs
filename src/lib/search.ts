type SearchType = "keyword" | "semantic" | "hybrid";

export async function getRelevantContent(
  query: string,
  searchType: SearchType
) {
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, searchType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to retrive relevant content.");
    }

    const data = await response.json();
    return data;
  } catch (error) {}
}
