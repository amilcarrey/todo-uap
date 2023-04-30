import { useState } from "react";
import uaplogo from "/logo.png";

function App() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; state: boolean }[] | null
  >(null);
  const [task, setTask] = useState("");

  const addTask = (title: string) => {
    if (!tasks) {
      setTasks([{ id: Date.now(), title, state: false }]);
      return;
    }
    const newTasks = [...tasks, { id: Date.now(), title, state: false }];
    setTasks(newTasks);
  };

  const toggleStatus = (id: number) => {
    if (!tasks) {
      return;
    }
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, state: !task.state };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <>
      <div className="rounded-full overflow-hidden w-32 h-32 w-full flex justify-center gap-6">
        <img src={uaplogo} className="object-cover" alt="Vite logo" />
      </div>
      <h1 className="text-6xl">ToDo List - UAP</h1>
      <div className="">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-black">
            <form>
              <input
                type="text"
                className="border-2 border-black rounded-mdpy-2 h-10"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  addTask(task);
                  setTask("");
                }}
              >
                Add
              </button>
            </form>
          </div>
          <div className="text-black">
            <ul>
              {tasks
                ? tasks.map((task) => (
                    <li
                      className={task.state ? "text-white/20" : "text-black"}
                      key={task.id}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={task.state}
                          defaultChecked={false}
                          onClick={() => {
                            toggleStatus(task.id);
                          }}
                        />
                        {task.title}
                      </label>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
