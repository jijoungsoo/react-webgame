import React, { useCallback,useEffect,useRef,memo } from 'react';
import { CLICK_CELL } from './TickTacToe';

const Td =memo(({rowIndex,cellIndex,dispatch,cellData})=>{
    console.log('td rendered')

    const ref = useRef([]);
    useEffect(()=>{
        console.log(rowIndex===ref.current[0], cellIndex===ref.current[1],dispatch===ref.current[2],cellData===ref.current[3])
        console.log(cellData,ref.current[3])
        ref.current = [rowIndex,cellIndex,dispatch,cellData]
    },[rowIndex,cellIndex,dispatch,cellData])

    /*9개의 td가 계속 랜더링이 되어서 위와 같이 해서 상태가 바뀌어서 9개가 렌더링이 되는 이유를 확인했는데 td 때문이 아니였다는 것을 알게 되었다. 
        memo로 감싸주어 다른 td가 다 랜더링되는것을 막음
        next 다른 tr이 랜더링 되는것을 막아야한다 TR gogo
    */


    /*
    useReducer는 비동이적으로 상태를 바꾼다.
    다음줄에서 console.log를 찍어도 값이 정상적으로 나온다.
    비동기 스테이트를 뭔가 처리하려고 할때는 useEffect를 사용한다.
    */
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex,cellData);

        if(cellData){
            return;
        }
        dispatch({type:CLICK_CELL,row:rowIndex,cell:cellIndex});
    },[cellData]);
  return (
  <td onClick={onClickTd}>{cellData}</td>
  );
})

export default Td;