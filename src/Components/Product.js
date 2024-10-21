

const Product = ({product = {}, checkBoxCallBack = ()=>{}})=>{


    return (
        <li key={product['sku']} className="product">
            <input type={'checkbox'} onChange={checkBoxCallBack} />
            <p>{product['sku']}</p>
            <p>{product['name']}</p>
            <p>{product['price']} $</p>
            {product['weight'] && ( <p>{product['weight']} KG</p> )}
            {product['size'] && ( <p>{product['size']} MB</p> )}

            { product.height !== undefined && product.width !== undefined && product.length !== undefined &&(
                <div>Dimensions:
                    <span>{product.height}</span> x <span>{product.width}</span> x <span>{product.length}</span>
                </div>
            )}

        </li>
    )
}

export default Product