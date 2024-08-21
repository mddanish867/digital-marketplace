import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

interface iAppProps {
  email: string;
  name: string;
  userImage: string | undefined;
}

export default function UserNav({ email, name, userImage }: iAppProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImage} alt="user Image" />
              <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-0">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild><Link href="/sell">Sell your poduct</Link></DropdownMenuItem>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="items-center">
            <LogoutLink>Log out</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
