import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { NextResponse } from "next/server";
import { bm25Retriever } from "@/lib/bm25";
import { OpenAIEmbeddings } from "@langchain/openai";
import { EnsembleRetriever } from "langchain/retrievers/ensemble";

interface SearchRequest {
  query: string;
  searchType: string;
}

// type definition
type SearchType = "keyword" | "semantic" | "hybrid";

// weight mapping
const SEARCH_WEIGHTS: Record<SearchType, [number, number]> = {
  keyword: [1.0, 0.0],
  semantic: [0.0, 1.0],
  hybrid: [0.5, 0.5],
};

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function POST(request: Request) {
  try {
    const { query, searchType } = (await request.json()) as SearchRequest;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query must be a string." },
        { status: 400 }
      );
    }

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const vectorstore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY!,
        model: "text-embedding-3-small",
      }),
      { pineconeIndex: index }
    );

    const vectorStoreRetriever = vectorstore.asRetriever({ k: 5 });

    const ensembleRetriever = new EnsembleRetriever({
      retrievers: [bm25Retriever, vectorStoreRetriever],
      weights: SEARCH_WEIGHTS[searchType as SearchType],
    });

    const relevantContent = await ensembleRetriever.invoke(query);

    return NextResponse.json(
      { relevantContent: relevantContent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve relevant content." },
      { status: 500 }
    );
  }
}
