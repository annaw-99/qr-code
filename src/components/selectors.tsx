'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QRInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function QRInputField({ 
  label, 
  placeholder, 
  value, 
  onChange 
}: QRInputFieldProps) {
  return (
    <div className="w-full mb-3">
      <label className="block text-left text-sm font-medium mb-2" htmlFor="content">
        {label}
      </label>
      <Input
        id="content"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
}

interface SizeSelectorProps {
  size: number;
  setSize: (size: number) => void;
}

export function SizeSelector({ size, setSize }: SizeSelectorProps) {
  return (
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
  );
}

interface ErrorCorrectionSelectorProps {
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  setErrorCorrection: (level: 'L' | 'M' | 'Q' | 'H') => void;
}

export function ErrorCorrectionSelector({ 
  errorCorrection, 
  setErrorCorrection 
}: ErrorCorrectionSelectorProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex items-center">
        <label htmlFor="error-correction" className="text-left text-sm font-medium">Error Correction:</label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="mx-1 px-2 border rounded-xl">?</TooltipTrigger>
            <TooltipContent>
              <p className='w-75'>Higher correction allows QR codes to be readable even when partially damaged or obscured. 
                Choose High for printed materials or outdoor use.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select 
        value={errorCorrection} 
        onValueChange={(value) => setErrorCorrection(value as 'L' | 'M' | 'Q' | 'H')}
      >
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
  );
}

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ label, color, setColor }: ColorPickerProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <label className="block text-left text-sm font-medium" htmlFor={`${label}-color`}>
        {label} Color:
      </label>
      <div className="relative w-full h-10">
        <div className="w-full h-full border rounded-md overflow-hidden">
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: color }}
          ></div>
        </div>
        
        <input
          type="color"
          id={`${label}-color`}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

interface QRCodeCustomizationProps {
  size: number;
  setSize: (size: number) => void;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  setErrorCorrection: (level: 'L' | 'M' | 'Q' | 'H') => void;
  darkColor: string;
  setDarkColor: (color: string) => void;
  lightColor: string;
  setLightColor: (color: string) => void;
}

export function QRCodeCustomization({ 
  size, 
  setSize, 
  errorCorrection, 
  setErrorCorrection, 
  darkColor, 
  setDarkColor, 
  lightColor, 
  setLightColor 
}: QRCodeCustomizationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-2">
      <SizeSelector size={size} setSize={setSize} />
      <ErrorCorrectionSelector errorCorrection={errorCorrection} setErrorCorrection={setErrorCorrection} />
      <ColorPicker label="Code" color={darkColor} setColor={setDarkColor} />
      <ColorPicker label="Background" color={lightColor} setColor={setLightColor} />
    </div>
  );
}