import { processRequest } from "@/lib/utils";

export function fetchProductSuggestions() {
    return processRequest<string[]>(fetch("/grocery_list.json"))
}