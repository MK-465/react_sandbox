import {useEffect, useState} from "react";

export const ControlledForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [hairColor, setHairColor] = useState('');
    const [nameInputError, setNameInputError] = useState('');

    useEffect(() => {
        if (name.length < 2) {
            setNameInputError('Name must be at least 2 characters')
        } else {
            setNameInputError('')
        }
    }, [name]);

    return (
        <>
            <form>
                {nameInputError && <p>{nameInputError}</p>}
                <input name={"name"}
                       type={"text"}
                       placeholder={"Name"}
                       value={name}
                       onChange={e => setName(e.target.value)}/>
                <input name={"age"}
                       type={"text"}
                       placeholder={"Age"}
                       value={age}
                       onChange={e => setAge(Number(e.target.value))}/>
                <input name={"hairColor"}
                       type={"text"}
                       placeholder={"Hair Color"}
                       value={hairColor}
                       onChange={e => setHairColor(e.target.value)}/>
            </form>
            <button>Submit</button>
        </>
    )
}