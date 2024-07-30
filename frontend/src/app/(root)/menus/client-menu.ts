import { Lightbulb, LineChart } from "lucide-react";
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
];
