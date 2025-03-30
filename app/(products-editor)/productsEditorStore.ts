import { makeAutoObservable } from 'mobx';

class ProductEditorStore {
    products = new Set<string>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    addProduct(productDescription: string) {
        if (this.products.has(productDescription)) {
            // TODO: show error notification
        } else {
            this.products.add(productDescription);
        }
    }

    deleteProduct(productDescription: string) {
        this.products.delete(productDescription);
    }
}

const productEditorStore = new ProductEditorStore();

export default productEditorStore;