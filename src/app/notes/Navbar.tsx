"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@noteai/app/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNoteDialog from "../components/AddEditNoteDialog";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes";
import AiChatButton from "../components/AiChatButton";
export default function NavBar() {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const {theme} = useTheme()
  return (
    <>
    <div className="p-4 shadow">
      <div className="max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between">
        <Link href="/notes" className="flex items-center gap-1">
          <Image src={logo} alt="FlowBrain Logo" width={40} height={40} />
          <span className="font-bold">Notion</span>
        </Link>
        <div className="flex items-center gap-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
                baseTheme:(theme === 'dark' ? dark : undefined),
              elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },

            }}
          />
          <ThemeToggleButton/>
          <Button onClick={()=> setShowAddEditNoteDialog(true)}>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
          <AiChatButton/>
        </div>
      </div>
    </div>
    {showAddEditNoteDialog && <AddNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog}/>}
    </>
  );
}
