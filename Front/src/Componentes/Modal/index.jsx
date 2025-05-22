import './style.sass';
import { Forms } from '../Forms';

export function Modal({dado, onClose, isOpen}){
    if(!isOpen){
        return null;
    }

    return(
        <div className="modalBack">
            <div className="modalContainer">
                <div className="modalHeader">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="forms">
                    <Forms />
                </div>
            </div>
        </div>
    )
}