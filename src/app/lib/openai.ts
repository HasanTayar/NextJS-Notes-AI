import OpenAI from "openai";
const apiKey = process.env.NEXT_OPEN_AI_KEY;

if (!apiKey) {
  throw Error("NEXT_OPEN_AI_KEY is not set");
}
const openai = new OpenAI({ apiKey });
export default openai;

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  const embedding = response.data[0].embedding;
  if (!embedding) throw Error("Error genrating embedding");
  console.log(embedding);
  return embedding;
}
