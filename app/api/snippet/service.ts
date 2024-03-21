import { db } from "@/lib/db";
import { Snippet } from "@prisma/client";

export async function readAllSnippet(filters: Partial<Snippet>) {
  return await db.snippet.findMany(
    { 
      where: {
        ...filters
      }
    }
  );
}

export async function createSnippet(body: Omit<Snippet, 'id'>){
  try{
    return await db.snippet.create({data: body});
  }
  catch(err){
    return {
      error: true,
      status: 500,
      message: 'Something when wrong when creating the snippet: ' + (err as Error),
    }
  }
}