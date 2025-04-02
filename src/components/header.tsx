import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath, signUpPath, signInPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { SubmitButton } from "./form/submit-button";
import { signOut } from "@/features/auth/actions/sign-out"; 

const Header = () => {
    const navItems = (
        <>
            <Link
                className={buttonVariants({ variant: "default" })}
                href={ticketsPath()}
            >
                Tickets
            </Link>
            <Link
                href = {signUpPath()}
                className={buttonVariants({ variant: "outline"})}
            >
                Sign Up
            </Link>
            <Link
                href = {signInPath()}
                className={buttonVariants({ variant: "outline"})}
            >
                Sign In
            </Link>
            <form action={signOut}>
                <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
            </form>
            
        </>
    );
    return (
        <>
            <nav
            className="
                supports-backdrop-blur:bg-background/60
                fixed left-0 right-0 top-0 z-20
                border-b bg-background/95 backdrop-blur
                w-full flex py-2.5 px-5 justify-between
            "
            >
            <div className="flex align-items gap-x-2">
                <Link
                className={buttonVariants({ variant: "ghost" })}
                href={homePath()}
                >
                <LucideKanban />
                <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
                </Link>
            </div>
            <div className="flex align-items gap-x-2">
                <ThemeSwitcher/>
                {navItems}      
            </div>
            </nav>
        </>
    )
}

export {Header};