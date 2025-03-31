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
    }, [productsEditorStore]);

    const onAddProduct = (productDescription: string) => {
        const isAdded = productsEditorStore.addProduct(productDescription);
        if (!isAdded) toast("Product is already added to the list");
        return isAdded;
    }

    return <div className="space-y-4">
        <h2 className="text-2xl font-bold hidden md:block h-10">Your product list</h2>
        <p className="text-secondary-foreground leading-6 sm:text-lg">
            Enter the products available in your supermarket. This list will help the AI suggest a weekly menu and generate a shopping list based on what&apos;s in stock.
        </p>
        <ProductsEditorForm onSubmit={onAddProduct} />
        <ProductsEditorTable products={Array.from(productsEditorStore.products)} onDelete={productsEditorStore.deleteProduct} />
    </div>
})