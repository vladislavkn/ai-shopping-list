import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
    return <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
            <Image width={48} height={48} src="/ai-shopping-list-log.webp" alt="Logo of ai shopping list: a happy cat with a carrot" />
            <h1 className="font-bold text-xl">AI shopping list</h1>
        </div>
        <Button asChild variant="link">
            <a href="#">
                <Image width={24} height={24} src="/github-mark.svg" alt="Github logo" />
                Github
            </a>
        </Button>
    </header>
}