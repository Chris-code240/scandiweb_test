


const Button = ({text, callback = ()=>{}, type = null, form = null})=>{

    return (
        <button onClick={callback} type={type !== null ? type : 'button'} form={form !== null ? form : 'null'} >
                {text}
        </button>
    ) 
}

export default Button

