"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import { Plus, Trash2, CheckCircle, Circle, ClipboardList } from "lucide-react"; 

export default function Home() {
  // ✅ Load from localStorage safely
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [text, setText] = useState("");

  // ✅ Save to localStorage
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
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6">
      {/* Main Card - Improved Contrast */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <ClipboardList className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              My Tasks
            </h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Stay organized and productive.</p>
        </div>

        {/* Input Field - Better Visibility */}
        <div className="px-8 mb-8">
          <div className="relative group">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
            />
            <button
              onClick={addTodo}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 rounded-xl transition-all active:scale-95 flex items-center gap-1 shadow-lg shadow-indigo-500/30"
            >
              <Plus size={20} strokeWidth={3} />
              <span className="font-semibold">Add</span>
            </button>
          </div>
        </div>

        {/* Todo List Area */}
        <div className="px-6 pb-8 max-h-[450px] overflow-y-auto custom-scrollbar">
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                  todo.completed 
                    ? "bg-slate-800/20 border-transparent opacity-50" 
                    : "bg-slate-800/40 border-white/5 hover:border-indigo-500/30 shadow-md"
                }`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <div className="bg-emerald-500/20 p-1 rounded-full">
                      <CheckCircle className="text-emerald-400 w-6 h-6 shrink-0" />
                    </div>
                  ) : (
                    <Circle className="text-slate-500 group-hover:text-indigo-400 w-6 h-6 shrink-0 transition-colors" />
                  )}
                  <span
                    className={`text-[15px] font-medium transition-all duration-300 ${
                      todo.completed 
                        ? "line-through text-slate-500" 
                        : "text-indigo-50"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all md:opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="py-16 text-center">
              <div className="inline-block p-5 bg-slate-800/50 rounded-full mb-4">
                <ClipboardList className="text-slate-600 w-10 h-10" />
              </div>
              <p className="text-slate-500 font-semibold tracking-wide">No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}