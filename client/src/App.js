import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
import "tailwindcss/tailwind.css"; // Tailwind CSS import

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={HomePage} exact />
            {/* Other routes will go here */}
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
