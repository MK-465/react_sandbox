export const SmallProductListItem = ({product}) => {
    const {name, price} = product;

    return (
        <h4>{name} - {price}</h4>
    )
}