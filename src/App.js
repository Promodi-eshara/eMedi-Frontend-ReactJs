import logo from './logo.svg';
import './App.css';
import {Router,Routes }from "react-router-dom"
import Home from './pages/Home/Home';
function App() {
  return (
  //  <RouterProvider router={router}/>
  <Router>
    <Routes path="/"> <Home/></Routes>
  </Router>
  
  );
}

export default App;
