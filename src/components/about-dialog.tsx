import * as DialogPrimitive from "@radix-ui/react-dialog"
import { UpdateIcon } from "@radix-ui/react-icons"
import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app"
import { arch } from "@tauri-apps/api/os"
import { open } from "@tauri-apps/api/shell"
import {
  GithubIcon,
  HomeIcon,
} from "lucide-react"
import { useState } from "react"

import { Icons } from "./icons"
import { Button, buttonVariants } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

export function AboutDialog() {
  const [updateText, setUpdateText] = useState("")
  const [version, setVersion] = useState("")
  const [name, setName] = useState("")
  const [tauriVersion, setTauriVersion] = useState("")
  const [arc, setArc] = useState("")
  getVersion().then((x) => setVersion(x))
  getName().then((x) => setName(x))
  getTauriVersion().then((x) => setTauriVersion(x))
  arch().then((x) => setArc(x))

  return (
    <DialogContent className="pb-2 overflow-clip">
      <DialogHeader className="flex items-center text-center">
        <div className="rounded-full bg-background p-[6px] text-slate-600 drop-shadow-none transition duration-1000 hover:text-slate-800 hover:drop-shadow-[0_0px_10px_rgba(0,10,50,0.50)] dark:hover:text-slate-400 ">
          <Icons.logo className="w-12 h-12" />
        </div>

        <DialogTitle className="flex flex-col items-center gap-2 pt-2">
          Tauri UI ({name})
          <span className="flex gap-1 font-mono text-xs font-medium">
            Version {version} ({arc})
            <span className="font-sans font-medium text-gray-400">
              (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  open("https://github.com/agmmnn/tauri-ui/releases/tag/v0.2.0")
                }
              >
                release notes
              </span>
              )
            </span>
          </span>
        </DialogTitle>

        <DialogDescription className=" text-foreground">
          App description.
        </DialogDescription>

        <span className="text-xs text-gray-400">{updateText}</span>
        <DialogDescription className="flex flex-row"></DialogDescription>
      </DialogHeader>

      <span className="font-mono text-xs font-medium text-gray-400">
        Tauri version: {tauriVersion}
      </span>
      <DialogFooter className="flex flex-row items-center pt-2 border-t text-slate-400 ">
        <div className="flex flex-row gap-2 mr-auto">
          <HomeIcon
            className="w-5 h-5 transition cursor-pointer hover:text-slate-300"
            onClick={() => open("https://github.com/agmmnn/tauri-ui")}
          />
          <GithubIcon
            className="w-5 h-5 transition cursor-pointer hover:text-slate-300 "
            onClick={() => open("https://github.com/agmmnn/tauri-ui")}
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="gap-1 h-7"
          onClick={() => setUpdateText("You have the latest version.")}
        >
          <UpdateIcon /> Check for Updates
        </Button>
        <DialogPrimitive.Close
          type="submit"
          className={buttonVariants({ variant: "ghost", className: "h-7" })}
        >
          Close
        </DialogPrimitive.Close>
      </DialogFooter>
    </DialogContent>
  )
}
