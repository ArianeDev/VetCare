import { Input } from '../Input';
import { Label } from '../Label';
import { Button } from '../Button';
import './style.sass';

export function Forms({ listInput, method, title, textButton}){
    
    return(
        <div className="containerForm">
            <div className="forms">
                <h1>{title}</h1>
                <form onSubmit={method}>
                    {listInput.map((item, key) => (
                        <div className="containerInput">
                            <Label title={item.labelName}/>
                            <Input 
                                type={item.type} 
                                placeholder={item.placeholder}
                                value={item.value}
                                setFunction={item.setFunction}/>
                        </div>
                    ))}
                    <Button text={textButton}/>
                </form>
            </div>
        </div>
    )
}