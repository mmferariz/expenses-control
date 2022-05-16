import React, { useState } from 'react'
import Message from './Message';


const Budget = ({budget, setBudget, setIsBudgetValid}) => {

  const [msj, setMsj] = useState('');

  const handleBudget = (e) => {
    e.preventDefault();
    if(!budget || budget < 0){
      setMsj('No es un presupuesto valido');
    } else {
      setMsj('');
      setIsBudgetValid(true);
    }
  };

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={handleBudget}>
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input className='nuevo-presupuesto' type='number' placeholder='Añade tu presupuesto' value={budget} onChange={(e) => setBudget(Number(e.target.value))}/>
            </div>
            <input type='submit' value='Añadir'/>
            {msj && <Message type='error'>{msj}</Message>}
        </form>
    </div>
  )
}

export default Budget