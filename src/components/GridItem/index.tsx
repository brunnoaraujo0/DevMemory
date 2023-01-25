//COMPONENTE DE CADA FIGURINHA QUANDO TA NO GRID
import { GridItemType } from "../../types/GridItemType"; //IMPORTE O ESQUELETO DE UM FIGURINHA
import * as C from './styles';
import {Items} from '../../data/Items'; //IMPORTE AS POSSIVEIS FIGURINHAS DISPONIVEIS
import ba from '../../svgs/logoBA.png';

type Props = { //UM PROP DE COMO VAI SER UM GRID DE FIGURINHA
    item: GridItemType, //O ITEM AQUI VAI USAR O TIPO ESQUELETO DE FIGURINHA
    onClick: () => void //E TEM UMA FUNCAO ONCLICK
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick} //O CONTAINER DA FIGURINHA NO GRID
        showBackground={item.permanentShown || item.shown} /* O CONTAINER TEM UMA PROP DE ESTILIZACAO, QUE É ESSE BACKGROUND, É UM BOLEANO QUE RETORNA V OU F   */>
            {item.permanentShown === false && item.shown === false && //SE A FIGURINHA NAO TIVER DE COSTA
                <C.icon src={ba} alt="" opacity={.1}/> //
            }
            {(item.permanentShown || item.shown) && item.item !== null && //SE A FIGURINHA TIVER VIRADO, OU SEJA TIVER MOSTRANDO
                <C.icon src={Items[item.item].icon} alt=""/> //PEGUE O ICONE DELE
            }
        </C.Container>
    )
}




