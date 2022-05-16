import React from 'react'
import Budget from './Budget'
import BudgetView from './BudgetView'

const Header = ({expenses, budget, setBudget, isBudgetValid, setIsBudgetValid, setExpenses}) => {
  return (

    <header>
        <h1>Planificador de gastos</h1>
        { !isBudgetValid ? (
          <Budget
            budget = {budget}
            setBudget = {setBudget}
            setIsBudgetValid = {setIsBudgetValid}
          />
        ) : (
          <BudgetView 
            expenses = {expenses}
            setExpenses = {setExpenses}
            budget = {budget}
            setBudget = {setBudget}
            setIsBudgetValid = {setIsBudgetValid}
          />
        ) }
    </header>
  )
}

export default Header