import { BriefcaseBusiness, HeartHandshake, Lightbulb, LineChart, MessageCircle } from "lucide-react";
import { UserOptions } from "../interfaces/user-menu";

export const clientMenu: UserOptions[] = [
  {
    title: "Projetos",
    href: "/client/projetos",
    icon: Lightbulb,
  },
  {
    title: "Dashboard",
    href: "/client/dashboard",
    icon: LineChart,
  },
  {
    title: "Propostas",
    href: "/client/propostas",
    icon: BriefcaseBusiness
  },
  {
    title: "Parcerias",
    href: "/client/parcerias",
    icon: HeartHandshake
  },
  {
    title: "Chat",
    href: "/client/chats",
    icon: MessageCircle
  }
];
