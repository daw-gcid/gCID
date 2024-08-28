import { UserOptions } from "../interfaces/user-menu";
import { Lightbulb, MessageCircle, Users } from "lucide-react";

export const talentMenu: UserOptions[] = [
  {
    title: "Feed",
    href: "/talento/feed",
    icon: MessageCircle,
  },
  {
    title: "Minha equipe",
    href: "/talento/projetos",
    icon: Lightbulb,
  },
  {
    title: "Perfil",
    href: "/talento/perfil",

    icon: Users,
  },
];
