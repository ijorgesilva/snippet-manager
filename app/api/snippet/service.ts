import { db } from "@/lib/db";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from 'zod';

const readAllSnippetSchema = z.object({
  title : z.string().optional(),
  content: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  technology: z.nativeEnum(Technology).optional(),
}).refine((data)=>Object.values(data).some((value => value !== undefined)));

export async function readAllSnippet(filters: Partial<Snippet>) {
  try {
    readAllSnippetSchema.parse(filters);
  } catch(e){
    return { 
      error: true,
      status: 500,
      message:'Wrong filter provided'+e,
    };
  }
  return await db.snippet.findMany(
    { 
      where: {
        ...filters
      }
    }
  );
}

const createSnippedSchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});
export async function createSnippet(body: Omit<Snippet, 'id'>){
  try {
    readAllSnippetSchema.parse(body);
  } catch(e){
    return { 
      error: true,
      status: 500,
      message:'Missing or wrong data '+e,
    };
  }
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