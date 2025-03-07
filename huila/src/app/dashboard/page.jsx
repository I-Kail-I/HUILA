"use client";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FaCheckCircle,
  FaTrash,
  FaPlus,
  FaRegCircle,
  FaEdit,
} from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
          dueDate,
          priority,
          createdAt: new Date().toISOString(),
        },
        ...todos,
      ]);
      setInput("");
      setDueDate("");
      setPriority("medium");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (category === "completed") return todo.completed;
    if (category === "active") return !todo.completed;
    return true;
  });

  const completedTodos = todos.filter((todo) => todo.completed);
  const progress = useSpring(0, { stiffness: 100, damping: 20 });
  const progressPercentage = useMotionValue(0);

  useEffect(() => {
    const total = todos.length;
    const completed = completedTodos.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    progressPercentage.set(percentage);
    progress.set(percentage);
  }, [todos]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-6"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <RiTodoLine className="text-blue-500 text-3xl mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">
                Todo Dashboard
              </h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                {completedTodos.length}/{todos.length}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                style={{ width: progressPercentage }}
                initial={{ width: 0 }}
                animate={{ width: `${progress.get()}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="mb-8 space-y-4">
            <div className="flex gap-2">
              <motion.input
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-black duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-black border p-3 rounded-lg flex items-center gap-2 hover:bg-black hover:text-white duration-150 cursor-pointer"
              >
                <FaPlus />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border border-gray-200 rounded-lg"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-2 border border-gray-200 rounded-lg"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6">
            {["all", "active", "completed"].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full capitalize ${
                  category === cat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Todo List */}
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleComplete(todo.id)}
                    className="text-blue-500 text-xl"
                  >
                    {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
                  </motion.button>

                  {editingId === todo.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => {
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, text: editText } : t
                          )
                        );
                        setEditingId(null);
                      }}
                      className="flex-1 bg-transparent focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <div className="flex-1">
                      <p
                        className={`${
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {todo.text}
                      </p>
                      <div className="flex gap-2 mt-1">
                        {todo.dueDate && (
                          <span className="text-xs px-2 py-1 bg-red-500 bg-opacity-100 rounded-full text-white">
                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        <span
                          className={`text-xs px-2 py-1 rounded-full text-white ${
                            todo.priority === "high"
                              ? "bg-red-500"
                              : todo.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {todo.priority} priority
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.text);
                    }}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(todo.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredTodos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <div className="mb-4 text-6xl">📭</div>
              <p>No tasks found in this category!</p>
              <p>Add a new task or try a different filter</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TodoList;
