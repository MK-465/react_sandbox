import {useResource} from "../hooks/useResource.tsx";

export const ProductInfo = ({productId}) => {
    const product = useResource(`http://localhost:8080/products/${productId}`);

    const {name, price, description, rating} = product || {};

    return product ? (
        <>
            <h3>{name}</h3>
            <p>{price}</p>
            <h4>Description: {description}</h4>
            <h4>Rating: {rating}</h4>
        </>
    ): <p>Loading...</p>
}