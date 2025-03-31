import generateMealsPlan from "@/lib/generateMealsPlan";
import { NextResponse } from "next/server";

let requestMark = 0;

export async function GET(request: Request) {
    requestMark = (requestMark + 1) % 4096;
    try {
        console.log(`Received meals plan generation request #${requestMark}`);
        const { searchParams } = new URL(request.url);
        const encodedProductList = searchParams.get('productList');
        if (!encodedProductList) {
            console.log(`Missing productList parameter in meals plan generation request #${requestMark}`)
            return NextResponse.json({ error: 'Missing productList parameter' }, { status: 400 });
        }
        const decodedProductList = decodeURIComponent(encodedProductList);
        console.log(`Starting generation of meals plan #${requestMark} with product list "${decodedProductList.slice(30)}..."`)
        const mealsPlan = await generateMealsPlan(decodedProductList);
        console.log(`Generated meals plan #${requestMark} successfully`)
        return NextResponse.json(mealsPlan, { status: 200 });
    } catch (e) {
        const message = (e as Error).message || "Unexpected error";
        console.error(`Failed to generate a meals plan #${requestMark}`, e);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
