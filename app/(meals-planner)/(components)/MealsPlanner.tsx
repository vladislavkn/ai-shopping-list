"use client";

import { observer } from "mobx-react-lite";
import MarkdownPanel from "./MarkdownPanel";
import { useStore } from "@/app/(store)/StoreProvider";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Wand } from "lucide-react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { useEffect } from "react";
import { toast } from "sonner";

export default observer(function MealsPlanner() {
    const { mealsPlannerStore } = useStore();

    useEffect(() => {
        mealsPlannerStore.loadResultMealsFromStorage();
    }, [mealsPlannerStore])

    const isLoading = mealsPlannerStore.state === 'loading'
    const isError = mealsPlannerStore.state === "error";
    const isDone = mealsPlannerStore.state === "done"

    const onLoadResultsMealsPlan = () =>
        mealsPlannerStore.loadResultsMealsPlan().catch((error) =>
            toast((error as Error).message))

    return (
        <div className="space-y-4">
            <Button
                size="lg"
                onClick={onLoadResultsMealsPlan}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? <><LoaderCircle className="animate-spin" /> Generating...</> : <>
                    <Wand /> Generate Meals Plan
                </>}
            </Button>
            {isError && (
                <ErrorAlert description="Failed to generate meals plan. Please try again." />
            )}
            {isDone && (
                <div className="space-y-8">
                    <MarkdownPanel title="Shopping List" content={mealsPlannerStore.shoppingListContent!} />
                    <MarkdownPanel title="Week Menu" content={mealsPlannerStore.menuContent!} />
                </div>
            )}
        </div>
    );
})