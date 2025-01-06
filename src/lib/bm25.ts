import { Document } from "@langchain/core/documents";
import { BM25Retriever } from "@langchain/community/retrievers/bm25";

import { readFileSync } from "fs";
import path from "path";

interface StockData {
  Ticker: string;
  Name: string;
  "Business Summary": string;
  City: string;
  State: string;
  Country: string;
  Industry: string;
  Sector: string;
}

export const bm25Retriever = (() => {
  try {
    const filePath = path.join(process.cwd(), "src/data/stocks.json");
    const jsonContent = JSON.parse(
      readFileSync(filePath, "utf-8")
    ) as StockData[];

    const documents = jsonContent.map((item) => {
      const pageContent = Object.entries(item)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ");

      return new Document({
        pageContent,
        metadata: item,
      });
    });

    return BM25Retriever.fromDocuments(documents, { k: 5 });
  } catch (error) {
    console.error("Error initializing BM25 retriever:", error);
    throw error;
  }
})();
