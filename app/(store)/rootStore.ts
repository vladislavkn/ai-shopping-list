import { makeAutoObservable } from 'mobx';
import { ProductEditorStore } from '../(products-editor)';
import { MealsPlannerStore } from '../(meals-planner)';

export class RootStore {
    productsEditorStore: ProductEditorStore;
    mealsPlannerStore: MealsPlannerStore;

    constructor() {
        this.productsEditorStore = new ProductEditorStore(this);
        this.mealsPlannerStore = new MealsPlannerStore(this);
        makeAutoObservable(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
