import React,{useState,useRef, useEffect,useMemo,useCallback} from 'react';

import Ball from './Ball';

function getWinNumbers(){
    console.log("getWinNumbers")

    const candidates =Array(45).fill().map((v,i)=>i+1);
    const shuffle =[];
    while( candidates.length>0){
        shuffle.push(candidates.splice(Math.floor(Math.random()*candidates.length),1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length-1]
    const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumbers,bonusNumber]
}

const Lotto = () =>{
    const lottoNumbers = useMemo( ()=>getWinNumbers(),[])  /*useMemo,useEffect, useCallback 같은 경우 2번째 인자가 변하지 않으면 다시 실행되지 않음 */
    const [winNumbers,setWinNumbers] = useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus,setBonus] = useState(null)
    const [redo,setRedo] = useState(false)
    const timeouts = useRef([])

    const mounted = useRef(false)
    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true;
        } else {
            //ajax
            //componentDidMount에는 아무것도 안하고 componentDidUpdate에만 동작하는걸 useEffect에서 하는 꼼수

        }

    },[/*바뀌는값 */])


    useEffect( ()=>{
      // let을 쓰면 클로저 문제가 안생긴다고한다.
        for(let i=0;i<winNumbers.length-1;i++){
            timeouts.current[i]= setTimeout(()=>{
                setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]]);                
            }, (i+1)*1000);
        }
        timeouts.current[6]= setTimeout(()=>{
            setBonus(winNumbers[6]);      
            setRedo(true)
        }, 7000);

        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            })
        }
    },[timeouts.current]) //빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate의 역할을 둘다 수행

    /*
    const onClickRedo = () =>{
        console.log("onClickRedo")
        setWinNumbers(getWinNumbers())
        console.log(winNumbers)
        setWinBalls([]);
        setBonus(null)
        setRedo(false)
        timeouts.current =[];
    }
       */
    
    const onClickRedo = useCallback(() =>{
        console.log("onClickRedo")
        setWinNumbers(getWinNumbers())
        console.log(winNumbers)
        setWinBalls([]);
        setBonus(null)
        setRedo(false)
        timeouts.current =[];
    },[winNumbers]);
 
    /*
        useCallback은 함수를 기억하는것
        여기서는 큰 이점이 없다.
        오히려 문제가 생기는데

        winNumbers가 처음 로딩된게 계속 보여진다.
        화면은 다르고

        이것을 수정하려면 2번째인자에 winNumbers를 넣어줘야한다.

        useCallBack을 필수로 적용 해야 할 경우가 있다.
        자식 컴포넌트에 함수를 넘길 경우 꼭 써줘야한다.
        usetCallBack을 안해주면 자식컴포넌트는 함수가 매번 새로 함수를 주는지 알고 리 랜더링이 발생해서
        usetCallBack을 꼭해줘야한다고 한다.


        기타 Hooks에 주의 해야할점

        Hooks는 조건문안에 절대 넣으면 안된다.
        useEffect,usetCallBack,uesMemo안에  useState를 넣어주면 안된다.

        useState는 최상위로 빼서 실행순서가 같게끔 해야한다고 한다.


        useMemo는 값을 저장한다.  -- 2번째인자가 바뀌기 전까지
        useCallBack은 함수를 기억한다.   -- 2번째인자가 바뀌기 전까지
        useEffect는 무엇을 실행한다.  -- 2번째인자가 바뀔때

        안한거
        useContext
        useRedux

        리덕스
        useSelector

    */

    return (
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v)=><Ball key={v} number={v} />)  }
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
    )
}

export default Lotto;