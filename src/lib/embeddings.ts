export async function getQueryEmbedding(query: string) {
  try {
    const response = await fetch("/api/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate query embedding.");
    }

    const { embedding } = await response.json();
    return embedding;
  } catch (error) {
    console.error("Error generating query embedding: ", error);
    throw error;
  }
}
