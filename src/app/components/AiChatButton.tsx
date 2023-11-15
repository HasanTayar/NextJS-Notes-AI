'use client'
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export default function AiChatButton(){
    const [chatBoxOpen , setChatBoxOpen]= useState(false);
    return(
        <>
        <Button onClick={()=>setChatBoxOpen(true)}>
            <Bot size={20} className="mr-2" />
            AI Chat
         <AIChatBox open={chatBoxOpen} onClose={()=> setChatBoxOpen(false)}/>
         </Button>
         </>
       
    )
   
}