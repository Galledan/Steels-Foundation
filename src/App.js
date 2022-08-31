import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Donate from './pages/Donate';
import Join from './pages/Join';
import Payment from './pages/Payment';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="/donate" element={<Donate />}/> 
      <Route path="/join" element={<Join />}/> 
      <Route path="/donate/payment" element={<Payment/>}/> 
   </Routes>
  );
}

export default App;
