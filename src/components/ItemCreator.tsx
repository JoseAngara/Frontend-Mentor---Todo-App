import { useState, ChangeEvent, SyntheticEvent } from "react";

type CreateFunction = (content: string) => void;

function capitalizeFistLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ItemCreator({
  handleCreate,
}: {
  handleCreate: CreateFunction;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    handleCreate(content);
    setContent("");
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(capitalizeFistLetter(event.target.value));
  };

  return (
    <form
      className="w-full flex items-center h-12 p-2 px-4 mb-3 rounded bg-white dark:bg-very-dark-desaturated-blue  dark:text-light-grayish-blue  text-sm transition-colors duration-100 ease-in-out"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full border border-very-light-gray dark:border-very-dark-grayish-blue mr-2 transition-colors duration-100 ease-in-out"></div>
      <input
        className="grow dark:bg-very-dark-desaturated-blue px-2 text-very-darkish-grayish-blue caret-bright-blue focus:outline-none placeholder:text-light-grayish-blue transition-colors duration-100 ease-in-out"
        type="text"
        name="createItem"
        id="createItem"
        value={content}
        autoFocus
        autoComplete="off"
        onChange={handleChange}
        placeholder="Create a new todo..."
      />
    </form>
  );
}
