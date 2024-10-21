
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"
import Button from "./Button"

import axios from "axios"

const Header = ({selectedProducts=[], setSelectedProducts, setProducts, products=[]})=>{

    const location = useLocation()
    const handleMassDelete = (e)=>{

        console.log(selectedProducts)
        axios.delete('http://christian-marf0.onlinewebshop.net/api.php',{data:selectedProducts}).then(res =>{
            if(res.data.success){
              for (let p of selectedProducts){
                setProducts(products.filter(product => product.sku !== p));
            }
                setSelectedProducts([])
            }
        }).catch(e=>alert(JSON.stringify(e)))

    }
    return (
        <header>
            <nav>
                {location.pathname === "/" && (<h2>Products Page</h2>)}
                {location.pathname === "/add" && (<h2>Add Product </h2>)}

                {location.pathname === "/" && (
                    <ul>
                    <li>
                        <Link to={'/add'}>
                            <Button text={'ADD'} />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <Button text={'MASS DELETE'} callback={handleMassDelete} />
                        </Link>
                    </li>
                </ul>
                )}
                {location.pathname === "/add" && (
                    <ul>
                    <li><Button text={'SAVE'} type='submit' form={'product-form'} /> </li>
                    <li>
                        <Link to={'/'}>
                            <Button text={'CANCEL'} />
                        </Link>
                    </li>
                </ul>
                )}
            </nav>
            <hr />
        </header>
    )
}

export default Header