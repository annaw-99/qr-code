'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Generator() {
  const [text, setText] = useState<string>('https://example.com');
  const [size, setSize] = useState<number>(200);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [darkColor, setDarkColor] = useState<string>('#000000');
  const [lightColor, setLightColor] = useState<string>('#ffffff');
  const qrRef = useRef<HTMLDivElement | null>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      toast.error("Error creating QR code image");
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      // modified for clearer image
      const scaleFactor = 4;
      canvas.width = size * scaleFactor;
      canvas.height = size * scaleFactor;

      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();

      toast.success("QR code downloaded successfully");
    };

    img.onerror = () => {
      toast.error("Failed to generate QR code image");
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center justify-center flex-grow">
      <main className="flex flex-col items-center w-full max-w-6xl mx-auto">
        <h3 className="font-bold text-5xl mb-8">Generate Your QR Code</h3>
        
        <div className="flex flex-col md:flex-row w-full justify-center">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            <div className="w-full max-w-md mx-auto">
              <label className="block text-left text-sm font-medium mb-2" htmlFor="content">
                Enter or Paste URL:
              </label>
              <Input
                id="content"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL here (e.g. https://example.com)"
                className="w-full"
              />
            </div>

            {/* Customization Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md mx-auto">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="size" className="text-left text-sm font-medium">Size:</label>
                <Select value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
                  <SelectTrigger className='w-full'>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">Small (128 × 128)</SelectItem>
                    <SelectItem value="200">Medium (200 × 200)</SelectItem>
                    <SelectItem value="300">Large (300 × 300)</SelectItem>
                    <SelectItem value="400">Extra Large (400 × 400)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="error-correction" className="text-left text-sm font-medium">Error Correction:</label>
                <Select value={errorCorrection} onValueChange={(value) => setErrorCorrection(value as 'L' | 'M' | 'Q' | 'H')}>
                  <SelectTrigger className='w-full'>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-left text-sm font-medium mb-2" htmlFor="dark-color">
                  Dark Color:
                </label>
                <div className="relative w-full h-10">
                  <div className="w-full h-full border rounded-md overflow-hidden">
                    <div 
                      className="w-full h-full" 
                      style={{ backgroundColor: darkColor }}
                    ></div>
                  </div>
                  
                  <input
                    type="color"
                    id="dark-color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-left text-sm font-medium mb-2" htmlFor="light-color">
                  Light Color:
                </label>
                <div className="relative w-full h-10">
                  <div className="w-full h-full border rounded-md overflow-hidden">
                    <div 
                      className="w-full h-full" 
                      style={{ backgroundColor: lightColor }}
                    ></div>
                  </div>
                  
                  <input
                    type="color"
                    id="light-color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
            </div>
          </div>
          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div ref={qrRef} className="bg-white p-6 rounded-md shadow-md">
              <QRCodeSVG
                value={text || 'https://example.com'}
                size={200}
                level={errorCorrection}
                fgColor={darkColor}
                bgColor={lightColor}
                includeMargin={true}
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button onClick={downloadQRCode} className="cursor-pointer">Download QR Code</Button>
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      </div>
  
      <footer className="text-center mt-auto pt-16">
        <p className="font-semi-bold text-gray-300 text-[10px]">
          &copy; 2025. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}