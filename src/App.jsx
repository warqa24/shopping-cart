import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Outlet } from "react-router";

function App() {
  return (
    <div>
      <Nav />
      <Outlet />

    </div>

  )
}

export default App;