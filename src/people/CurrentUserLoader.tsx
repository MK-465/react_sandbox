import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";

export const CurrentUserLoader = ({children}) => {

    const [user, setUser]: [any, Dispatch<SetStateAction<any>>] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:8080/current-user')
            setUser(response.data);
        })();
    }, [])

    return (
        <>
            {React.Children.map(children, (child: any) => {
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