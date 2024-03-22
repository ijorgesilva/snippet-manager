import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from 'zod';

const updateSnippetSchema = z
  .object({
    title : z.string().optional(),
    content: z.string().optional(),
    language: z.nativeEnum(Language).optional(),
    technology: z.nativeEnum(Technology).optional(),
  })
  .refine( data => Object.keys(data).length > 0, {message: 'At least one value must be provided'});
export async function updateSnippet(
  id: number,
  body: Partial<Omit<Snippet, 'id'>>
) {
  if(!auth().userId){
    return {
      error: true,
      status: 401,
      message: 'You must be logged in',
    }
  }
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

const deleteSnippetSchema =  z.number();
export async function deleteSnippet(
  id: number,
) {
  if(!auth().userId){
    return {
      error: true,
      status: 401,
      message: 'You must be logged in',
    }
  }
  try{
    deleteSnippetSchema.parse(id)
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