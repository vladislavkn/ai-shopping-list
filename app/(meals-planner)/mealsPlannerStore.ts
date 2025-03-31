import { flow, makeAutoObservable } from "mobx";
import { RootStore } from "../(store)/rootStore";
import { fetchMealsPlan } from "./mealsPlannerAPI";
import { MealsPlan } from "@/lib/generateMealsPlan";

const LOAD_TIMEOUT = 600_000

export default class MealsPlannerStore {
    rootStore: RootStore;
    shoppingListContent: string | undefined = undefined;
    menuContent: string | undefined = undefined;
    state: "idle" | "error" | "loading" | "done" = "idle";
    lastLoadTimestamp: number | undefined = undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    loadResultMealsFromStorage() {
        if (typeof window !== 'undefined') {
            const savedResultMeals = localStorage.getItem('resultMeals');
            if (savedResultMeals) {
                try {
                    const savedResultMealsJson = JSON.parse(savedResultMeals);
                    this.menuContent = savedResultMealsJson.menuContent;
                    this.shoppingListContent = savedResultMealsJson.shoppingListContent;
                    this.lastLoadTimestamp = savedResultMealsJson.lastLoadTimestamp;
                    this.state = "done";
                } catch (e) {
                    console.error("Failed to load result meals from LocalStorage", e);
                }
            }
        }
    }

    saveResultMealsToStorage() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('resultMeals', JSON.stringify({
                menuContent: this.menuContent,
                shoppingListContent: this.shoppingListContent,
                lastLoadTimestamp: this.lastLoadTimestamp
            }));
        }
    }

    private checkCanLoadResultsMealsPlan() {
        if (!this.rootStore.productsEditorStore.hasEnoughProducts) {
            throw Error("Please, add at least three products to the list");
        }
        if (this.lastLoadTimestamp) {
            const timeSinceLastLoad = Date.now() - this.lastLoadTimestamp;
            if (timeSinceLastLoad < LOAD_TIMEOUT) {
                const waitingTimeSeconds = Math.floor((LOAD_TIMEOUT - timeSinceLastLoad) / 1000)
                throw Error(`Please, wait ${waitingTimeSeconds}s to load again`);
            }
        }
    }

    loadResultsMealsPlan = flow(function* (this: MealsPlannerStore) {
        this.checkCanLoadResultsMealsPlan();
        this.state = "loading";
        try {
            const productList = Array.from(this.rootStore.productsEditorStore.products);
            const mealsPlanResponse: MealsPlan = yield fetchMealsPlan(productList);
            this.state = "done";
            this.lastLoadTimestamp = Date.now();
            this.shoppingListContent = mealsPlanResponse.shoppingList;
            this.menuContent = mealsPlanResponse.menu;
            this.saveResultMealsToStorage();
        } catch (e) {
            this.state = "error";
            throw e;
        }
    })
}
