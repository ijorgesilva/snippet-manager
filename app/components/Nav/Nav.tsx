import { SNIPPETS_METADATA, SnippetMetadata } from "@/constant"
import Image from "next/image";
import Link from "next/link";

export function Nav(p: {}){
  const renderLinkItem = (snippedMetadata: SnippetMetadata) => {
    return <li key={snippedMetadata.technology} className="transition transform hover:scale-125">
      <Link href={`/snippets/technology/${snippedMetadata.technology}`} title='' className="flex items-center gap-4 font-semibold">
        <Image src={snippedMetadata.src} alt={`Icon for ${snippedMetadata.technology}`} width={30} height={30}/>
        {snippedMetadata.label}
      </Link>
    </li>
  };
  
  return <aside className="flex text-white bg-main-900 py-8 px-6 text-sm rounded-lg">
    <ul className="space-y-4">
      {Object.values(SNIPPETS_METADATA).map(renderLinkItem)}
    </ul>
  </aside>
}