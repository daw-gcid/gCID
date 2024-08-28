"use client";
import { AuthContext } from "@/src/context/authContext";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { CircleUser, SendHorizontal } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const handleChatClick = (chatIndex: number) => {
    setSelectedChat(chatIndex);
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Coluna dos Chats */}
      <div className="flex flex-col w-1/3 h-full overflow-y-auto ">
        <ScrollArea className="flex-1 rounded-tl-md rounded-bl-md bg-green-300 border-black border-solid border-2 max-h-[800px]">
          <div className="p-4 space-y-2">
            <h1 className="mb-4 text-sm font-medium leading-none">Conversas</h1>
            {[...Array(40)].map((_, index) => (
              <Button
                key={index}
                onClick={() => handleChatClick(index)}
                className={`flex items-center justify-start w-full p-4 pt-6 pb-6 mb-2 text-left bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 ${
                  selectedChat === index
                    ? "bg-green-200 border-2 border-custom-blue text-black"
                    : "hover:bg-gray-100 active:bg-gray-200 text-black"
                }`}
              >
                <CircleUser className="w-8 h-8 mr-3 text-gray-700" />
                <p className="text-base">Chat {index + 1}</p>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Coluna das Mensagens */}
      <div className="flex flex-col w-2/3 h-full overflow-y-auto">
        <ScrollArea className="flex-1 rounded-tr-md border-t-2 border-r-2 border-b-2 border-black bg-gray-400 p-4">
          <div className="space-y-3">
            {/* Mensagens do Usuário */}
            <div className="flex justify-end bg-blue-300">
              <div className=" sm:max-w-[25%] md:max-w-[35%] lg:max-w-[50%] bg-green-200 p-3 rounded-lg text-black break-words overflow-wrap break-word">
                <p className="break-words">
                  Boa tarde, voce aceita o projeto com a verba definida?
                </p>
              </div>
            </div>

            {/* Mensagens Com quem ele esta conversando */}
            <div className="flex justify-start">
              <div className="max-w-[50%] sm:max-w-[25%] md:max-w-[35%] lg:max-w-[50%] bg-white p-3 rounded-lg shadow-md text-black break-words overflow-wrap break-word">
                <p className="break-words">
                  Boa tarde, sim, aceitamos. Mas somente se seguirmos o escopo atualmente definido
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="h-[50px] w-auto rounded-br-md border-r-2 border-b-2 border-black p-[3px]">
          <div className="flex w-full h-full items-center space-x-2 bg-white rounded-md p-[3px]">
            <Input
              type="text"
              placeholder="Mensagem"
              className="flex-1 h-full border-none outline-none focus:ring-0"
            />
            <Button
              type="submit"
              variant="ghost"
              className="p-0 bg-transparent hover:bg-gray-100 rounded-full"
            >
              <SendHorizontal className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
