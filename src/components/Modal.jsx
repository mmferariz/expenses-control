import React, { useState, useEffect } from 'react';
import CloseBtn from '../img/cerrar.svg';
import Message from './Message';

const Modal = ({setModal, animateModal, setAnimateModal, addExpense, expenseEditable, setExpenseEditable}) => {

    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        category: ''
    });
    const [msj, setMsj] = useState('');

    useEffect(() => {
        if(Object.keys(expenseEditable).length > 0){
            setExpense({
                name: expenseEditable.name,
                amount: expenseEditable.amount,
                category: expenseEditable.category,
                date: expenseEditable.date,
                id: expenseEditable.id
            });
          }
    }, []);

    const closeModal = () => {
        setExpenseEditable({});
        setAnimateModal(false);
        setTimeout(() => setModal(false), 300)
    }

    const handleAddExpense = e => {
        e.preventDefault();

        if(Object.values(expense).includes('')){
            setMsj('Todos los campos son obligatorios');
        } else {
            setMsj('');
            addExpense({...expense, date: Date.now()});
            closeModal();
        }
    }

    return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img
                src={CloseBtn}
                alt='Cerrar modal'
                onClick={closeModal}
            />
        </div>
        <form className={`formulario ${animateModal ? 'animar' : 'cerrar'}`} onSubmit={handleAddExpense}>
            <legend>{ Object.keys(expenseEditable).length > 0 ? 'Modificar' : 'Nuevo'} gasto</legend>
            <div className='campo'>
                <label htmlFor='txtName'>Nombre</label>
                <input id='txtName' type='text' placeholder='Añade el nombre del gasto' value={expense.name}
                    onChange={e => setExpense({...expense, name: e.target.value})}
                />
            </div>
            <div className='campo'>
                <label htmlFor='txtAmount'>Cantidad</label>
                <input id='txtAmount' type='number' placeholder='Añade la cantidad del gasto: ej. 300' value={expense.amount}
                    onChange={e => setExpense({...expense, amount: Number(e.target.value)})}
                />
            </div>
            <div className='campo'>
                <label htmlFor='cmbCategory'>Categoría</label>
                <select id='cmbCategory' value={expense.category} onChange={ e => setExpense({...expense, category: e.target.value})}>
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'> Ahorro </option>
                    <option value='comida'> Comida </option>
                    <option value='casa'> Casa </option>
                    <option value='gastos'> Gastos </option>
                    <option value='ocio'> Ocio </option>
                    <option value='salud'> Salud </option>
                    <option value='suscripciones'> Suscripciones </option>
                </select>
            </div>
            <input type='submit' value={Object.keys(expenseEditable).length > 0 ? 'Confirmar cambio' : 'Añadir gasto'}/>
            {msj && <Message type='error'>{msj}</Message>}
        </form>
    </div>
    )
}

export default Modal;