import NFTGallery from "@/components/gallery";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mt-10">
        <div id="loadMore" className="mt-10">
          <NFTGallery />
        </div>
      </div>
    </main>
  );
}
