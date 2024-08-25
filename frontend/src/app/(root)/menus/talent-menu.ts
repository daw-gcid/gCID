import { UserOptions } from "../interfaces/user-menu";
import { Lightbulb, MessageCircle, Users } from "lucide-react";

export const talentMenu: UserOptions[] = [
  {
    title: "Projetos",
    href: "/talento/projetos",
    icon: Lightbulb,
  },
  {
    title: "Feed",
    href: "/talento/feed",
    icon: MessageCircle,
  },
  {
    title: "Perfil",
    href: "/talento/perfil",

    icon: Users,
  },
];
