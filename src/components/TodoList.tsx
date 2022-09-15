import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  StrictMode,
} from "react";
import CrossIcon from "../assets/images/icon-cross.svg";
import CheckIcon from "../assets/images/icon-check.svg";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd";

type Item = {
  id: string;
  content: string;
  complete: boolean;
};

type ChangeFunction = (item: Item) => void;

type ListChangeFunction = (source: number, destination: number) => void;

type RemoveFunction = (id: string) => void;

type filters = "filterAll" | "filterActive" | "filterCompleted";

export default function TodoList({
  list,
  handleListChange,
  handleChange,
  handleRemove,
  handleCleaning,
}: {
  list: Item[];
  handleListChange: ListChangeFunction;
  handleChange: ChangeFunction;
  handleRemove: RemoveFunction;
  handleCleaning: () => void;
}) {
  const [filteredList, setFilteredList] = useState(list);
  const [filter, setFilter] = useState<filters>("filterAll");

  const filterList = {
    filterAll: () => {
      setFilteredList(list);
    },
    filterActive: () => {
      setFilteredList(list.filter((item) => !item.complete));
    },
    filterCompleted: () => {
      setFilteredList(list.filter((item) => item.complete));
    },
  };

  useEffect(() => {
    filterList[filter]();
  }, [list, filter]);

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    handleListChange(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="w-full relative bg-white dark:bg-very-dark-desaturated-blue rounded shadow-xl shadow-very-light-grayish-blue/50 dark:shadow-very-dark-blue transition-colors duration-100 ease-in-out">
        <Droppable droppableId="task">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="h-72 overflow-auto"
            >
              {filteredList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided) => (
                    <TodoItem
                      draggableProvided={draggableProvided}
                      todo={item}
                      handleChange={handleChange}
                      handleRemove={handleRemove}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className="flex py-3 select-none justify-between items-center text-light-grayish-blue dark:text-very-dark-grayish-blue transition-colors duration-100 ease-in-out">
          <ItemCounter list={list} />
          <div className="absolute lg:relative flex justify-center bg-white dark:bg-very-dark-desaturated-blue rounded w-full lg:w-2/6 -bottom-16 lg:bottom-0 py-3 transition-colors duration-100 ease-in-out">
            <ul className="w-full flex justify-around lg:justify-between items-center font-bold text-light-grayish-blue dark:text-very-dark-grayish-blue text-sm px-10 lg:p-0 transition-colors duration-100 ease-in-out">
              <li
                className={`${
                  filter === "filterAll"
                    ? "text-bright-blue"
                    : "hover:text-dark-grayish-blue dark:hover:text-light-grayish-blue"
                }  cursor-pointer`}
                onClick={() => setFilter("filterAll")}
              >
                All
              </li>
              <li
                className={`${
                  filter === "filterActive"
                    ? "text-bright-blue"
                    : "hover:text-dark-grayish-blue dark:hover:text-light-grayish-blue"
                } cursor-pointer `}
                onClick={() => setFilter("filterActive")}
              >
                Active
              </li>
              <li
                className={`${
                  filter === "filterCompleted"
                    ? "text-bright-blue"
                    : "hover:text-dark-grayish-blue dark:hover:text-light-grayish-blue"
                } cursor-pointer`}
                onClick={() => setFilter("filterCompleted")}
              >
                Completed
              </li>
            </ul>
          </div>
          <span
            className="text-sm cursor-pointer hover:text-dark-grayish-blue dark:hover:text-light-grayish-blue mr-3 transition-colors duration-100 ease-in-out"
            onClick={() => handleCleaning()}
          >
            Clear Completed
          </span>
        </div>
      </div>
    </DragDropContext>
  );
}

const TodoItem = ({
  todo,
  handleChange,
  handleRemove,
  draggableProvided,
}: {
  todo: Item;
  handleChange: ChangeFunction;
  handleRemove: RemoveFunction;
  draggableProvided: DraggableProvided;
}) => {
  return (
    <li
      {...draggableProvided.draggableProps}
      ref={draggableProvided.innerRef}
      {...draggableProvided.dragHandleProps}
      className="flex items-center min-h-[48px] w-full px-4 py-2 border-b border-very-light-grayish-blue dark:border-very-dark-grayish-blue select-none text-sm transition-colors duration-100 ease-in-out"
    >
      <label
        htmlFor={todo.id}
        className=" flex grow group-hover:h-max items-center"
      >
        <input
          className="peer w-0 h-0"
          type="checkbox"
          name={todo.id}
          id={todo.id}
          checked={todo.complete}
          onChange={() => handleChange(todo)}
        />
        <div className="group shrink-0 flex justify-center items-center w-5 h-5 rounded-full bg-very-light-gray hover:bg-check-gradient dark:bg-very-dark-grayish-blue peer-checked:bg-check-gradient transition-colors duration-100 ease-in-out">
          {todo.complete ? (
            <img src={CheckIcon} alt="Completed" />
          ) : (
            <div className="w-[18px] h-[18px] rounded-full bg-white dark:bg-very-dark-desaturated-blue"></div>
          )}
        </div>
        <p className="grow overflow-hidden min-h-[20px] h-fit ml-3 mr-2 peer-checked:line-through text-very-dark-grayish-blue dark:text-light-grayish-blue peer-checked:text-very-light-grayish-blue dark:peer-checked:text-very-dark-grayish-blue">
          {todo.content}
        </p>
      </label>
      <button
        className="flex shrink-0 justify-center items-center w-[20px] h-[20px]"
        type="button"
        onClick={() => handleRemove(todo.id)}
      >
        <img src={CrossIcon} alt="Remove todo" />
      </button>
    </li>
  );
};

const ItemCounter = ({ list }: { list: Item[] }) => {
  let counter = list.length;
  return (
    <span className="ml-3 text-xs">
      {counter === 1 ? "1 item left" : `${counter} items left`}
    </span>
  );
};
