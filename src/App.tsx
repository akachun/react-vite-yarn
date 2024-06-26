import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AnimatePage from "./page/AnimatePage";
import PopupTestPage from "./page/PopupTestPage";
import PickerTestPage from "./page/PickerTestPage";
import CalculatorPage from "./page/CalculatorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <div>
            <button>
              <Link to="/animate">animate page</Link>
            </button>
            <button>
              <Link to="/popup">popup page</Link>
            </button>
            <button>
              <Link to="/picker">picker page</Link>
            </button>
            <button>
              <Link to="/calculator">calculator page</Link>
            </button>
          </div>
          <Routes>
            <Route path="/animate" element={<AnimatePage />} />
            <Route path="/popup" element={<PopupTestPage />} />
            <Route path="/picker" element={<PickerTestPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
