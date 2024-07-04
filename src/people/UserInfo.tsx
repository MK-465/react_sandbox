import {useDataSource} from "../hooks/useDataSource.tsx";
import axios from "axios";

const serverResource = (resourceUrl) => async () => {
    const response = await axios.get(resourceUrl);
    return response.data;
}


export const UserInfo = ({userId}) => {
    // const user = useResource(`http://localhost:8080/users/${userId}`);
    const user = useDataSource(serverResource(`http://localhost:8080/users/${userId}`));

    const {name, age, hairColor, hobbies} = user || {};
    return user ? (
        <>
            <h4>Name: {name}</h4>
            <p>Age: {age}</p>
            <p>HairColor: {hairColor}</p>
            <h4>Hobbies</h4>
            <ul>
                {hobbies?.map((hobby) => <li key={hobby}>{hobby}</li>)}
            </ul>
        </>
    ) : <p>Loading...</p>
}