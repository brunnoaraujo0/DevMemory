import { GridItemType } from "../../types/GridItemType";

import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';
import {Items} from '../../data/Items';
import ba from '../../svgs/logoBA.png';

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
            {item.permanentShown === false && item.shown === false &&
                <C.icon src={ba} alt="" opacity={.1}/>
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.icon src={Items[item.item].icon} alt=""/>
            }
        </C.Container>
    )
}




