import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList/ProductsList';
import Cart from './components/Cart/Cart';


function App() {
  return (
    <>
      <nav className='list-none flex gap-10 items-center justify-center'>
        <Link className='text-xl text-red-500 font-extrabold' to="/">Products</Link>
        <Link className='text-xl text-red-500 font-extrabold' to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}


export default App
