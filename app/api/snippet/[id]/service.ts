import { db } from "@/lib/db";
import { Snippet } from "@prisma/client";

export async function updateSnippet(
  id: number,
  body: Partial<Omit<Snippet, 'id'>>
) {
  try{
    return await db.snippet.update({data: body, where:{ id }});
  }
  catch(err){
    return {
      error: true,
      status: 500,
      message: 'Something when wrong when creating the snippet: ' + (err as Error),
    }
  }
}

export async function deleteSnippet(
  id: number,
) {
  try{
    return await db.snippet.delete({where:{ id }});
  }
  catch(err){
    return {
      error: true,
      status: 500,
      message: 'Something when wrong when creating the snippet: ' + (err as Error),
    }
  }
}