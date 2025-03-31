import { MealsPlan } from "@/lib/generateMealsPlan";
import { processRequest } from "@/lib/utils";

export const fetchMealsPlan = (productList: string[]) => {
    const productListParam = encodeURI(productList.join(', '));
    return processRequest<MealsPlan>(fetch(`/api/v1/meals-plan?productList=${productListParam}`));
}