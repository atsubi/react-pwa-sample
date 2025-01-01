import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [text, setText] = useState("ノア");

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <input type="submit" value="編集" onSubmit={(e) => e.preventDefault()}/>
        </form>
      </div>

      <p>{text}</p>

    </>
  );
}

export default App;
