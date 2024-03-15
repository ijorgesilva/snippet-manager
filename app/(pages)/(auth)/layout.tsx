import { Inter } from "next/font/google";
import "@/app/(pages)/globals.css";
import Header from "@/app/components/Header/Header";
import Image from "next/image";
import LogoPng from '/public/images/logo.png'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="flex-1 flex flex-col space-y-4 items-center justify-center shadow-2xl rounded-bl-md rounded-br-md">
        <Image src={LogoPng} alt="Logo"/>
        <div className="text-2xl text-white text-center">The one place for all your code snippets</div>
      </div>
    </div>
  );
}
