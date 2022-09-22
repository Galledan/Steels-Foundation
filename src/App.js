import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Donate from './pages/Donate';
import Join from './pages/Join';
import Admin from './pages/Admin';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="/donate" element={<Donate />}/> 
      <Route path="/join" element={<Join />}/> 
      <Route path="/admin" element={<Admin />}/> 
   </Routes>
  );
}

export default App;
