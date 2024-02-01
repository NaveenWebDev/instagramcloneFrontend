import { Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import RightSiderBar from "./Pages/RightSiderBar";
import Home from "./Pages/Home";

function App() {
  return (
    <>
    <div className="flex justify-between">

  <header className="w-[23%] h-screen sticky top-0 left-0">
    <Navbar></Navbar>
  </header>
        <div className="w-[50%]">

          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/about" element={<h1>this is about page</h1>} />
          </Routes>
        </div>

          <div className="w-[27%] h-screen sticky right-0 top-0">
              <RightSiderBar></RightSiderBar>
          </div>

    </div>
    </>
  );
}

export default App;
