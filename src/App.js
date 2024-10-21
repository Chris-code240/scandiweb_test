import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from "./Pages/ProductsPage"
import AddPage from "./Pages/AddPage"
import Header from './Components/Header';
import { useState, useEffect } from "react"

function App() {

  let [selectedProducts, setSelectedProducts] = useState([]) 
  let [products, setProducts] = useState([])
  return (
    <Router>

      <Header selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} setProducts={setProducts} products={products} />
      <Routes >
        <Route path='/' element = {<ProductsPage selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} products={products} setProducts={setProducts} />} />
        <Route path='/add' element = {<AddPage />} />
      </Routes>

    </Router>
  );
}

export default App;
