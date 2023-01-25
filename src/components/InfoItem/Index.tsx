//COMPONENTE DAS INFORMACAO
import * as C from './styles';

type Props = { // O ESQUELETO DA PROP TEM UM NOME E UM VALOR
    label: string;
    value: string;
}

export const InfoItem = ({label, value}: Props) => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    )

}