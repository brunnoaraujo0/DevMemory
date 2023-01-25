import {useEffect, useState} from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { Button } from './components/Button/Index';
import { InfoItem } from './components/InfoItem/Index';
import { GridItemType } from './types/GridItemType';
import { Items } from './data/Items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


const App = () => {


  const [playing, setPlaying] = useState<boolean>(false); // VARIAVEL PARA SABER SE TA ACONTECENDO O JOGO
  const [timeElapsed, setTimeElapsed] = useState<number>(0); //VARIAVEL DO CONTADOR DE TEMPO
  const [moveCount, setMoveCount] = useState<number>(0); //VARIAVEL DO CONTADOR DE MOVIMENTO
  const [shownCount, setShownCount] = useState<number>(0); //VARIAVEL PARA CONTAR QUANTAS FIGURINHAS ESTÃO ABERTAS TEMPORARIA
  const [gridItems, setGridItems] = useState<GridItemType[]>([]); //VARIAVEL DE UM ARRAY DO TIPO FIGURINHAS



  useEffect(() => resetAndCreateGrid(), []); //QUANDO ABRIR A TELA JA DE UM RESET



  useEffect(() => { //AQUI É UMA 'FUNCAO' PARA CONTAR O TEMPO DE JOGO
    const timer = setInterval(() => { //USANDO A FUNCAO SETINTERVAL PARA CONTAR A CADA 1 SEGUNDO
      if(playing) { //SE TIVER O JOGO TIVER ROLANDO
        setTimeElapsed(timeElapsed + 1); //SOME +1 NA VARIVAL DE CONTADOR DE TEMPO
      }
    }, 1000);
    return () => clearInterval(timer); //COMECE DE NOVO
  },[playing, timeElapsed]); //MONITORE AS VARIAVEIS DE JOGANDO E DO TEMPO




  useEffect(() => { //'FUNCAO' PARA ANALISAR SE AS 2 FIGURINHAS VIRADAS SAO CORRETAS
    if(shownCount === 2){ //SE TEM 2 FIGURINHAS TEMPORARIAS VIRADA
      let opened = gridItems.filter(item => item.shown === true);  //FILTRE E COLOQUE EM UMA VARIAVEL AS VIRADAS
      if(opened.length === 2){ //SE O TOTAL DE VIRADAS FOR 2
        if(opened[0].item === opened[1].item){ //E SE ELAS FOREM IDENTICAS
          let tmpGrid = [...gridItems]; //CRIE UMA COPIA DO ARRAY DE GRID
          for(let i in tmpGrid){ //RODE TODO O ARRAY DE FIGURINHAS
            if(tmpGrid[i].shown){ //SE A FIGURINHA TIVER SHOW (SIGNIFICA QUE ELE TA VIRADO)
              tmpGrid[i].permanentShown = true; //COLOQUE TRUE O PERMANENTE
              tmpGrid[i].shown = false;  //DEPOIS TIRE O SHOW
            }
          }
          setGridItems(tmpGrid); //ATUALIZE O O GRID 
          setShownCount(0); //E ZERE O CONTADOR DE FIGURINHAS VIRADAS
        } else { //SE AS FIGURINHAS NAO FOREM IGUAIS
          setTimeout(() => { //ESPERE 1S
            let tmpGrid = [...gridItems]; //FACA UMA COPIA DO GRID
            for(let i in tmpGrid){ //PERCORRA ELE
              tmpGrid[i].shown = false; //COLOQUE FALSE EM TODO SHOW, OU SEJA DESVIRE
            }
            setGridItems(tmpGrid); //ATUALIZE O GRID
            setShownCount(0); //ZERE O CONTADOR DE FIGURINHAS VIRADAS
          }, 1000)
        }
        setMoveCount(moveCount => moveCount + 1); //CONTE UM MOVIMENTO, IDEPENDENTE SE TIVER CERTO OU ERRADO
      }
    }
  }, [shownCount, gridItems]) //MONITORE ESSES DOIS AI





  useEffect(() => {// 'FUNCAO' PARA MONITORAR SE TA ROLANDO O JOGO
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){ //SE TODOS AS FIGURINHAS TIVEREM VIRADAS ENTAO 
      setPlaying(false);// O JOGO ACABA
    }
  }, [moveCount, gridItems]);





  const resetAndCreateGrid = () => { //FUNCAO DE RESETAR O JOGO
      setTimeElapsed(0); //ZERA O TEMPO
      setMoveCount(0); //ZERA O CONTADOR DE MOVIMENTO
      setShownCount(0); //ZERA O CONTADOR DE QUEM TA VIRADO


      let tmpGrid: GridItemType[] = []; //CRIA UM ARRAY DO TIPO FIGURINHAS
      for( let i = 0; i < (Items.length * 2); i++){ //REPITA 2* A QUANTIDADE DE FIGURINHAS QUE TEM DISPONIVEL
        tmpGrid.push({ //COLOQUE NO ARRAY UM ESQUELETO DE CONFIGURACAO DE FIGURINHAS NESSE ARRAY
            item: null,
            shown: false,
            permanentShown: false
        })
      }
      //AQUI VAI PREENCHER AS FIGURINHAS
      for( let w=0; w < 2; w++){ //RODE 2X
        for(let i = 0; i < Items.length; i++ ){ //RODE A QUANTIDADE DE FIGURINHAS DISPONIVEIS
            let pos = -1; //ESSA VARIAVEL VAI SER DA POSICAO ALEATORIA DA FIGURINHAS
            while(pos < 0 || tmpGrid[pos].item !== null){ //GERE UM NUMERO ALEATORIA ENTRE 1 E 12 ENQUANTO ATE ENCONTRAR UMA POSICAO VAZIA OU SEJA SEM FIGURINHA PREENCHIDA
              pos = Math.floor(Math.random() * (Items.length * 2)); //GERE UM NUMERO ALETORIO ENTRE 1 E 12 E ARREDONDE
            }
            tmpGrid[pos].item = i; //A POSICAO TAL DA FIGURINHA TAL RECEBE TAL FIHURINHA
        }
      }

      setGridItems(tmpGrid); //ATUALIZE O GRID

      setPlaying(true); //O JOGO TA ROLANDO
  }



//FUNCAO DE QUANDO CLICAR NA FIGURINHAS
  const handleItemClick = (index: number) => { //PASSE COMO PARAMENTRO QUAL FIGURINHA FOI CLICADO
      if(playing && index !== null && shownCount < 2){ //SE TIVER JOGANDO O INDEX NAO FOR NULO E TIVER ATE 2 FIGURINHA VIRADAS
        let tmpGrid = [...gridItems]; //FACA UMA COPIA DO GRID

        if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false){ //SE TIVER O PERMANENTE FALSE E O SHOWN FALSE
          tmpGrid[index].shown = true; //VIRE A FIGURINHA
          setShownCount(shownCount + 1); //E CONTE MAIS UM NO CONTADOR DE FIGURINHA VIRADA
        }
        setGridItems(tmpGrid); //ATUALIZE O TMP
      }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

            <C.InfoArea>
                <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
                <InfoItem label="Movimentos" value={moveCount.toString()}/>
            </C.InfoArea>
        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>
    <C.GridArea>
    <C.Grid>
        {gridItems.map((item, index)=> (
          <GridItem key={index} item={item} onClick={() => handleItemClick(index)}/>
        ))}
    </C.Grid>
    </C.GridArea>

    </C.Container>
  )
}
export default App