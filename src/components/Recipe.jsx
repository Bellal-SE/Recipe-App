import Spinner from "./Spinner";
import Markdown from "react-markdown";
export default function Recipe(props) {
  return props.genRecipe === "" ? (
    props.recipeShown ? (
      <Spinner label={props.labelMsg} />
    ) : null
  ) : (
    <section
      className="
    mx-auto w-full max-w-5xl
    px-4 py-8
    sm:px-6 sm:py-10
    lg:px-8 lg:py-12
    animate-[fadeIn_1s_ease-in-out]
  "
    >
      <div
        className="
      overflow-hidden rounded-2xl
      border border-[#D97757]/30
      bg-[#2D2D2D]
      shadow-lg shadow-black/20
    "
      >
        {/* Recipe header */}
        <div
          className="
        border-b border-[#D97757]/25
        bg-[#D97757]/10
        px-5 py-5
        sm:px-8 sm:py-6
      "
        >
          <span
            className="
          mb-2 block text-xs font-semibold
          uppercase tracking-[0.2em]
          text-[#D97757]
        "
          >
            Your AI-generated recipe
          </span>

          <h2
            className="
          text-2xl font-bold leading-tight
          text-[#F5F5F4]
          sm:text-3xl
        "
          >
            Chef Claude Recommends
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
            A delicious recipe made with the ingredients you have on hand.
          </p>
        </div>

        {/* Generated recipe content */}
        <div
          className="
        px-5 py-6
        sm:px-8 sm:py-8
        lg:px-10
        text-[15px] leading-7
        text-gray-200
        sm:text-base sm:leading-8

        [&_h1]:mb-4
        [&_h1]:mt-2
        [&_h1]:text-2xl
        [&_h1]:font-bold
        [&_h1]:leading-tight
        [&_h1]:text-[#D97757]

        [&_h2]:mb-4
        [&_h2]:mt-8
        [&_h2]:border-b
        [&_h2]:border-[#D97757]/25
        [&_h2]:pb-2
        [&_h2]:text-xl
        [&_h2]:font-bold
        [&_h2]:text-[#E58A69]

        [&_h3]:mb-3
        [&_h3]:mt-6
        [&_h3]:text-lg
        [&_h3]:font-semibold
        [&_h3]:text-[#F5F5F4]

        [&_p]:mb-4
        [&_p]:text-gray-300

        [&_ul]:mb-5
        [&_ul]:list-disc
        [&_ul]:space-y-2
        [&_ul]:pl-6

        [&_ol]:mb-5
        [&_ol]:list-decimal
        [&_ol]:space-y-3
        [&_ol]:pl-6

        [&_li]:pl-1
        [&_li::marker]:text-[#D97757]

        [&_strong]:font-semibold
        [&_strong]:text-white

        [&_a]:text-[#E58A69]
        [&_a]:underline
        [&_a]:underline-offset-4
        [&_a:hover]:text-[#F5A080]

        [&_blockquote]:my-5
        [&_blockquote]:border-l-4
        [&_blockquote]:border-[#D97757]
        [&_blockquote]:bg-white/3
        [&_blockquote]:px-4
        [&_blockquote]:py-3
        [&_blockquote]:text-gray-300

        [&_hr]:my-8
        [&_hr]:border-[#D97757]/20

        [&_code]:rounded
        [&_code]:bg-black/30
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:text-[#F5A080]

        [&_pre]:my-5
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-xl
        [&_pre]:bg-[#222222]
        [&_pre]:p-4
      "
        >
          <Markdown>{props.genRecipe}</Markdown>
        </div>
      </div>
    </section>
  );
}
