import React,{useState,useReducer,createContext,useMemo,useEffect} from 'react';
import Table from './Table';
import Form from './Form';


export const CODE = {
    MINE: -7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG: -3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE: -6,
    OPENED:0 //0이상이면 다 opend가 되게
}

export const TableContext = createContext({
    //초기값
    tableData:[
        /*
        [-1,-1,-1,-1,-1,-1,-1],
        [-7,-1,-1,-1,-1,-1,-1],
        [-1,-7,-1,-7,-7,-1,-1],
        [-1,-7,-1,-7,-7,-1,-1],
        [-1,-7,-1,-7,-7,-1,-1],
        [-1,-7,-1,-7,-7,-1,-1],
        [-1,-7,-1,-7,-7,-1,-1],
        */
    ],
    halted:true,
    dispatch:()=>{},
});

const initialState = {
    tableData: [],
    timer:0,
    result:'',
    halted:true,
    openedCount:0,
}

export const START_GAME="START_GAME"
export const OPEN_CELL="OPEN_CELL"
export const CLICK_MINE="CLICK_MINE"
export const FLAG_CELL="FLAG_CELL"
export const QUESTION_CELL="QUESTION_CELL"
export const NORMALIZE_CELL="NORMALIZE_CELL"
export const INCREMENT_TIMER="INCREMENT_TIMER"

const plantMine = (row,cell,mine)=>{
    console.log(row,cell,mine);

    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    })
    const shuffle =[];
    while(candidate.length>row*cell-mine){
        //console.log(candidate);
        //console.log(mine);
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    console.log("shuffle",shuffle)

    const data = []
    for(let i=0;i<row;i++){
        const rowData = [];
        data.push(rowData)
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NORMAL)
        }
    }

    for(let k=0;k<shuffle.length;k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k]%cell;
        data[ver][hor]= CODE.MINE;
    }

    return data;

}

const reducer = (state,action) =>{
    console.log(action.type)       
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell:action.cell,
                    mine:action.mine
                },
                openedCount:0,
                tableData: plantMine(action.row,action.cell,action.mine),
                halted:false,
                timer:0
                
            }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            /* 주변 셀도 여는걸 하려고 기존에 코드는 주석
            tableData[action.row]=[...state.tableData[action.row]];
            tableData[action.row][action.cell]=CODE.OPEND;
            */

            /* 모두가 열림의 대상이므로 state를 전체로 복사해야한다. */
            tableData.forEach((row,i)=>{
                tableData[i] = [...state.tableData[i]]
            })

            const checked = [];  /*한번 검사한 것은 다시 검색하지 않도록 하기 위해  */

            let openedCount=0;

            const checkAround = (row,cell) => {
                console.log("aa",row,cell,tableData)
                if(row<0|| row>=tableData.length || cell<0 || cell>=tableData[0].length){ 
                    //이건 나중에 써준거로  아래 자바스크립트 특성과 관계 없다.
                    console.log("f1")
                    return; 

                }

                if([CODE.OPENED,CODE.FLAG_MINE,CODE.FLAG,CODE.QUESTION_MINE,CODE.QUESTION].includes(tableData[row][cell])){
                    console.log("f2")
                    return;
                }

                
                if(checked.includes(row+','+cell)){
                    console.log("f3")
                    return;
                } else {
                    checked.push(row+','+cell)
                } //한번연 칸은 무시하기

                /*5칸 또는 8칸을 검색하게 됨 
                위,아래만 검색하는 이유
                자바스크립트 특성 때문에  행의 경우   row가 없는데 cell을 체크하려면 오류가 발생한다.
                양옆을 체크하지 않는 이유는  row는 있고 cell이 없으면 값이 undefined가 되어  filter에서 제거된다.
                */
                let around=[]
                if(tableData[row-1]){
                    around=around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1],
                    )
                }
                around=around.concat(
                    tableData[row][cell-1],
                    tableData[row][cell+1],
                )
                if(tableData[row+1]){
                    around=around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1],
                    )
                }
                const count = around.filter((v)=>[CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v)).length;
                console.log(around,count)
                if(count === 0 ){
                    if(row>-1){
                        const near = [];
                        if(row-1>-1){
                            near.push([row-1,cell-1]);
                            near.push([row-1,cell]);
                            near.push([row-1,cell+1]);
                        }
                        near.push([row,cell-1]);
                        near.push([row,cell+1]);
                        if(row+1<tableData.length){
                            near.push([row+1,cell-1]);
                            near.push([row+1,cell]);
                            near.push([row+1,cell+1]);
                        }
                        near.forEach((n)=>{
                            if(tableData[n[0],n[1]] !==CODE.OPENED){
                                console.log("bb",n)
                                checkAround(n[0],n[1])
                            }
                        })
                    }
                }
                console.log('CODE.NORMAL',CODE.NORMAL);
                console.log('tableData[row][cell]',tableData[row][cell]);
                if(tableData[row][cell]===CODE.NORMAL){ //내 칸이 닫힌 칸이라면 카운트
                    openedCount+=1;
                }
                tableData[row][cell] =count;
            }
            

            checkAround(action.row,action.cell)
            let halted =false;
            let result  = '';
            console.log('ㅁㅁㅁㅁ',state.data.row*state.data.cell-state.data.mine,state.openedCount+openedCount,state.openedCount,openedCount);
            if(state.data.row*state.data.cell-state.data.mine==state.openedCount+openedCount){ //승리
                halted=true;
                result =`${state.timer}초만에 승리하셨습니다.`
            }
  
            return {
                ...state,
                tableData,
                openedCount:state.openedCount+openedCount,
                halted,
                result

            }            
        }
        case CLICK_MINE:
            const tableData = [...state.tableData];
            tableData[action.row]=[...state.tableData[action.row]];
            tableData[action.row][action.cell]=CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted:true,
            }  
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row]=[...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.MINE){
                tableData[action.row][action.cell]=CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell]=CODE.FLAG;
            }
            
            return {
                ...state,
                tableData,
            }  
        }

        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row]=[...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.FLAG_MINE){
                tableData[action.row][action.cell]=CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell]=CODE.QUESTION;
            }
            
            return {
                ...state,
                tableData,
            }  
        }

        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row]=[...state.tableData[action.row]];
            if(tableData[action.row][action.cell]===CODE.QUESTION_MINE){
                tableData[action.row][action.cell]=CODE.MINE;
            } else {
                tableData[action.row][action.cell]=CODE.NORMAL;
            }
            
            return {
                ...state,
                tableData,
            }  
        }
        case INCREMENT_TIMER:{
            return {
                ...state,
                timer:state.timer+1,

            }
        }
            
        default:
            return turn;
    }
}

const MineSearch =()=>{

    const [state,dispatch] = useReducer(reducer,initialState)
    const {tableData,halted} = state
    const value = useMemo(()=>({tableData: tableData, halted: halted , dispatch}),[tableData,halted]) ;
    // value값을 return에다 바로 쓰면 rerendering 될때마다 재 갱신이 이뤄지기 때문에 value를 useMemo로 감싸서  변경이 될때만 실행되도록 한다.
    // dispatch는 절대로 바뀌지 않아서 2번째 인자로 쓸필요 없다.
    // value를 useMemo를 쓰지않고 return에 바로 쓰면 랜더링 될때마다 계속 갱신되는 문제가 생긴다.

    useEffect(()=>{
        let timer;
        if(halted===false){
            timer = setInterval(()=>{
                dispatch({type:INCREMENT_TIMER})
            },1000)
        }
        
        return ()=>{
            clearInterval()
        }

    },[halted])


    return (
  <TableContext.Provider value={value}>
    <Form />
    <div>{state.timer}</div>
    <Table />
    <div>{state.result}</div>
  </TableContext.Provider>
  );
}

export default MineSearch;