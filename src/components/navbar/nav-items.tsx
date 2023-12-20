import { Home } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const NavItems = (): NavItem[] => [
  {
    name: "Home",
    href: "/",
    icon: <Home size={24} />,
  },
];
