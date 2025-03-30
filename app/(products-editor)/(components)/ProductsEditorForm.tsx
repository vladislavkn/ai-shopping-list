"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export type ProductsEditorFormProps = {
    onSubmit(productDescription: string): void
}

export default function ProductsEditorForm(props: ProductsEditorFormProps) {
    const [randomProduct, setRandomProduct] = useState<string>()

    useEffect(() => {
        setRandomProduct(getRandomExampleProduct());
    }, [])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const productDescriptionElement = form.elements.namedItem('productDescription') as HTMLTextAreaElement;
        if (productDescriptionElement && productDescriptionElement.value.trim()) {
            props.onSubmit(productDescriptionElement.value);
            form.reset();
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-end">
        <Textarea name="productDescription" required placeholder={randomProduct} />
        <Button size="lg"><Plus /> Add</Button>
    </form>
}

const EXAMPLE_PRODUCTS = [
    "Cherry tomatoes",
    "Spaghetti",
    "Mozzarella cheese",
    "Basil leaves",
    "Canned chickpeas",
    "Whole grain bread",
    "Carrot sticks",
    "Brown rice",
    "Fresh salmon",
    "Green bell pepper",
    "Plain yogurt",
    "Olive oil",
    "Sweet potatoes",
    "Frozen peas",
    "Red onions",
    "Black beans",
    "Oat milk",
    "Zucchini",
    "Garlic cloves",
    "Eggs"
]

function getRandomExampleProduct(): string {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_PRODUCTS.length);
    return EXAMPLE_PRODUCTS[randomIndex];
}
