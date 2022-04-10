import {useEffect, useState} from "react";

import './Field.css'

export default function Field(props) {
    const [chosen, setChosen] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.checkFlag) {
            props.setResult(prevState => [...prevState, matches.length]);
        } else if (props.genFlag) {
            generateAnswers();
        }
    }, [props.genFlag, props.checkFlag]);

    useEffect(() => {
        const optionsArr = Array.from(new Array(props.count), (item, index) => {
            const key = (index + 1).toString();
            return (
                <div
                    key={key}
                    className={
                        `field__option 
                ${answers.includes(key) ? 'field__option_answer' : ''} 
                ${chosen.includes(key) ? 'field__option_chosen' : ''} 
                ${matches.includes(key) && props.checkFlag ? 'field__option_correct' : ''}`}>
                    {key}
                </div>
            );
        });
        setOptions(optionsArr);
    }, [answers, chosen, matches, props.checkFlag, props.count]);

    const generateAnswers = () => {
        const shuffled = [...options.map(elem => elem.key)].sort(() => 0.5 - Math.random());
        const answersArr = shuffled.slice(0, props.chooseLimit);
        setAnswers(answersArr);
        getResult(answersArr);
    }

    const onChoose = (event) => {
        if (!event.target.classList.contains('field__option') || props.genFlag) {
            return;
        }
        if (!event.target.isChosen) {
            if (chosen.length === props.chooseLimit) {
                props.onWarning(props.fieldOrder);
                return;
            }
            if (chosen.length === props.chooseLimit - 1) {
                props.onDone();
            }
            event.target.isChosen = true;
            event.target.classList.add('field__option_chosen');
            setChosen(prevState => [...prevState, event.target.textContent]);

        } else {
            if (chosen.length === props.chooseLimit) {
                props.onUndone();
            }
            event.target.isChosen = false;
            event.target.classList.remove('field__option_chosen');
            setChosen(prevState => prevState.filter(item => item !== event.target.textContent));
        }
    }

    const getResult = (answersArr) => {
        const matchesArr = answersArr.filter(ans => chosen.includes(ans));
        setMatches(matchesArr);
    }

    return (
        <div className='field' onClick={props.checkFlag ? null : onChoose}>
            {options}
        </div>
    );
}