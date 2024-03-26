import Header from "@/app/components/Header/Header";
import { Nav } from "@/app/components/Nav/Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <div className="flex p-8 gap-3">
        <div className="basis-1/5">
          <Nav />
        </div>
        <main className="basis-4/5">
          {children}
        </main>
      </div>
    </div>
  );
}