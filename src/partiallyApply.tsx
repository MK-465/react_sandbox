const partiallyApply = (Component, partialProps) => {
    return props => {
        return <Component {...partialProps} {...props} />
    };
}


export const Button = ({size, color, text, ...props}) => {
    return (
        <button style={{
            padding: size === 'large' ? '32px' : '8px',
            fontSize: size === 'large' ? '32px' : '16px',
            backgroundColor: color,
        }} {...props}>{text}</button>
    );
}

export const LargeButton = partiallyApply(Button, {size: 'large', color: 'green'});
export const DangerButton = partiallyApply(Button, {color: 'red'});

