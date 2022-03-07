import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import DataPage from "./DataPage";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      {/* hitta ett sätt att rendera olika props till samma komponent
      beroende på vilken länk som klickas i menyn 
      ***
      Skicka med alla data och sen i data komponenten
      välja vilken beroende på menyval*/}
      <Link to="/" key="temp">
        home{" "}
      </Link>
      <Link to="/datapage/temp" key="temp">
        temp{" "}
      </Link>
      <Link to="/datapage/glaciersize" key="glacier">
        glacier{" "}
      </Link>
      <Link to="/datapage/sealevel" key="sea">
        sea{" "}
      </Link>
      <Link to="/datapage/co2" key="co2">
        co2{" "}
      </Link>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/datapage/:dataName" element={<DataPage />}></Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
