'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QRInputField, 
  QRCodeCustomization 
} from "@/components/selectors";
import { Header } from "@/components/header";

export default function Generator() {
  const [activeTab, setActiveTab] = useState<string>('links');
  const [text, setText] = useState<string>('https://example.com');
  const [size, setSize] = useState<number>(200);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [darkColor, setDarkColor] = useState<string>('#000000');
  const [lightColor, setLightColor] = useState<string>('#ffffff');
  const qrRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    setText(activeTab === 'links' ? 'https://example.com' : 'hello world!');
  }, [activeTab]);

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
      const scaleFactor = 4;
      canvas.width = size * scaleFactor;
      canvas.height = size * scaleFactor;

      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = activeTab === 'links' ? 'url-qrcode.png' : 'message-qrcode.png';
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center justify-center flex-grow">
      <main className="flex flex-col items-center w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row w-full justify-center items-center">
          <div className="flex flex-col w-full md:w-1/2 px-4">
          <h3 className="font-bold text-2xl mb-2">Generate Your QR Code</h3>
          <Tabs 
            defaultValue="links" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="links">Link</TabsTrigger>
              <TabsTrigger value="text">Message</TabsTrigger>
            </TabsList>
            <TabsContent value="links">
              <Card>
                <CardHeader>
                  <CardTitle>Link</CardTitle>
                  <CardDescription>
                    Create a QR code from an URL or website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <QRInputField 
                    label="Enter or Paste URL:" 
                    placeholder="Enter URL here (e.g. https://example.com)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <QRCodeCustomization 
                    size={size}
                    setSize={setSize}
                    errorCorrection={errorCorrection}
                    setErrorCorrection={setErrorCorrection}
                    darkColor={darkColor}
                    setDarkColor={setDarkColor}
                    lightColor={lightColor}
                    setLightColor={setLightColor}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="text">
              <Card>
                <CardHeader>
                  <CardTitle>Message</CardTitle>
                  <CardDescription>
                    Create a QR code containing text or a message.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <QRInputField 
                    label="Enter Message:" 
                    placeholder="Enter your message here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <QRCodeCustomization 
                    size={size}
                    setSize={setSize}
                    errorCorrection={errorCorrection}
                    setErrorCorrection={setErrorCorrection}
                    darkColor={darkColor}
                    setDarkColor={setDarkColor}
                    lightColor={lightColor}
                    setLightColor={setLightColor}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
          {/* QR Code Display */}
          <div className="flex flex-col items-center ml-4">
            <div ref={qrRef} className="bg-white p-6 rounded-md shadow-md">
              <QRCodeSVG
                value={text || (activeTab === 'links' ? 'https://example.com' : 'hello world!')}
                size={size}
                level={errorCorrection}
                fgColor={darkColor}
                bgColor={lightColor}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <Button onClick={downloadQRCode} className="cursor-pointer">Download QR Code</Button>
              <Button variant="outline" className="cursor-pointer" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      </div>
  
      <footer className="text-center mt-auto pt-16 pb-6">
        <p className="font-semi-bold text-gray-300 text-[10px]">
          &copy; 2025. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}