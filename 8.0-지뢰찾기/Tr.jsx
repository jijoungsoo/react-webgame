import React,{useEffect,useRef,memo,useMemo,useContext} from 'react';
import Td from './Td';
import {TableContext} from './MineSearch'

const Tr =memo((rowIndex)=>{
    const {tableData} = useContext(TableContext)
    //console.log("rowIndex-0",rowIndex.rowIndex)
    //console.log("tableData[0]",tableData[0])

  return (
      <tr>
        {tableData[0] && Array(tableData[0].length).fill().map((td,i)=>{
            //console.log("td",i)
            return (
            <Td key={i}  rowIndex={rowIndex.rowIndex} cellIndex={i}/>
            )
        })}
      </tr>
  );
})

export default Tr;