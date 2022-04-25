import classes from "./App.module.css";
import AddField from "./AddField/AddField";
import { useState } from "react";
import Login from "./Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Auth/Routes/PrivateRoute";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  const [smileyFace, setSmileyFace] = useState(false);

  const handleClick = () => {
    setSmileyFace((prevState) => !prevState);
  };

  return (
    <div>
      <nav className={classes.wrapper} onClick={handleClick}>
        <h1 className={classes.element}>SITS Database</h1>
      </nav>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/database" element={<PrivateRoute />}>
              <Route path="/database" element={<AddField />} />
            </Route>
            <Route path="/" element={<Login smileyFace={smileyFace} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
