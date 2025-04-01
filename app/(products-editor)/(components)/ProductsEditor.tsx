"use client";

import { observer } from "mobx-react-lite";
import ProductsEditorForm from "./ProductsEditorForm";
import { useStore } from "@/app/(store)/StoreProvider";
import ProductsEditorTable from "./ProductsEditorTable";
import { useEffect } from "react";
import { toast } from "sonner";

export default observer(function ProductsEditor() {
    const { productsEditorStore } = useStore();

    useEffect(() => {
        productsEditorStore.loadProductsFromStorage();
        productsEditorStore.loadProductSuggestions();
    }, [productsEditorStore]);

    const onAddProduct = (productDescription: string) => {
        const isAdded = productsEditorStore.addProduct(productDescription);
        if (!isAdded) toast("Product is already added to the list");
        return isAdded;
    }

    return <div className="space-y-4">
        <h2 className="text-2xl font-bold hidden md:block h-10">Your product list</h2>
        <p className="text-secondary-foreground leading-6 text-lg">
            Add your favorite products below, then click 'Generate Meal Plan' to let AI create a personalized menu and shopping list.
        </p>
        <ProductsEditorForm onSubmit={onAddProduct} productSuggestions={productsEditorStore.productSuggestions} />
        <ProductsEditorTable products={Array.from(productsEditorStore.products)} onDelete={productsEditorStore.deleteProduct} />
    </div>
})