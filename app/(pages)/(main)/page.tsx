import { db } from "@/lib/db"
import { readAllSnippet } from "@/app/api/snippet/service";

export default async function MainPage(){
  const snippets = await readAllSnippet();

  return <div className="text-white"></div>
}