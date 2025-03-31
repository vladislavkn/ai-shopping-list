import generateMealsPlan from "@/lib/generateMealsPlan";
import { NextResponse } from "next/server";

let requestMark = 0;
const headers = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

export async function GET(request: Request) {
    requestMark = (requestMark + 1) % 4096;
    try {
        console.log(`Received meals plan generation request #${requestMark}`);

        const cookies = request.headers.get('cookie');
        const lastRequestTime = cookies?.match(/lastMealPlanRequest=(\d+)/)?.[1];

        if (lastRequestTime) {
            const timePassed = Date.now() - parseInt(lastRequestTime);
            const timeoutMinutes = 10;

            if (timePassed < timeoutMinutes * 60 * 1000) {
                const remainingMinutes = Math.ceil((timeoutMinutes * 60 * 1000 - timePassed) / 60000);
                console.log(`Declined meals plan generation request #${requestMark} due to the timeout`);
                return NextResponse.json(
                    { error: `Please wait ${remainingMinutes} minutes before generating a new meal plan` },
                    { status: 429, headers }
                );
            }
        }

        const { searchParams } = new URL(request.url);
        const encodedProductList = searchParams.get('productList');
        if (!encodedProductList) {
            console.log(`Missing productList parameter in meals plan generation request #${requestMark}`)
            return NextResponse.json({ error: 'Missing productList parameter' }, { status: 400, headers });
        }
        const decodedProductList = decodeURIComponent(encodedProductList);
        console.log(`Starting generation of meals plan #${requestMark} with product list "${decodedProductList.slice(30)}..."`)
        const mealsPlan = await generateMealsPlan(decodedProductList);
        console.log(`Generated meals plan #${requestMark} successfully`)
        const response = NextResponse.json(mealsPlan, { status: 200, headers });
        response.cookies.set('lastMealPlanRequest', Date.now().toString(), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60
        });
        return response;
    } catch (e) {
        const message = (e as Error).message || "Unexpected error";
        console.error(`Failed to generate a meals plan #${requestMark}`, e);
        return NextResponse.json({ error: message }, { status: 500, headers });
    }
}
