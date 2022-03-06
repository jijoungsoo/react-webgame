import React, { useCallback,useEffect,useRef,memo,useContext, useMemo } from 'react';
import {CODE,OPEN_CELL,TableContext,CLICK_MINE,FLAG_CELL,QUESTION_CELL,NORMALIZE_CELL} from './MineSearch'

const getTdStyle = (code) =>{
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background:'#444'
            } 
        case CODE.OPENED:
            return {
                background:'white'
            } 
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background:'yellow'
            }             
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background:'red'
            }                         
        default:
            return {
                background:'white'
            } 
    }

}

const getTdText = (code) =>{
    console.log('td getTdText');
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';            
        case CODE.FLAG_MINE:
        case CODE.FLAG:                    
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:     
            return '?';       
        default:
            return code || '';
    }
}

const Td =memo(({rowIndex,cellIndex})=>{
    //console.log("rowIndex",rowIndex);
    //console.log("cellIndex",cellIndex);
    const {tableData,dispatch,halted} = useContext(TableContext)
    //console.log("tableData",tableData);
    //console.log("halted",halted);

    const onClickTd = useCallback(()=>{
        if(halted){ /*게임이 멈췄으면 아무것도 하지 않는다. */
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                /*아무 반응이 없어야 하는 것들 */
                return;
            case CODE.NORMAL:
                dispatch({type:OPEN_CELL,row:rowIndex,cell:cellIndex})
                return;
            case CODE.MINE:
                dispatch({type:CLICK_MINE,row:rowIndex,cell:cellIndex})
                return;
        }
        
    },[tableData[rowIndex][cellIndex],halted])

    const onRightClickTd = useCallback((e)=>{
        e.preventDefault();   /*오른쪽 클릭하면 메뉴가 뜨기 때문에  메뉴가 안뜨게 하기위해서 이걸 해주어야한다. */

        if(halted){ /*게임이 멈췄으면 아무것도 하지 않는다. */
            return;
        }

        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL,row:rowIndex,cell:cellIndex})
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type:QUESTION_CELL,row:rowIndex,cell:cellIndex})
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:                
                dispatch({type:NORMALIZE_CELL,row:rowIndex,cell:cellIndex})
                return;
            default:
                return;
        }

    },[tableData[rowIndex][cellIndex],halted])

    console.log('td rendered');

    /*
    td redered는 100번 실행되었지만
    useMemo를 사용해서  getTdText에 log를 넣은 td getText는 한번만 출력됨을 알수있다.
    함수는 100번 호출되지만 화면에 td는 한개만 그린다.
    
    useContext를 사용했을때 함수가 100번 호출되는게 제로초는 제약 사항이라고 하는데 그래도 이상하다.
    */
   /*
  return useMemo(()=>(
  <td style={getTdStyle(tableData[rowIndex][cellIndex])} 
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
  >{getTdText(tableData[rowIndex][cellIndex])}</td>
  ),[tableData[rowIndex][cellIndex]]);

  이렇게 useMemo를 써도 되고
  아래처러 realTed로 나눠도된다.
  */
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data = {tableData[rowIndex][cellIndex]} />; 
})

const RealTd = memo(({onRightClickTd,onClickTd,data})=>{
    console.log('real td rendered')
    return (<td style={getTdStyle(data)} 
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
        >{getTdText(data)}</td>
    )
})

export default Td;