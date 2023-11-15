import { auth } from "@clerk/nextjs";
import { notesIndex } from "@noteai/app/lib/db/pinecone";
import prisma from "@noteai/app/lib/db/prisma";
import openai, { getEmbedding } from "@noteai/app/lib/openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body)
    const messages: ChatCompletionMessage[] = body.messages;
    if (!Array.isArray(messages)) {
        // Handle the error appropriately
        return Response.json({ error: "Invalid message format" }, { status: 400 });
      }
    const messageTruncated = messages.slice(-6);
    const embedding = await getEmbedding(
      messageTruncated.map((message) => message.content).join("\n"),
    );
    const { userId } = auth();
    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });
    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });
    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an intelligent note-taking app. You answer to use question base on ther existing notes. " +
        "the relevant notes for this query are:\n" +
        relevantNotes
          .map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`)
          .join("\n\n"),
    };
    const respone = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messageTruncated],
    });
    const stream = OpenAIStream(respone);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
