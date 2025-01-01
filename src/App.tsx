import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

type Schedule = {
  date: Date;
  content: string;  
};

function App() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [schecules, setSchedules] = useState<Schedule[]>([]);

  const handleSubmit = () => {

    // 入力されていない場合は何もしない
    if (!text || !date) return;

    // 入力されている場合は、新しいスケジュールを登録
    const newSchedule: Schedule = {
      date: new Date(date),
      content: text
    };

    setSchedules((schecules) => [newSchedule, ...schecules]);

    // フォームを更新
    setText('');

  }

  return (
    <>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        >
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <input type="submit" value="追加" onSubmit={handleSubmit}/>
        </form>
        <ul>
          {schecules.map((schecule) => {
            return <li>{schecule.date.toLocaleDateString()} {schecule.content}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
