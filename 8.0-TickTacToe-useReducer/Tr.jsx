import React,{useEffect,useRef,memo,useMemo} from 'react';
import Td from './Td';

const Tr =memo(({rowData,rowIndex,dispatch})=>{
    console.log('tr rendered')
    
    const ref = useRef([]);
    useEffect(()=>{
        console.log(rowIndex===ref.current[0], dispatch===ref.current[1],rowData===ref.current[2])
        console.log(rowData,ref.current[2])
        ref.current = [rowIndex,dispatch,rowData]
    },[rowIndex,dispatch,rowData])
    /*
    state 변화 때문이 아니였다.
    memo로 감싸주어서 바뀌지 않은 tr을  변경을 막아준다.
    */

    /*
    useMemo 라는 것도 있는데 컴포넌트 자체를 기억해서 변경되는 것에 대해서만 반응한다. 2번째 인자에 이벤트할 변경 대상을 적어준다.
    memo를 했는데도 개선이 되지 않는다면 useMemo를 생각해보자
    */


  return (
      <tr>
        {Array(rowData.length).fill().map((td,i)=>(
            useMemo(()=><Td  key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} >{''}</Td>
                        ,[rowData[i]]
            )
        ))}        
      </tr>
  );
})

export default Tr;