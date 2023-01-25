//ESTILIZACAO DO COMPONENTE DA FIGURINHA DE GRID
import styled from "styled-components";

type ContainerProps = { //UMA PROP PARA SABER SE A FUGURINHA TA VIDADA OU NAO
    showBackground: boolean;
}
export const Container = styled.div<ContainerProps>` //ESSE DIV VAI TER UMA PROP
    background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3'}; //SE FOR VERDADEIRO SERA UMA COR, SE A PROP FOR FALSE SERA OUTRA
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const icon = styled.img<IconProps>`
    width: 50px;
    height: 50px;
    opacity: ${props => props.opacity ?? 1};
    `;

type IconProps = {
    opacity?: number;
}
