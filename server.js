// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { InferenceClient } from "@huggingface/inference";

const app = express();
app.use(cors()); // during dev; you can restrict this later
app.use(express.json());

const hf = new InferenceClient(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  try {
    const response = await hf.chatCompletion({
      provider: "auto",
      model: "Qwen/Qwen3-8B",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredients.join(
            ", "
          )}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1250,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Recipe server running on http://localhost:${PORT}`);
});
