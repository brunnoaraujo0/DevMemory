//COMPONENETE DE UM BOTAO

import * as C from './styles'; //IMPORTE TUDO DEA ESTILIZACAO

type Props = { //DEFINICAO DE UMA PROP PARA O BOTAP ("O MOLDE DO BOTAO")
    label: string; //O NOME
    icon?: any; //O ICONE QUE É OPTATIVO
    onClick: React.MouseEventHandler<HTMLDivElement>; //UM EVENTO
}

export const Button = ({label, icon, onClick}: Props) => { //QUAIS PROPS VAI SER USADAS
    return (
        <C.Container onClick={onClick}>
            {icon && //SE TIVER ICONE, COLOQUE O QUE TA ABAIXO (JA QUE A PROP ICONE É OPTATIVO)
                <C.IconArea>
                <C.Icon src={icon}/>
                </C.IconArea>
            }
            
           <C.Label>{label}</C.Label>
        </C.Container>
    )
}