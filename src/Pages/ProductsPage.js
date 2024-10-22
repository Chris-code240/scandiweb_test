import Products from "../Components/Products"
import { useState, useEffect } from "react"
import axios from "axios"

const ProductsPage = ({selectedProducts, setSelectedProducts, setProducts, products})=>{
    useEffect(()=>{
  
      axios.get('https://public-analiese-omen-be55ae91.koyeb.app/api.php').then((res)=> {
        setProducts(res.data)
  
      }).catch((e)=>console.log(e))
    },[])

    const checkBoxCallBack = (e)=>{

      if(e.target.checked){
        setSelectedProducts([...selectedProducts, e.target.nextElementSibling.textContent])
      }else{
        
        for(let p of products){
          setSelectedProducts(selectedProducts.filter(id => p.sku !== id))
        }

      }
      console.log(selectedProducts)
    }
    return (
        <div className="products-wrapper">
                <Products  products={products} checkBoxCallBack={checkBoxCallBack} />
        </div>
    )


}

export default ProductsPage