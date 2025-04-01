import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";

const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'],
    maxRetries: 1
});

export type GenerateMealsPlanOptions = {
    productsList: string,
    days: number
    allergies?: string,
}

export type MealsPlan = {
    menu: string;
    shoppingList: string;
}

export default async function generateMealsPlan(options: GenerateMealsPlanOptions): Promise<MealsPlan> {
    const chatCompletion = await client.chat.completions.create({
        model: process.env['GROQ_MODEL_NAME'] as "mixtral-8x7b-32768" | "llama3-70b-8192" | "llama3-8b-8192" | "gemma-7b-it",
        max_completion_tokens: 4096,
        response_format: { type: "json_object" },
        messages: createCompletionMessages(options)
    });
    const responseText = chatCompletion.choices[0].message.content;
    if (!responseText) {
        throw Error("Failed to get response text");
    }
    return JSON.parse(responseText)
}

function createCompletionMessages(options: GenerateMealsPlanOptions): ChatCompletionMessageParam[] {
    return [
        {
            role: 'system', content: `You are a helpful and smart Nutritionist. You help people to create a menu for ${options.days} days (Assuming eating three times a day)
            and the complete list of the products needed to cook it. You know that the weight of one dish is 300-400g and that minimum daily calories intake is 2500. 
            You always plan a healthy and balanced menu. You don't have to use all of the products from the that a user tells you. You always write amount of product
            in shopping list in reasonable units, e.g. ml/g/kg/units. In menu section of the answer you write markdown list with the dish for every day of ${options.days}.
            In the parentheses after the dish you enumarete the products it requires. In the shoppingList you write the list of the products and needed weight. 
            Here is an example of your response:
            {
                "menu": "*First day*:\n- Breakfast: Shakshuka (2 eggs, 2 tomatoes, 1/2 onion, 1 clove garlic, 1 tsp olive oil)\n- Lunch: Chicken teriyaki with rice (150g chicken thigh, 2 tbsp soy sauce, 1 tbsp honey, 1 garlic clove, 1 tsp sesame oil, 300g jasmine rice)\n- Dinner: Creamy pumpkin soup (300g pumpkin, 1 carrot, 1/2 onion, 500ml vegetable broth, 2 tbsp cream)\n\n*Second day*:\n- Breakfast: Greek yogurt with honey and banana (150g Greek yogurt, 1 tbsp honey, 1 banana, 2 tbsp oats)\n- Lunch: Caprese sandwich (2 slices ciabatta, 100g mozzarella, 1 tomato, 4 basil leaves, 1 tsp olive oil)\n- Dinner: Chickpea curry with rice (150g canned chickpeas, 1/2 onion, 1 garlic clove, 1 tsp curry powder, 200ml coconut milk, 200g basmati rice)",
                "shoppingList": "- Eggs (2 units)\n- Tomatoes (3 units)\n- Onion (2 units)\n- Garlic (3 cloves)\n- Olive oil (small bottle)\n- Chicken thigh (150g)\n- Soy sauce (small bottle)\n- Honey (small jar)\n- Sesame oil (small bottle)\n- Jasmine rice (300g)\n- Pumpkin (300g)\n- Carrot (1 unit)\n- Vegetable broth (500ml)\n- Cream (small carton)\n- Greek yogurt (150g)\n- Banana (1 unit)\n- Oats (100g)\n- Mozzarella (100g)\n- Ciabatta bread (1 loaf)\n- Basil leaves (1 bunch)\n- Chickpeas canned (150g)\n- Curry powder (small jar)\n- Coconut milk (1 can)\n- Basmati rice (200g)"
            }
            Select meals and products that are available for an average student with a meals budget of 200-300 euro/dollars per month.
            The amount of meals must be enough for seven days for an adult of 25-30 years.
            Please, answer in the following JSON format: \`\`\`{
                "menu": "Unordered list string in Markdown format",
                "shoppingList": "Unordered list string in Markdown format"
            }\`\`\`
            You must not add any text except for the JSON string. also do not write markdown text block like "\`\`\`json".`
        },
        { role: 'user', content: `Here is the list of the products I can buy in the shop: ${options.productsList}.${options.allergies && ` Pay attention that I have these allergies: ${options.allergies}.`} Please, answer in JSON string.` },
    ];
}