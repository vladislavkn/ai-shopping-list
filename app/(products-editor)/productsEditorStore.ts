import { autorun, flow, makeAutoObservable } from 'mobx';
import { RootStore } from '../(store)/rootStore';
import { fetchProductSuggestions } from './productEditorAPI';

export default class ProductEditorStore {
    rootStore: RootStore;
    products = new Set<string>();
    productSuggestions: string[] | undefined = undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    loadProductSuggestions = flow(function* (this: ProductEditorStore) {
        try {
            this.productSuggestions = yield fetchProductSuggestions();
        } catch (e) {
            console.error("Failed to fetch product suggestions", e);
        }
    })

    loadProductsFromStorage() {
        if (typeof window !== 'undefined') {
            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                try {
                    const productArray = JSON.parse(savedProducts);
                    this.products = new Set(productArray);
                } catch (e) {
                    console.error("Failed to load products from LocalStorage", e);
                }
            }
        }
    }

    saveProductsToStorage() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('products', JSON.stringify(Array.from(this.products)));
        }
    }

    addProduct(productDescription: string) {
        if (this.products.has(productDescription)) return false;
        this.products.add(productDescription);
        this.saveProductsToStorage();
        return true;
    }

    deleteProduct(productDescription: string) {
        this.products.delete(productDescription);
        this.saveProductsToStorage();
    }

    deleteAllProducts() {
        this.products.clear();
        this.saveProductsToStorage();
    }

    get hasEnoughProducts() {
        return this.products.size >= 3;
    }
}