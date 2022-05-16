import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetView = ({expenses, budget, setExpenses, setBudget, setIsBudgetValid}) => {

    const [percentage, setPercentage] = useState(0);
    const [available, setAvailable] = useState('');
    const [spent, setSpent] = useState('');

    useEffect(() => {
        const totalSpent = expenses.reduce((sum, s) => s.amount + sum, 0);
        const totalAvailable = budget - totalSpent;
        const auxPercentage = (budget - totalAvailable)/budget * 100;
        setAvailable(totalAvailable);
        setSpent(totalSpent);
        setTimeout(() => setPercentage(auxPercentage.toFixed(2), 1500));
    }, [expenses]);

    const toCash = aux => aux.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    const handleResetApp = () => {
        const result = confirm('¿Desea reiniciar presupuesto y gastos?');
        if(result){
            setExpenses([]);
            setBudget('');
            setIsBudgetValid(false);
        }
    };

    return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: available >= 0 ? '#3B3B82F6' : '#DC2626',
                    trailColor: '#F5F5F5',
                    textColor: available >= 0 ? '#3B3B82F6' : '#DC2626',
                })}
                value={percentage}
                text={`${percentage}%`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button 
                className='reset-app'
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p> <span>Presupuesto: </span> {toCash(budget)}</p>        
            <p className={available < 0 ? 'negativo' : ''}> <span>Disponible: </span> {toCash(available)}</p>        
            <p> <span>Gastado: </span> {toCash(spent)}</p>        

        </div>
    </div>
    )
}

export default BudgetView;