import React from 'react'
import Expense from './Expense';

const ExpensesList = ({expenses, setExpenseEditable, deleteExpense}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{expenses.length ? 'Gastos' : 'No hay gastos aún' }</h2>
        {expenses.map(e => (<Expense
          key = {e.id}
          expense = {e}
          setExpenseEditable = {setExpenseEditable}
          deleteExpense = {deleteExpense}
        />))}
    </div>  
  )
}

export default ExpensesList;