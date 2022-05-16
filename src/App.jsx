import { useState, useEffect } from 'react'
import ExpensesList from './components/ExpensesList';
import Filter from './components/Filter';
import Header from './components/Header';
import Modal from './components/Modal';
import NewBudget from './img/nuevo-gasto.svg';

function App() {

  const [budget, setBudget] = useState(localStorage.getItem('budget') ? Number(localStorage.getItem('budget')) : '');
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  
  const [expenses, setExpenses] = useState(localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [expenseEditable, setExpenseEditable] = useState({});
  
  const [filter, setFilter] = useState([]);

  useEffect(() => { 
    if(Object.keys(expenseEditable).length > 0){
      setModal(true);
      setTimeout(() => setAnimateModal(true), 300)
    }
  }, [expenseEditable]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses ?? []));
  }, [expenses])

  useEffect(() => {
    if(filter){
      setFilteredExpenses(expenses.filter(e => e.category === filter));
    } else {
      setFilteredExpenses(expenses);
    }
  }, [filter, expenses])

  useEffect(() => {
    const auxBudget = Number(localStorage.getItem('budget')) ?? 0;
    if(auxBudget > 0){
      setIsBudgetValid(true);
    }
  }, [])

  const createId = () => `${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;

  const handleNewBudget = () => {
    setModal(true);
    setExpenseEditable({});
    setTimeout(() => setAnimateModal(true), 300)
  };

  const addExpense = s => {
    if(!s.id){
      s.id = createId();
      setExpenses([...expenses, s]);
    } 
  };

  const deleteExpense = id => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses = {expenses}
        budget = {budget}
        setBudget = {setBudget}
        setExpenses = {setExpenses}
        isBudgetValid = {isBudgetValid}
        setIsBudgetValid = {setIsBudgetValid}
      />
      {isBudgetValid ? (
        <>
          <main>
            <Filter
              filter = {filter}
              setFilter = {setFilter}
            />
            <ExpensesList
              expenses={filter ? filteredExpenses : expenses}
              setExpenseEditable={setExpenseEditable}
              deleteExpense = {deleteExpense}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={NewBudget} alt='Nuevo presupuesto' onClick={handleNewBudget}/>
          </div>
        </>
      ) : null } 
      {modal ? (
        <Modal
          setModal = {setModal}
          animateModal = {animateModal}
          setAnimateModal = {setAnimateModal}
          addExpense = {addExpense}
          expenseEditable = {expenseEditable}
          setExpenseEditable = {setExpenseEditable}
        />
      ) : null } 
    </div>
  );
}

export default App
