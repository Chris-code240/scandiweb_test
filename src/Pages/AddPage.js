import { useState, useEffect } from "react"
import axios from "axios"
import {useLocation, useNavigate} from "react-router-dom"
const AddPage = ()=>{

    
    const isValid = (obj) => Object.values(obj).every(value => value !== undefined && value !== '' && value !== null);

    const navigator = useNavigate()
    let [isEmpty, setIsEmpty] = useState(true)
    let [formData, setFormData] = useState({name:'', sku: '', price:'',type:'book', params:{weight: ''}})
    let [renderIsEmptyWarning, setRenderIsEmptyWarning] = useState(false)

     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
           const updatedFormData = { ...prev, [name]: value };
     
           // Perform validation using the updated state
           if (isValid(updatedFormData) && isValid(updatedFormData.params)) {
              setIsEmpty(false);
           } else {
              setIsEmpty(true);
           }
     
           return updatedFormData;
        });
     };
     

    const handleParamChange = (e)=>{
        const type = e.target.value
        setFormData({...formData, type:type, params: type ==='furniture' ? {height: '', width:'', length:''} : type === 'dvd' ? {size: ''} : {weight: ''}})
    }

    const handleParamInputChange = (e)=>{
        let {name , value } = e.target
            setFormData((prev)=>{

                const updatedFormData = {...prev, params: {...prev.params, [name]:value}}
                           // Perform validation using the updated state
                if (isValid(updatedFormData) && isValid(updatedFormData.params)) {
                    setIsEmpty(false);
                } else {
                    setIsEmpty(true);
                }
        
                return updatedFormData;
            })

    }
    const handleSubmit = (e) =>{
        e.preventDefault()


        if(!isEmpty){
            setRenderIsEmptyWarning(true)
            axios.post('https://public-analiese-omen-be55ae91.koyeb.app/api.php', formData)
            .then((res) => {
                if (res.data['success']) {
                    navigator('/');
                } else {
                    console.log(res.data);
                }
            });
        }else{
            setRenderIsEmptyWarning(true)
        }
        


        
        
    }


        return (
            <form onSubmit={handleSubmit} name="product_form" id="product_form">
                <div className="input-wrapper">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" name="sku" id="sku"  onChange={handleInputChange} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleInputChange} />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="price">Price($)</label>
                    <input type="number" name="price"  id="price"  onChange={handleInputChange} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="type">Type Switcher</label>
                    <select name="type" id="productType" value={formData.type}  onChange={handleParamChange}>
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                { formData.type === 'dvd' && (
                    <div>
                    <div className="input-wrapper">
                    <label htmlFor="size">Size(MB)</label>
                    <input type="number" name="size" id="size"  onChange={handleParamInputChange} />
                </div>
                <h4>Please, provide size</h4>
                </div>
                )}

                { formData.type === 'book' && (
                    <div>
                    <div className="input-wrapper">
                    <label htmlFor="weight">Weight(KG)</label>
                    <input type="number" name="weight" id="weight"  onChange={handleParamInputChange} />
                    </div>
                    <h4>Please, provide weight</h4>
                    </div>
                )}

                { formData.type === 'furniture' && (
                    <div>
                        <div className="input-wrapper">
                            <label htmlFor="height">Height(CM)</label>
                            <input type="number" name="height" id="height"  onChange={handleParamInputChange} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="width">Width(CM)</label>
                            <input type="width" name="width" id="width"  onChange={handleParamInputChange} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="length">Length(CM)</label>
                            <input type="number" id="length" name="length"  onChange={handleParamInputChange} />
                        </div>
                        <h4>Please, provide dimensions</h4>
                    </div>
                )}
                {renderIsEmptyWarning && (<h2>Please, submit required data</h2>)}
            </form>
        )
}

export default AddPage