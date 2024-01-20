const { OpenAI } =  require("openai");


const { createWorker } = require('tesseract.js');

(async () => {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize('receipt.jpg');
    console.log(text);
    await worker.terminate();
})();

/*
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function main() {
    const assistant = await openai.beta.assistants.create({
        name: "Receipt Parser",
        instructions: "You are a receipt parser. You will receive text translated from an image of a receipt and you will output each item and its price. For example:",
        model: "gpt-4-1106-preview"
      });

  console.log(completion.choices[0]);
}

main();
*/