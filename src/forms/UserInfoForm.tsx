import {withEditableResource} from "../controller/withEditableResource.tsx";

export const UserInfoForm = withEditableResource(({user, onChangeUser, onSaveUser, onResetUser}) => {
    const {name, age, hairColor} = user || {};

    return user ? (
        <>
            <label>
                Name:
                <input value={name} onChange={e => onChangeUser({name: e.target.value})}/>
            </label>

            <label>
                Age:
                <input value={age} onChange={e => onChangeUser({age: e.target.value})}/>
            </label>

            <label>
                Hair color:
                <input value={hairColor} onChange={e => onChangeUser({hairColor: e.target.value})}/>
            </label>
            <button onClick={onResetUser}>Reset</button>
            <button onClick={onSaveUser}>Save</button>
        </>
    ) : <p>Loading...</p>
}, 'http://localhost:8080/users/2', 'user');