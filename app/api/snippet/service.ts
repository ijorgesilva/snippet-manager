import { db } from "@/lib/db";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from 'zod';
import { checkCredentials } from "../utils";
import { auth } from "@clerk/nextjs";

const readAllSnippetSchema = z
  .object({
    title : z.string().optional(),
    content: z.string().optional(),
    language: z.nativeEnum(Language).optional(),
    technology: z.nativeEnum(Technology).optional(),
  })
  .optional();

export async function readAllSnippet(filters?: Partial<Snippet>) {
  if(!auth().userId){
    return {
      error: true,
      status: 401,
      message: 'You must be logged in',
    }
  }

  try {
    readAllSnippetSchema.parse(filters);
    return await db.snippet.findMany(
      { 
        where: {
          ...filters
        }
      }
    );
  } catch(e){
    return { 
      error: true,
      status: 500,
      message:'Wrong filter provided'+e,
    };
  }
}

const createSnippedSchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});
export async function createSnippet(body: Omit<Snippet, 'id'>){
  if(!auth().userId){
    return {
      error: true,
      status: 401,
      message: 'You must be logged in',
    }
  }
  try{
    readAllSnippetSchema.parse(body);
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