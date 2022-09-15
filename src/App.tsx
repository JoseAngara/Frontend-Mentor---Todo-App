import React, {
  useState,
  useReducer,
  useEffect,
  ReducerWithoutAction,
  ReducerStateWithoutAction,
  DispatchWithoutAction,
} from "react";
import { v4 as uuid } from "uuid";
import TodoList from "./components/TodoList";
import ItemCreator from "./components/ItemCreator";

type TodoItem = {
  id: string;
  content: string;
  complete: boolean;
};

type TodoAction =
  | {
      type: "ADD_TODO";
      content: string;
    }
  | {
      type: "REMOVE_TODO" | "DO_TODO" | "UNDO_TODO";
      id: string;
    }
  | {
      type: "CLEAR_COMPLETED";
    }
  | {
      type: "CHANGE_TODO_LIST";
      list: TodoItem[];
    };

let todoReducer = (state: TodoItem[], action: TodoAction) => {
  switch (action.type) {
    case "ADD_TODO": {
      return state.concat({
        id: uuid(),
        content: action.content,
        complete: false,
      });
    }
    case "DO_TODO": {
      return state.map((item) => {
        if (item.id !== action.id) return item;
        return {
          ...item,
          complete: true,
        };
      });
    }
    case "UNDO_TODO": {
      return state.map((item) => {
        if (item.id !== action.id) return item;
        return {
          ...item,
          complete: false,
        };
      });
    }
    case "REMOVE_TODO": {
      return state.filter((item) => item.id !== action.id);
    }
    case "CHANGE_TODO_LIST": {
      return action.list;
    }
    case "CLEAR_COMPLETED": {
      return state.filter((item) => !item.complete);
    }
  }
};

function capitalizeFistLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const initialList: TodoItem[] = [
  { complete: true, content: "Complete online JavaScript Course", id: uuid() },
  { complete: false, content: "Jog around the park 3x", id: uuid() },
  { complete: false, content: "10 minutes meditation", id: uuid() },
  { complete: false, content: "Read for 1 hour", id: uuid() },
  { complete: false, content: "Pick up groceries", id: uuid() },
  {
    complete: false,
    content: "Complete Todo App on Frontend Mentor",
    id: uuid(),
  },
];

function useSemiPersistentState(
  key: string,
  initialState: any
): [any, React.Dispatch<any>] {
  let valueInStorage = localStorage.getItem(key);
  const [value, setValue] = useState(
    valueInStorage !== null ? JSON.parse(valueInStorage) : initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

function useSemiPersistentReducer<S, A>(
  key: string,
  reducer: (prevState: S, action: A) => S,
  initialValue: S
): [value: S, dispatchValue: React.Dispatch<A>] {
  let valueInStorage = localStorage.getItem(key);
  const [value, dispatchValue] = useReducer(
    reducer,
    valueInStorage !== null ? JSON.parse(valueInStorage) : initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, dispatchValue];
}

function App() {
  const [todoList, dispatchTodoList] = useSemiPersistentReducer(
    "todo-list",
    todoReducer,
    initialList
  );
  const [darkTheme, setDarkTheme] = useSemiPersistentState("dark-theme", false);

  const handleTodoChange = (item: TodoItem) => {
    dispatchTodoList({
      type: `${item.complete ? "UNDO_TODO" : "DO_TODO"}`,
      id: item.id,
    });
  };

  const handleTodoRemove = (id: string) => {
    dispatchTodoList({ type: "REMOVE_TODO", id });
  };

  const handleTodoCreate = (content: string) => {
    if (content) {
      dispatchTodoList({
        type: "ADD_TODO",
        content: capitalizeFistLetter(content),
      });
    }
  };

  const handleCleanComplete = () => {
    dispatchTodoList({ type: "CLEAR_COMPLETED" });
  };

  const onListChange = (source: number, destination: number) => {
    const reorder = (
      list: TodoItem[],
      startIndex: number,
      endIndex: number
    ): TodoItem[] => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    dispatchTodoList({
      type: "CHANGE_TODO_LIST",
      list: reorder(todoList, source, destination),
    });
  };

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <div className={`${darkTheme ? "dark" : ""}`}>
      <div className="min-h-screen flex flex-col justify-start items-center font-josefina-sans font-normal bg-very-light-gray dark:bg-very-dark-blue bg-mobile-light dark:bg-mobile-dark bg-no-repeat bg-contain sm:bg-desktop-light sm:dark:bg-desktop-dark m-0 text-lg transition-colors duration-100 ease-in-out">
        <header className="w-11/12 sm:w-2/5 flex justify-between m-10">
          <h1 className="text-very-light-gray font-bold text-2xl tracking-hyper-widest">
            TODO
          </h1>
          <button
            className="h-8 w-8 bg-no-repeat bg-center bg-icon-moon dark:bg-icon-sun"
            onClick={toggleTheme}
          ></button>
        </header>
        <div className="w-10/12 sm:w-2/5">
          <ItemCreator handleCreate={handleTodoCreate} />
          <TodoList
            list={todoList}
            handleListChange={onListChange}
            handleChange={handleTodoChange}
            handleRemove={handleTodoRemove}
            handleCleaning={handleCleanComplete}
          />
        </div>
        <p className="text-dark-grayish-blue dark:text-very-dark-grayish-blue my-24 text-sm lg:text-xs lg:my-8">
          Drag and drop to reorder the list
        </p>
      </div>
    </div>
  );
}

export default App;
