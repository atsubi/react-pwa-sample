import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

type Schedule = {
  readonly id: number;
  date: Date;
  content: string;  
};

function App() {
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [schecules, setSchedules] = useState<Schedule[]>([]);

  const handleSubmit = () => {

    // 入力されていない場合は何もしない
    if (!text || !date) return;

    // 入力されている場合は、新しいスケジュールを登録
    const newSchedule: Schedule = {
      id: new Date().getTime(),
      date: new Date(date),
      content: text
    };

    setSchedules((schecules) => [newSchedule, ...schecules]);

    

    // フォームを更新 
    setText('');
    setDate('');
  };


  const handleEditDate = (id: number, d: string) => {
    setSchedules((schecules) => {

      const newSchedules = schecules.map((schecule) => {
        if (schecule.id === id) {

          const copySchedule = Object.assign({}, schecule);
          copySchedule.date = new Date(d);
          return copySchedule;
        }
        return schecule;
      });

      console.log('=== Original schedule ===');
      schecules.map((schecule) => {
        console.log(`id: ${schecule.id}, date: ${schecule.date}, content: ${schecule.content}`);
      });

      return newSchedules;
    });
  };


  const handleEditContent = (id: number, ct: string) => {
    setSchedules((schecules) => {

      const newSchedules = schecules.map((schecule) => {
        if (schecule.id === id) {

          const copySchedule = Object.assign({}, schecule);
          copySchedule.content = ct;
          return copySchedule;
        }
        return schecule;
      });

      console.log('=== Original schedule ===');
      schecules.map((schecule) => {
        console.log(`id: ${schecule.id}, date: ${schecule.date}, content: ${schecule.content}`);
      });

      return newSchedules;
    });
  };


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
            return (
              <li key={schecule.id}>
                <input type="date" value={schecule.date.toLocaleDateString()} onChange={(e) => handleEditDate(schecule.id, e.target.value)} />
                <input type="text" value={schecule.content} onChange={(e) => handleEditContent(schecule.id, e.target.value)} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
