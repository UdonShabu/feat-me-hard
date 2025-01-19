import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@convex-dev/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function TodoEx1() {
  const todos = useQuery("todos:getTodos") || [];
  const addTodo = useMutation("todos:addTodo");
  const updateTodo = useMutation("todos:updateTodo");
  const reorderTodos = useMutation("todos:reorderTodos");

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  // Add new todo
  const handleAddTodo = async (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      await addTodo({ name: newTodo, notifyAt: null });
      setNewTodo("");
    }
  };

  // Toggle todo completion with sound
  const handleToggleTodo = async (todo) => {
    const audio = new Audio("/tick.mp3");
    audio.play();
    await updateTodo({ id: todo._id, updates: { isDone: !todo.isDone } });
  };

  // Handle inline editing
  const handleEditTodo = async (e, todo) => {
    if (e.key === "Enter") {
      await updateTodo({ id: todo._id, updates: { name: e.target.value } });
      setEditingTodoId(null);
    }
  };

  // Handle drag-and-drop reorder
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(todos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    await reorderTodos({
      reordered: reordered.map((todo, index) => ({
        id: todo._id,
        order: index,
      })),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
          placeholder="Add a new todo..."
          className="w-full p-2 border rounded"
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="flex items-center space-x-2 p-2 border rounded"
                    >
                      <input
                        type="checkbox"
                        checked={todo.isDone}
                        onChange={() => handleToggleTodo(todo)}
                        className="w-5 h-5"
                      />
                      {editingTodoId === todo._id ? (
                        <input
                          type="text"
                          defaultValue={todo.name}
                          onKeyDown={(e) => handleEditTodo(e, todo)}
                          className="flex-grow border rounded px-2"
                        />
                      ) : (
                        <span
                          onClick={() => setEditingTodoId(todo._id)}
                          className={`flex-grow ${
                            todo.isDone ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.name}
                        </span>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
