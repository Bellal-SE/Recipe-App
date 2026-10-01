// getRecipe.js  (or wherever this function lives)
export async function getRecipeFromMistral(ingredientsArr) {
  const string = ingredientsArr.map((ingredient) => {
    let stringPost = `${ingredient.name}, `;
    return stringPost;
  });
  try {
    const response = await fetch("http://localhost:3001/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: string }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error(err.message);
  }
}
