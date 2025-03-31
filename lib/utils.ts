import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function processRequest<B>(request: Promise<Response>) {
    try {
        const response = await request;
        if (!response.ok) throw Error(response.statusText);
        return response.json() as Promise<B>;
    } catch (e) {
        if ((e as Error).message) throw e;
        console.error("Failed to send request", e);
        throw Error("Unexpected error");
    }
}