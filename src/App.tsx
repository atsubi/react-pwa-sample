// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" value="" onChange={(e) => e.preventDefault()}/>
          <input type="submit" value="編集" onSubmit={(e) => e.preventDefault()}/>
        </form>
      </div>
    </>
  );
}

export default App;
