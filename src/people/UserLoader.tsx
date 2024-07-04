import React, {useEffect, useState} from "react";
import axios from "axios";

export const UserLoader = ({userId, children}) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:8080/users/${userId}`)
            setUser(response.data);
        })();
    }, [userId])

    return (
        <>
            {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {user} as any);
                    } else {
                        return child;
                    }
                }
            )
            }
        </>
    )
}