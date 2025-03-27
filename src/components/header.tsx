'use client';

import React from 'react';
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="w-full py-4 px-6 mx-0 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-lg dark:text-white">QRNow</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}