import Product from "./Product";

const Products = ({products = [], checkBoxCallBack = ()=>{}})=>{

    return (
        <ul className="products">
            {products.map((product)=><Product product={product} checkBoxCallBack={checkBoxCallBack} /> )}
        </ul>
    )

}

export default Products