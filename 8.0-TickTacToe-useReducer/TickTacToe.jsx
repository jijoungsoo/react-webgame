import React,{useState,useReducer, useCallback, useEffect} from 'react';
import Table from './Table';

/*
TicTacToe에서 상태를 관리하는데
실제로 클릭되는 곳은 td이다.
단계가 엄청 많다.

useReducer 를 사용해서 이문제를 해결한다고 한다.

*/

const initialState = {
    winner:'',
    turn: 'O' ,
    tableData: [
                ['','',''],
                ['','',''],
                ['','','']
            ],
            recentCell:[-1,-1]
}

export const SET_WINNER = "SET_WINNER"
export const CLICK_CELL = "CLICK_CELL"
export const CHANGE_TURN = "CHANGE_TURN"
export const RESET_GAME = "RESET_GAME"

const reducer = (state,action) =>{
    console.log(action.type)       
    switch(action.type){
        case SET_WINNER:
        // setate.winner = action.winner ; 이렇게 하면 안됨.   ...state 스트레이트 문법 으로 얕은 복사를 해야한다.
        console.log(action.winner);
            return {
                ...state,
                winner: action.winner
            }
        case CLICK_CELL:
            const tableData = [...state.tableData]
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결 가능, 불변성은 해결할수 없음 가독성만 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn =='O'? 'X' : 'O'
            }
        case RESET_GAME:
                return {
                    ...state,
                    turn:'O'
                }
    }
}

const TicTacToe =()=>{

    const [state,dispatch] = useReducer(reducer,initialState)
    const {tableData,turn,winner,recentCell }  = state;

    /*
    const [winner,setWinner] = useState('')
    const [turn,setTrun] = useState('0')
    const [tableData,setTableData] = useState( [['','',''],['','',''],['','','']])
    */

    const onClickTable = useCallback( ()=>{
        dispatch({type:SET_WINNER,winner:'O'})
    },[])

    useEffect(()=>{
        const [row,cell] = recentCell;

        if(row<0){
            return;
        }

        let win = false;
        if(tableData[row][0]===turn && tableData[row][1]===turn && tableData[row][2]===turn ){
            win =true;
        } else if(tableData[0][cell]===turn && tableData[1][cell]===turn && tableData[2][cell]===turn ){
            win =true;
        } else if(tableData[0][0]===turn && tableData[1][1]===turn && tableData[2][2]===turn ){
            win =true;
        } else if(tableData[0][2]===turn && tableData[1][1]===turn && tableData[2][0]===turn ){
            win =true;
        }
        console.log(win,row,cell,tableData,turn)

        if(win){
            dispatch({type:SET_WINNER,winner:turn})
        } else {
            //무승부검사
            let all = true // all이 true면 무승부라는 뜻
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all=false;
                    }
                })
            })

            //이긴것이 아니면 턴을 바꿈        
            dispatch({type:CHANGE_TURN});
        }


    },[recentCell])

    return (
  <>
    <Table tableData={tableData} dispatch={dispatch} />
    {winner && <div>{winner}님의 승리</div>}
  </>
  );
}

export default TicTacToe;