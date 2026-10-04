import { useState } from "react";
import EditDeleteModel from "./EditDeleteModel";

export default function IngredientsList(props) {
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [deletingIngredient, setDeletingIngredient] = useState(null);
  const [editHighlight, setEditHighlight] = useState(null);
  const [rateLimiter, setRateLimiter] = useState(true);
  if (editHighlight !== null)
    setTimeout(() => {
      setEditHighlight(null);
    }, 1000);

  function editModel() {
    setEditBtn((prev) => !prev);
  }

  function deleteModel() {
    setDeleteBtn((prev) => !prev);
  }

  function handleRateLimiting() {
    if (!rateLimiter) {
      setTimeout(() => {
        setRateLimiter((prev) => !prev);
      }, 5000);
      return;
    }
    props.handleAiResponse();
    setRateLimiter((prev) => !prev);
  }

  const list = props.ingredients.map((item) => {
    return (
      <div
        className="md:flex items-center ml-5 md:ml-15 space-y-2 p-1 text-[clamp(1rem,1.4vw,1.2rem)]"
        key={item.id}
      >
        <li
          className={`w-[clamp(250px,50vw,620px)] md:mr-[100.69px] animate-[fadeIn_0.5s_ease-in-out] transition-all duration-1000 ${
            editHighlight === item.id ? "bg-green-100 text-black" : ""
          }`}
        >
          {item.name}
        </li>
        <div className="space-x-2">
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-orange-400/40 bg-[#D97757]/30 px-3.5 py-2 text-sm font-medium text-orange-300 transition-colors hover:bg-orange-500/20 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e1e] active:scale-95"
            onClick={() => {
              editModel();
              setEditingIngredient(item);
            }}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e1e] active:scale-95"
            onClick={() => {
              deleteModel();
              setDeletingIngredient(item);
            }}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    );
  });
  return props.ingredients.length > 0 ? (
    <>
      {editBtn ? (
        <EditDeleteModel
          previousIngredients={props.previousIngredients}
          setPreviousIngredients={props.setPreviousIngredients}
          editingIngredient={editingIngredient}
          editBtn={editBtn}
          editModel={editModel}
          ingredients={props.ingredients}
          setIngredients={props.setIngredients}
          setEditHighlight={setEditHighlight}
          setShowModel={props.setShowModel}
          setModelMsg={props.setModelMsg}
        />
      ) : null}
      {deleteBtn ? (
        <EditDeleteModel
          setDeleteBtn={setDeleteBtn}
          deleteModel={deleteModel}
          deletingIngredient={deletingIngredient}
          setIngredients={props.setIngredients}
        />
      ) : null}

      <section className="flex flex-col items-center justify-center mt-3 animate-[fadeIn_1s_ease-in-out]">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] text-[#D97757] font-bold w-[clamp(250px,50vw,620px)] md:mr-[185.69px]">
          Ingredients on hand:
        </h2>
        <ul className="list-disc flex flex-col ml-8 md:ml-0 mt-2 items-center min-h-32">
          {list}
        </ul>
        {props.ingredients.length > 3 ? (
          <div className="bg-[#EEECE8] text-black p-5 rounded-md mt-3 flex flex-col md:flex-row md:items-center justify-between md:space-x-3 space-y-3 w-[clamp(250px,50vw,620px)] md:w-[clamp(400px,70vw,820px)] animate-[fadeIn_1s_ease-in-out]">
            <div className="flex flex-col gap-y-3">
              <h3 className="text-[18px] font-semibold">Ready for a recipe?</h3>
              <p className="text-[#727275]">
                Generate a recipe from your list of ingredients.
              </p>
            </div>
            <button
              onClick={handleRateLimiting}
              className="bg-[#CA6A4E] h-12  cursor-pointer p-2 rounded-md text-white font-semibold transition duration-500 active:-translate-1 hover:-translate-y-1 hover:bg-[#7c5143f8]"
            >
              Get a recipe
            </button>
          </div>
        ) : null}
      </section>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center mt-3 animate-[fadeIn_1s_ease-in-out]">
      <h2 className="text-2xl text-[#D97757] font-bold w-[clamp(250px,50vw,620px)] md:mr-[185.69px]">
        Please enter at least 4 ingredients
      </h2>
    </div>
  );
}
