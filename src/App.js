import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import LoginSignup from './Components/LoginSignup';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(sessionStorage.getItem('auth'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  return (
    <div className="App">
      <Router>
        <NavBar auth={auth} name={name} setAuth = {setAuth} setName={setName}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup action="login" setAuth = {setAuth} setName={setName}/>} />
          <Route path="/signup" element={<LoginSignup action="signup" setAuth = {setAuth} setName={setName}/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
