import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Pane = styled.div`
    flex: ${props => props.width};
`

export const SplitScreen = (
    {
        children,
        leftWeight = 1,
        rightWeight = 1
    }
) => {
    const [left, right] = children;
    return (
        <Container>
            <Pane width={leftWeight}>
                {left}
            </Pane>
            <Pane width={rightWeight}>
                {right}
            </Pane>
        </Container>
    );
}