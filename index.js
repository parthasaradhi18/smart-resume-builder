const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai"); // ✅ updated import for v4+

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ updated configuration for OpenAI v4+
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ai/suggest", async (req, res) => {
  const { text } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Improve this resume summary: ${text}` }],
    });

    const suggestion = completion.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
