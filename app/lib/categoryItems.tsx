import { ReactNode } from "react";
import {ChefHat,Globe, PartyPopper} from "lucide-react"

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "template",
    title:"Template",
    image: <Globe/>
  },
  {
    id: 1,
    name: "uikit",
    title:"UI Kit",
    image: <ChefHat />
  },
  {
    id: 3,
    name: "icon",
    title:"Icon",
    image: <PartyPopper />
  },
];
