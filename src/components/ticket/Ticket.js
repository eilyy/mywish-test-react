import Field from "../field/Field";
import MagicWand from "./magic-wand.svg"

import {useState} from "react";

import './Ticket.css'

export default function Ticket() {
    const [genFlag, setGenFlag] = useState(false);
    const [checkFlag, setCheckFlag] = useState(false);
    const [doneFields, setDoneFields] = useState(0);
    const [result, setResult] = useState([]);
    const [warning, setWarning] = useState('');

    const onDone = () => {
        setDoneFields(prevState => prevState + 1);
    }

    const onUndone = () => {
        setDoneFields(prevState => prevState - 1);
    }

    const onWarning = (fieldOrder) => {
        setWarning(fieldOrder);
        setTimeout(() => setWarning(''), 1000);
    }

    const onGenerate = () => {
        if (doneFields === 2) {
            setGenFlag(true);
        }
    }

    const onCheck = () => {
        if (genFlag) {
            setCheckFlag(true);
        }
    }

    return (
        <div className='ticket'>
            <div className='ticket__header'>Билет 1<img
                className={doneFields === 2 ? 'ticket__magic-wand' : 'ticket__magic-wand ticket__magic-wand_disabled'}
                src={MagicWand} alt='magic wand' onClick={onGenerate}/></div>
            <div className='ticket__field'>
                <span className='ticket__field-name'>Поле 1</span><span
                className={`ticket__field-task ${warning === 'first' ? 'ticket__field-task_warning' : ''}`}>Отметьте 8 чисел.</span>
                <Field count={19} chooseLimit={8} onDone={onDone} onUndone={onUndone} onWarning={onWarning}
                       fieldOrder='first' genFlag={genFlag} checkFlag={checkFlag} setResult={setResult}/>
            </div>
            <div className='ticket__field'>
                <span className='ticket__field-name'>Поле 2</span><span
                className={`ticket__field-task ${warning === 'second' ? 'ticket__field-task_warning' : ''}`}>Отметьте 1 число.</span>
                <Field count={2} chooseLimit={1} onDone={onDone} onUndone={onUndone} onWarning={onWarning}
                       fieldOrder='second' genFlag={genFlag} checkFlag={checkFlag} setResult={setResult}/>
            </div>
            <div
                className={`ticket__result-button 
                ${genFlag ? '' : 'ticket__result-button_disabled'} 
                ${result.length === 2 ? 
                    (result.reduce((partialSum, a) => partialSum + a, 0) >= 4 ? 'ticket__result-button_win' : 'ticket__result-button_lose')
                : ''}`}
                onClick={onCheck}>
                <span>
                    {result.length === 2 ? (result.reduce((partialSum, a) => partialSum + a, 0) >= 4 ? 'Вы выиграли!' : 'Вы проиграли :(') : 'Показать результаты'}
                </span>
            </div>
        </div>
    )
}