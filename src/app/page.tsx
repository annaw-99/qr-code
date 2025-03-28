import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="flex items-center justify-center flex-grow">
        <main className="flex flex-col gap-[32px] max-w-3xl mx-auto items-center text-center pt-16 px-10">
          <h3 className="font-bold text-6xl">Create Customized QR Codes in Seconds</h3>
          <p className="text-md">
            Generate high-quality, customizable QR codes instantly — choose colors and sizes, 
            download print-ready PNGs, and create codes for URLs and messages with no sign-up required.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/generator">Get Started</Link>
            </Button>
          </div>
        </main>
      </div>
  
      <footer className="text-center mt-auto pt-16 pb-2 2xl:pb-8">
        <p className="font-semi-bold text-gray-300 text-[10px]">
          &copy; 2025. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
