import { useState } from "react";
export default function EditDeleteModel(props) {
  console.log(`ingredients : ${JSON.stringify(props.ingredients)}`);
  console.log(`PrevIngredients : ${JSON.stringify(props.previousIngredients)}`);
  const [inputValue, setInputValue] = useState("");
  function handleModelEdit(currentItem) {
    console.log(currentItem);
    if (
      JSON.stringify(props.previousIngredients) ===
      JSON.stringify(props.ingredients)
    ) {
      props.editModel();
      props.setShowModel((prev) => !prev);
      props.setModelMsg({
        headMsg: "Duplicate!",
        paraMsg: "Please enter a different Ingredient.",
      });
      return;
    }
    props.setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ing.id === currentItem.id
          ? {
              ...ing,
              name: `${inputValue[0].toUpperCase()}${inputValue.slice(1)}`,
            }
          : ing
      )
    );
    props.setEditHighlight(currentItem.id);
    props.editModel();
  }

  function handleDelete(id) {
    props.setIngredients((prevIngredient) =>
      prevIngredient.filter((ingredient) => ingredient.id !== id)
    );
  }

  return props.editBtn ? (
    <div className="animate-[fadeIn_0.5s_ease-in-out] fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#262626] p-5 shadow-2xl shadow-black/50 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-neutral-100 sm:text-xl">
          Edit Ingredient
        </h2>

        <div className="mb-6">
          <label
            htmlFor="edit-modal-input"
            className="mb-2 block text-sm font-medium text-neutral-300"
          >
            New value
          </label>
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="editInput"
            id="edit-modal-input"
            type="text"
            placeholder={props.editingIngredient.name}
            className="w-full rounded-lg border border-orange-400/40 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
          />
        </div>

        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626] active:scale-95 sm:w-auto"
            onClick={props.editModel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-400/40 bg-orange-500/15 px-4 py-2.5 text-sm font-medium text-orange-300 transition-colors hover:bg-orange-500/25 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626] active:scale-95 sm:w-auto"
            onClick={() => handleModelEdit(props.editingIngredient)}
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
            Edit
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="animate-[fadeIn_0.5s_ease-in-out] fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#262626] p-5 shadow-2xl shadow-black/50 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-neutral-100 sm:text-xl">
          {`Are you sure you want to remove ${props.deletingIngredient.name}?`}
        </h2>
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626] active:scale-95 sm:w-auto"
            onClick={props.deleteModel}
          >
            NO
          </button>

          <button
            type="button"
            className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-400/40 bg-orange-500/15 px-4 py-2.5 text-sm font-medium text-orange-300 transition-colors hover:bg-orange-500/25 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626] active:scale-95 sm:w-auto"
            onClick={() => {
              handleDelete(props.deletingIngredient.id);
              props.deleteModel();
            }}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
}
