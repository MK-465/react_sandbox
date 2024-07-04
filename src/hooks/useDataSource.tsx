import {useEffect, useState} from "react";

export const useDataSource = (getResourceFn) => {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getResourceFn();
            setResource(response.data);
        })();
    }, [getResourceFn])

    return resource;

}
