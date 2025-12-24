"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import { Plus, Trash2, CheckCircle, Circle, ClipboardList } from "lucide-react"; // আইকন ইমপোর্ট

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <ClipboardList className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              My Tasks
            </h1>
          </div>
          <p className="text-indigo-200 text-sm">Stay organized and productive.</p>
        </div>

        {/* Input Section */}
        <div className="px-8 mb-6">
          <div className="relative group">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            <button
              onClick={addTodo}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl transition-all active:scale-95 flex items-center gap-1 shadow-lg"
            >
              <Plus size={20} />
              <span className="font-medium">Add</span>
            </button>
          </div>
        </div>

        {/* Todo List Section */}
        <div className="px-4 pb-8 max-h-[400px] overflow-y-auto custom-scrollbar">
          <ul className="space-y-3 px-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  todo.completed 
                    ? "bg-white/5 opacity-60" 
                    : "bg-white/10 hover:bg-white/15 border border-white/5 shadow-sm"
                }`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle className="text-emerald-400 w-6 h-6 shrink-0" />
                  ) : (
                    <Circle className="text-slate-400 group-hover:text-indigo-400 w-6 h-6 shrink-0" />
                  )}
                  <span
                    className={`text-base transition-all ${
                      todo.completed ? "line-through text-slate-400" : "text-slate-100"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="py-12 text-center">
              <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                <ClipboardList className="text-slate-500 w-8 h-8" />
              </div>
              <p className="text-slate-400 font-medium">No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}