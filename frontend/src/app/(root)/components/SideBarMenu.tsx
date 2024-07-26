"use client";
import Link from "next/link";
import { useContext } from "react";
import { clientMenu } from "../menus/client-menu";
import { talentMenu } from "../menus/talent-menu";
import { AuthContext } from "@/src/context/authContext";
import { UserOptions } from "../interfaces/user-menu";
import { instituteMenu } from "../menus/institute-menu";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";

export function SidebarMenu({ responsive }: { responsive: boolean }) {
  const { user } = useContext(AuthContext);
  const userType = user?.userType;

  const currentMenu: UserOptions[] =
    userType == 1 ? clientMenu : userType == 2 ? instituteMenu : talentMenu;

    // console.log(window.location.href);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {currentMenu.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.href}
            className={
              responsive
                ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <item.icon />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function DropdownUserMenu() {
  const { user, logout } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle Dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e) => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
