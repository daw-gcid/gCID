import { Lightbulb, LineChart, MessageCircle, Users } from "lucide-react";
import { UserOptions } from "../interfaces/user-menu";

export const instituteMenu: UserOptions[] = [
  {
    title: "Projetos",
    href: "/instituto/projetos",
    icon: Lightbulb,
  },
  {
    title: "Propostas",
    href: "/instituto/propostas",
    icon: LineChart,
  },
  {
    title: "Equipes",
    href: "/instituto/equipes",
    icon: Users
  },
  {
    title: "Chats",
    href: "/instituto/chats",
    icon: MessageCircle
  },
]