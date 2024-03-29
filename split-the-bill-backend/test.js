const { OpenAI } =  require("openai");
const { createWorker } = require('tesseract.js');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function receive_data() {
    // Get text from image using Tesseract
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize('receipt.jpg');
    console.log("Tesseract parse result:\n" + text);

    worker.terminate();

    // Parse text into JSON with GPT
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a receipt parser. You will receive text translated from an image of a receipt and you will output each item and its price in JSON format, where the item name is represented by 'name' and the price is represented by 'price'. Also include a '$' before the price value.",
            },
            { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    return completion.choices[0].message.content;
}

module.exports = receive_data;
