import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCar from "./pages/CreateCar";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create-car" element={<CreateCar />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
