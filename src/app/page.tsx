import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center flex-grow">
        <main className="flex flex-col gap-[32px] max-w-3xl mx-auto items-center text-center pt-16">
          <h3 className="font-bold text-6xl">Create Customized QR Codes in Seconds</h3>
          <p className="font text-md">
            Generate high-quality, customizable QR codes instantly—choose colors and sizes, 
            download print-ready PNGs, and create codes for URLs, text, contacts, or Wi-Fi 
            with no sign-up required.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/generator">Get Started</Link>
            </Button>
          </div>
        </main>
      </div>
  
      <footer className="flex gap-[24px] flex-wrap items-center justify-center mt-auto pt-16">
        <p className="font-semi-bold text-gray-300 text-[10px]">
          &copy; 2025. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
