import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Home />
      <Footer />
    </div>
  );
}

export default App;