import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList/ProductsList';
import Cart from './components/Cart/Cart';


function App() {
  return (
      <Router>
      <nav className='list-none flex gap-10 items-center justify-center'>
        <Link className='text-xl text-red-500 font-extrabold' to="/">Products</Link>
        <Link className='text-xl text-red-500 font-extrabold' to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App
