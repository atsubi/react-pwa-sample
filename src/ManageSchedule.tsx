/**
 * 予定を管理するクラス
 */
import { useState } from "react";

export default function ManageSchedule() {
  type Schedule = {
    readonly id: number;
    date: string;
    content: string;
  };

  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleSubmit = () => {
    // 入力されていない場合は何もしない
    if (!text || !date) return;

    // 入力されている場合は、新しいスケジュールを登録
    const newSchedule: Schedule = {
      id: new Date().getTime(),
      date: date,
      content: text,
    };

    setSchedules((schecules) => [newSchedule, ...schecules]);

    // フォームを更新
    setText("");
    setDate("");
  };

  const handleEditDate = (id: number, d: string) => {
    setSchedules((schedules) => {
      const newSchedules = schedules.map((schedule) => {
        if (schedule.id === id) {
          const copySchedule = Object.assign({}, schedule);
          copySchedule.date = d;
          return copySchedule;
        }
        return schedule;
      });

      console.log("=== Original schedule ===");
      schedules.map((schedule) => {
        console.log(
          `id: ${schedule.id}, date: ${schedule.date}, content: ${schedule.content}`,
        );
      });

      return newSchedules;
    });
  };

  const handleEditContent = (id: number, ct: string) => {
    setSchedules((schedules) => {
      const newSchedules = schedules.map((schedule) => {
        if (schedule.id === id) {
          const copySchedule = Object.assign({}, schedule);
          copySchedule.content = ct;
          return copySchedule;
        }
        return schedule;
      });

      console.log("=== Original schedule ===");
      schedules.map((schedule) => {
        console.log(
          `id: ${schedule.id}, date: ${schedule.date}, content: ${schedule.content}`,
        );
      });

      return newSchedules;
    });
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="追加" onSubmit={handleSubmit} />
        </form>
        <ul>
          {schedules.map((schedule) => {
            return (
              <li key={schedule.id}>
                <input
                  type="date"
                  value={schedule.date}
                  onChange={(e) => handleEditDate(schedule.id, e.target.value)}
                />
                <input
                  type="text"
                  value={schedule.content}
                  onChange={(e) =>
                    handleEditContent(schedule.id, e.target.value)
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
