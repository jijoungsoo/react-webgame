import React,{memo} from 'react';
import Tr from './Tr';

const Table =memo(({onClick,tableData,dispatch})=>{
    /*
    자식이 reredering 될때  TD => TR=> TABLE 식으로 리 랜더링이 퍼져간다.
    table에 memo를 적용하는건 의미 없지만 td,tr에 memo를 적용했다면
    table에도  memo를 적용할수있다.
    */

  return (
      <table onClick={onClick}>
        <tbody>
            {Array(tableData.length).fill().map((tr,i)=>(<Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />))}            
        </tbody>
      </table>  
  );
})

export default Table;