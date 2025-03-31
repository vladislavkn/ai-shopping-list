import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        setIsMobile(mediaQuery.matches);
        const handleResize = (event: MediaQueryListEvent) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleResize);
        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return isMobile;
}
