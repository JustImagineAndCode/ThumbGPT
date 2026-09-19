import type { INavLink } from "../types";
import { useAuth } from "../context/AuthContext";

export const navlinks: INavLink[] = [
    { name: "Home", href: "/" },
    { name: "Generate", href: "/generate" },
    { name: "My Generation", href: "/my-generation"},
    { name: "Contact", href: "#" },
    { name: "Login", href: "/login" },
/// here is a bug to fix it .. 
];