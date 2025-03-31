import { Button } from "@/components/ui/button";
import Image from "next/image";
import ModeToggle from "./ModeToggle";

export default function Header() {
    return <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-1">
            <Image width={48} height={48} src="/ai-shopping-list-log.webp" alt="Logo of ai shopping list: a happy cat with a carrot" />
            <h1 className="font-bold text-lg sm:text-xl">AI shopping list</h1>
        </div>
        <div className="flex items-center gap-1">
            <Button asChild variant="link" size="sm">
                <a href="https://github.com/vladislavkn/ai-shopping-list" target="_blank">
                    <Image width={24} height={24} src="/github-mark.svg" alt="Github logo" className="dark:invert" />
                    Github
                </a>
            </Button>
            <ModeToggle />
        </div>
    </header>
}