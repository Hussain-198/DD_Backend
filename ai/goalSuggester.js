// const OpenAI = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// async function suggestGoals(previousGoals) {
//     const prompt = `Suggest 3 new developer goals based on: ${previousGoals.join(', ')}`;

//     try {
//         const res = await openai.chat.completions.create({
//             model: "gpt-4o", // or "gpt-3.5-turbo"
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 100,
//         });

//         return res.choices[0].message.content;
//     } catch (err) {
//         console.error("OpenAI Error:", err);
//         return "Failed to generate goals.";
//     }
// }

// module.exports = suggestGoals;
