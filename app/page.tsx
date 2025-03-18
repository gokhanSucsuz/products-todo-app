"use client";
import { useEffect, useState } from "react";
import { useTodoStore } from "../store/todoStore";
import type { Todo } from "../store/todoStore";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function Home() {
  const {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useTodoStore();
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.currentTarget.elements[0] as HTMLInputElement).value;
    if (title) {
      addTodo(title);
      e.currentTarget.reset();
    }
  };

  const startEditing = (todo: Todo) => {
    useTodoStore.setState({ editingId: todo.id });
    setEditTitle(todo.title);
  };

  const handleUpdate = (id: string) => {
    if (editTitle.trim()) {
      updateTodo(id, editTitle);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Products (Todo App)
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new product..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button
              type="submit"
              className="bg-green-400 text-white px-4 py-3 rounded-lg hover:bg-green-500 transition-colors cursor-pointer"
            >
             <CiCirclePlus size={25}/>
            </button>
          </div>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => {
            const isEditing = useTodoStore.getState().editingId === todo.id;
            return (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-fit p-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:mx-2 focus:ring-blue-200"
                    />
                  ) : (
                    <span
                      className={`text-gray-800
                      }`}
                    >
                      {todo.title.length > 20 ? todo.title.slice(0, 20) + "..." : todo.title}
                    </span>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id, todo.title)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <IoIosCloseCircleOutline size={25} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      isEditing ? handleUpdate(todo.id) : startEditing(todo)
                    }
                    className={`${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"} text-white px-3 py-1 rounded-lg  transition-colors cursor-pointer`}
                  >
                    {isEditing ? <IoShieldCheckmarkOutline size={25} /> : <FiEdit size={20} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No products yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}