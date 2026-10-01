import { useState } from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import Model from "./Model";
import { getRecipeFromMistral } from "../ai";
export default function Main() {
  const [ingredientId, setIngredientId] = useState(5);
  const [ingredients, setIngredients] = useState([
    { name: "chicken", id: 1 },
    { name: "oregano", id: 2 },
    { name: "onions", id: 3 },
    { name: "tomatoes", id: 4 },
  ]);

  const [recipeShown, setRecipeShown] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [modelMsg, setModelMsg] = useState();
  const [genRecipe, setGenRecipe] = useState("");
  const [previousIngredients, setPreviousIngredients] = useState([]);

  const messages = [
    "Checking your ingredients...",
    "Finding the perfect flavor combination...",
    "Creating your recipe...",
    "Adding the final touches...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  function handleOpen() {
    setShowModel(false);
  }

  function addIngredient(formData) {
    // e.preventDefault();
    // const formEl = e.currentTarget;
    // const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredientInput");
    if (newIngredient.trim() === "") {
      setShowModel((prev) => !prev);
      setModelMsg({
        headMsg: "Empty!",
        paraMsg: "Please enter at least one character to proceed.",
      });
      return;
    }

    const CapitalizedIngredient =
      newIngredient[0].toUpperCase() + newIngredient.slice(1);
    const isDuplicate = ingredients.some(
      (ing) => ing.name === CapitalizedIngredient
    );
    if (isDuplicate) {
      setShowModel((prev) => !prev);
      setModelMsg({
        headMsg: "Duplicate!",
        paraMsg: "Please enter a different Ingredient.",
      });
      return;
    }
    setIngredientId((prev) => prev + 1);
    const ingredientObj = { name: CapitalizedIngredient, id: ingredientId };
    setIngredients((prev) => [...prev, ingredientObj]);
    // console.log(Object.fromEntries(formData));
  }

  async function generatedResponse() {
    // CHECKING IF THE ARRAY IS THE SAME IN ORDER TO AVOID EXTRA API CALL.
    const hasChanged =
      JSON.stringify(ingredients) === JSON.stringify(previousIngredients);
    if (hasChanged) {
      setShowModel((prev) => !prev);
      setModelMsg({
        headMsg: "Same Ingredients!",
        paraMsg: "Add more ingredients to suggest a new recipe.",
      });
      return;
    }
    setGenRecipe("");
    setRecipeShown(true);
    setMessageIndex(0);
    // CHANGING LOADER LABEL.
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    try {
      const result = await getRecipeFromMistral(ingredients);
      setPreviousIngredients([...ingredients]);
      setGenRecipe(result);
    } catch (err) {
      console.log(err);
    } finally {
      clearInterval(interval);
      setRecipeShown(false);
    }
  }

  return (
    <main className="min-h-48 flex mt-10 flex-col gap-y-5 animate-[fadeIn_1s_ease-in-out] pb-3">
      {showModel ? <Model handleOpen={handleOpen} msg={modelMsg} /> : null}
      <form
        action={addIngredient}
        className=" mx-3 mt-3 flex items-center justify-center flex-col md:flex-row gap-y-3 md:gap-x-3"
      >
        <input
          autoComplete="off"
          className="w-[clamp(250px,50vw,620px)] rounded-sm border border-[#D97757] px-2 py-1 shadow-md shadow-[#D97757] outline-0 focus:outline-none focus:ring-2 focus:ring-[#D97757] focus:border-[#D97757] focus:shadow-lg focus:shadow-[#D97757]-500/20"
          type="text"
          placeholder="e.g.Oregano"
          aria-label="Add ingredient"
          name="ingredientInput"
          autoFocus
        />
        <button className="bg-[#D97757] rounded-sm px-3 md:px-6 py-1 cursor-pointer transition duration-500 hover:translate-y-1 hover:bg-[#d9785787]">
          + Add Ingredient
        </button>
      </form>
      <IngredientsList
        ingredients={ingredients}
        setIngredients={setIngredients}
        handleAiResponse={generatedResponse}
        previousIngredients={previousIngredients}
        setPreviousIngredients={setPreviousIngredients}
        setShowModel={setShowModel}
        setModelMsg={setModelMsg}
      />

      <Recipe
        labelMsg={messages[messageIndex]}
        recipeShown={recipeShown}
        genRecipe={genRecipe}
      />
    </main>
  );
}
