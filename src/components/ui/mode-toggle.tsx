"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [checked, setChecked] = React.useState(false)

  const toggleTheme = (isChecked: boolean) => {
    setChecked(isChecked)
    // use setTimeout to make the switch animation complete first
    setTimeout(() => {
      setTheme(isChecked ? "dark" : "light")
    }, 150)
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" />
      <Switch 
        checked={checked}
        onCheckedChange={toggleTheme}
        aria-label="toggle"
      />
      <Moon className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" />
    </div>
  )
}