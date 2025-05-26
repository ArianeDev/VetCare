import './style.sass';

export function Input({ type, placeholder, value, setFunction}){
    return(
        <div className="input_container">
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => setFunction(e.target.value)} 
                className='inputForms' 
                required
            />
        </div>
    )
}