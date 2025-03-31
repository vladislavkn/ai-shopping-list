import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";

const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'],
    maxRetries: 1
});

export type MealsPlan = {
    menu: string;
    shoppingList: string;
}

export default async function generateMealsPlan(productsList: string): Promise<MealsPlan> {
    const completionCreateParams = createCompletionCreateParams(productsList);
    const chatCompletion = await client.chat.completions.create(completionCreateParams);
    const responseText = chatCompletion.choices[0].message.content;
    if (!responseText) {
        throw Error("Failed to get response text");
    }
    return JSON.parse(responseText)
}

function createCompletionCreateParams(productList: string) {
    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system', content: `You are a helpful meals planner specialist. 
            Please, suggest me a weekly menu (three times per day, 7 days) and the complete list of the products I need to cook it. Minimum daily intake is 3000 calories. 
            In menu write markdown list with the dish for every day of the week. In the parentheses enumarete the products it requires.
            In the shoppingList write the list of the products according with required weight. Here is an example of your response:
            {
                "menu": "*Monday*:\n- Breakfast: Pasta with tomato (2 tomatos, 500g pasta)\n- Lunch: Grilled chicken with rice (1 chicken breast, 200g rice)\n- Dinner: Vegetable soup (3 carrots, 2 potatoes, 1 onion)\n\n*Tuesday*:\n- Breakfast: Oatmeal with banana (100g oats, 1 banana)\n- Lunch: Tuna sandwich (1 can tuna, 2 slices bread)\n- Dinner: Stir-fried tofu with vegetables (150g tofu, 1 bell pepper, 1 zucchini)",
                "shoppingList": "- Potatoes (200g)\n- Bread (2 loafs)\n- Chicken breast (1 unit)\n- Rice (200g)\n- Carrots (3 units)\n- Onion (1 unit)\n- Oats (100g)\n- Banana (1 unit)\n- Tuna (1 can)\n- Bell pepper (1 unit)\n- Zucchini (1 unit)\n- Tofu (150g)"
            }
            Select meals and products that are available for an average student with a meals budget of 200-300 euro/dollars per month.
            The amount of meals must be enough for seven days for an adult of 25-30 years.
            Please, answer in the following JSON format: \`\`\`{
                "menu": "Unordered list string in Markdown format",
                "shoppingList": "Unordered list string in Markdown format"
            }\`\`\`
            You must not add any text except for the JSON string. also do not write markdown text block like "\`\`\`json".`
        },
        { role: 'user', content: `Here is the list of the products I can buy in the shop: ${productList}. Please, answer in JSON string.` },
    ];

    const model = process.env['GROQ_MODEL_NAME'] as "mixtral-8x7b-32768" | "llama3-70b-8192" | "llama3-8b-8192" | "gemma-7b-it";

    return {
        messages,
        model,
        max_completion_tokens: 4096,
        response_format: { type: "json_object" } as { type: "json_object" }
    };
}