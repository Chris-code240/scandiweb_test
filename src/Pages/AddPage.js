import { useState } from "react"
import axios from "axios"
import {useLocation, useNavigate} from "react-router-dom"
const AddPage = ()=>{

    const navigatpor = useNavigate()
    let [formData, setFormData] = useState({name:'', sku: '', price:'',type:'book', params:{weight: ''}})

    const handleInputChange = (e)=>{

        const { name, value} = e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }

    const handleParamChange = (e)=>{
        const type = e.target.value
        setFormData({...formData, type:type, params: type ==='furniture' ? {height: '', width:'', length:''} : type === 'dvd' ? {size: ''} : {weight: ''}})
        console.log(formData)

    }

    const handleParamInputChange = (e)=>{
        let {name , value } = e.target
            setFormData((prev)=>({...prev, params: {...prev.params, [name]:value}}))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://christian-marf0.onlinewebshop.net/api.php', formData).then((res)=>{
            if(res.data['success']){
                navigatpor('/')
            }else{
                alert(res.data.message)
            }
        })
    }


        return (
            <form onSubmit={handleSubmit} name="product-form" id="product-form">
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
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type-switcher" value={formData.type}  onChange={handleParamChange}>
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                { formData.type === 'dvd' && (
                    <div className="input-wrapper">
                    <label htmlFor="size">Size(MB)</label>
                    <input type="number" name="size" id="size"  onChange={handleParamInputChange} />
                </div>
                )}

                { formData.type === 'book' && (
                    <div className="input-wrapper">
                    <label htmlFor="weight">Weight(KG)</label>
                    <input type="number" name="weight" id="weight"  onChange={handleParamInputChange} />
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
                    </div>
                )}

            </form>
        )
}

export default AddPage