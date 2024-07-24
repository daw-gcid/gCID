import { Lightbulb, LineChart } from "lucide-react";
import { UserOptions } from "../interfaces/user-menu";


export const clientMenu: UserOptions[] = [
  {
    title: "Projetos",
    href: "/projetos",
    icon: Lightbulb,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LineChart,
  },
];
