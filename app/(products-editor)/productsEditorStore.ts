import { makeAutoObservable } from 'mobx';

class ProductEditorStore {
    products = new Set<string>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

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
        if (this.products.has(productDescription)) {
            // TODO: show error notification
        } else {
            this.products.add(productDescription);
            this.saveProductsToStorage();
        }
    }

    deleteProduct(productDescription: string) {
        this.products.delete(productDescription);
        this.saveProductsToStorage();
    }
}

const productEditorStore = new ProductEditorStore();

export default productEditorStore;