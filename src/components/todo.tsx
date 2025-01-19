"use client";
import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import uuid4 from "uuid4";
import { cn } from "@/lib/utils";

type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  isEditing: boolean;
};

const Todo = () => {
  const [newTodoName, setNewTodoName] = useState("");
  const [activeId, setActiveId] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid4(),
      name: newTodoName,
      isDone: false,
      isEditing: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setNewTodoName("");
  };

  const handleTodoClick = (id: string) => {
    setActiveId(id);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isEditing: true } : todo))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isEditing: false } : todo
        )
      );
    }
  };

  const handleTodoCheck = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, name: e.target.value } : todo
      )
    );
  };

  const handleClickOutside = (e: MouseEvent) => {
    // alert(1);
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === activeId ? { ...todo, isEditing: false } : todo
        )
      );
      //   alert(2);

      setActiveId("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeId]);

  return (
    <div>
      {/* Main input */}
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewTodoName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTodo();
          }
        }}
        className="bg-orange-100 p-1 px-2 rounded-md mb-3"
      />{" "}
      {/* List */}
      {todos.length > 0 && (
        <ul className="flex flex-col space-y-2">
          {todos.map(({ id, name, isEditing, isDone }) =>
            isEditing ? (
              <input
                key={id}
                ref={inputRef}
                autoFocus
                type="text"
                className="bg-slate-100 rounded-md px-2 translate-x-4 mb-0"
                value={name}
                onChange={(e) => handleEdit(e, id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
              />
            ) : (
              <li key={id} className="flex items-center space-x-2 ">
                <Checkbox
                  id={id}
                  checked={isDone}
                  onCheckedChange={() => handleTodoCheck(id)}
                />
                <label
                  htmlFor={id}
                  className={cn(
                    "w-44",
                    isDone && "line-through text-slate-400"
                  )}
                  onClick={(e) => handleTodoClick(id)}
                >
                  {name}
                </label>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Todo;
