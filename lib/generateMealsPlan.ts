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
            Please, suggest me a weekly menu (three times per day, 7 days) and the complete list of the products I need to cook it. 
            In menu write markdown list with the dish for every day of the week. In the parentheses enumarete the products it requires.
            In the shoppingList write the list of the products according with required weight, e.g. "Potatoes (200g)".
            Select meals and products that are available for an average student with a meals budget of 200-300 euro/dollars per month.
            Please, answer in the following format: \`\`\`{
                "type": "object",
                "properties": {
                    "menu": {
                        "type": "string"
                    },
                    "shoppingList": {
                        "type": "string"
                    }
                },
                "required": ["menu", "shoppingList"],
                "additionalProperties": false
            }\`\`\``
        },
        { role: 'user', content: `Here is the list of the products I can buy in the shop: ${productList}` },
    ];

    const model = process.env['GROQ_MODEL_NAME'] as "mixtral-8x7b-32768" | "llama3-70b-8192" | "llama3-8b-8192" | "gemma-7b-it";

    return {
        messages,
        model,
        response_format: { type: "json_object" } as { type: "json_object" }
    };
}