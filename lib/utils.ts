import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function processRequest<B>(request: Promise<Response>) {
    try {
        const response = await request;
        const body = await response.json();
        if (!response.ok) throw Error(body.error || response.statusText);
        return body as B;
    } catch (e) {
        if ((e as Error).message) throw e;
        console.error("Failed to send request", e);
        throw Error("Unexpected error");
    }
}