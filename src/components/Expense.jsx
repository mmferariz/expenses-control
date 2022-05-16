import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css';
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos  from '../img/icono_gastos.svg';
import IconoOcio  from '../img/icono_ocio.svg';
import IconoSalud  from '../img/icono_salud.svg';
import IconoSuscripciones  from '../img/icono_suscripciones.svg';

const iconMaps = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Expense = ({expense, setExpenseEditable, deleteExpense}) => {
    const aux = new Date(expense.date);

    const editAction = () => {
        setExpenseEditable(expense)
    }

    const deleteAction = () => {
        deleteExpense(expense.id);
    }
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={<LeadingActions>
                    <SwipeAction onClick={editAction}>
                        Editar
                    </SwipeAction>
                </LeadingActions>}
                trailingActions={<TrailingActions>
                    <SwipeAction onClick={deleteAction} destructive={true}>
                        Eliminar
                    </SwipeAction>
                </TrailingActions>}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                    <img
                        src={iconMaps[expense.category]}
                        alt='Icono Gasto'
                    />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{expense.category}</p>
                            <p className='nombre-gasto'>{expense.name}</p>
                            <p className='fecha-gasto'>Agregado el: <span>{aux.toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: '2-digit'})}</span></p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${expense.amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense;