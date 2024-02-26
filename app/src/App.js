
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';

function App() {
  return (
    <>
    <Router>
       <Navbar/>
       <Routes>
       <Route path="/" element ={<Todo />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
       
       </Routes>
    </Router>
    </>
  );
}

export default App;
