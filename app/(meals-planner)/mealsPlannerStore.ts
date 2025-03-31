import { flow, makeAutoObservable } from "mobx";
import { RootStore } from "../(store)/rootStore";

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
                shoppingListContent: this.shoppingListContent
            }));
        }
    }

    private checkCanLoadResultsMealsPlan() {
        if (!this.rootStore.productsEditorStore.hasEnoughProducts) {
            throw Error("Please, add at least three products to the list");
        }
        if (this.lastLoadTimestamp) {
            const timeSinceLastLoad = Date.now() - this.lastLoadTimestamp;
            if (timeSinceLastLoad < 120_000) {
                const waitingTimeSeconds = Math.floor((120_000 - timeSinceLastLoad) / 1000)
                throw Error(`Please, wait ${waitingTimeSeconds}s to load again`);
            }
        }
    }

    loadResultsMealsPlan = flow(function* (this: MealsPlannerStore) {
        this.checkCanLoadResultsMealsPlan();
        this.state = "loading";
        yield new Promise(r => setTimeout(r, 5000));
        // TODO: add actual fetching;
        if (Math.random() > 0.5) {
            this.state = "error";
            console.error("Failed to load the meals plan");
        } else {
            this.state = "done";
            this.lastLoadTimestamp = Date.now();
            this.shoppingListContent = `## Shopping List

### Produce
- 2 onions
- 1 bunch of carrots
- 3 bell peppers (red, yellow, green)
- 1 head of lettuce
- 2 tomatoes
`;

            this.menuContent = `## Week Menu

### Monday
- **Breakfast**: Oatmeal with fruit
- **Lunch**: Chicken salad sandwich
- **Dinner**: Spaghetti with meat sauce

### Tuesday
- **Breakfast**: Yogurt with granola
- **Lunch**: Leftover spaghetti
- **Dinner**: Tacos with ground beef

### Wednesday
- **Breakfast**: Scrambled eggs and toast
- **Lunch**: Tuna sandwich
- **Dinner**: Stir-fry with rice

### Thursday
- **Breakfast**: Smoothie
- **Lunch**: Soup and salad
- **Dinner**: Baked chicken with vegetables

### Friday
- **Breakfast**: Cereal with milk
- **Lunch**: Leftovers
- **Dinner**: Homemade pizza`;
        }
        this.saveResultMealsToStorage();
    })
}
