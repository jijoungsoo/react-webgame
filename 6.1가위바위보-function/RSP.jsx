import React,{useState,useRef,useEffect} from 'react';

const rspCoords = {
    바위:'-160px',
     가위:'0',
     보: '-340px'
}

const scores = {
    가위:1,
    바위:0,
     보: -1

}

const computerChoice = (imgCoord)=>{
    var tmp = Object.entries(rspCoords).find(function(v){
        var tmp2=(v[1]===imgCoord);
        return tmp2;
    });
    return tmp[0];
}



const RSP = ()=> {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score,setScore] = useState(0)
    const interval = useRef();

    useEffect(()=>{ // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        //console.log('다시 실행')
        interval.current=setInterval(changeHandler,1000);

        return ()=>{//componentWillUnmount 역할
            //console.log('종료')
            clearInterval(interval.current)
        }
    },[imgCoord]);  /*imgCoord 상태가 변경되면  useEffect를 실행하겠다는 의미, [] 로 하면 최초 1번만 실행됨 [imgCoord,score,여러개]  여러개의 상태를 보게 할 수도 있다. */

    /*useEffect는 여러개 쓸수있다.  state마다  효과를 다르게 해주고 싶을 때 이렇게 사용한다. */
    /*useLayoutEffect하고 차이점
      useEffect는  화면이 조절되고 나서 마지막에 실행되는데
      useLayoutEffect는 화면이 바뀌기 전에  변경이 있을때 사용한다고 한다.
      강사님도 useLayoutEffect는 사용해본적이 없다고 한다 제로초!
    */
      
    const changeHandler =()=> {
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위)
            
        } else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보)
            
        } else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위)

        }
    }

    const onClickBtn = (choice)=> ()=> {
        clearInterval(interval.current)
        const myScore=scores[choice]
        const cpuScore=scores[computerChoice(imgCoord)]
        const diff = myScore-cpuScore

        if(diff===0){
            setResult('비겼습니다')
        } else if([-1,2].includes(diff)){
            setResult('이겼습니다')
            setScore((prevScore)=>prevScore+1)
        } else {
            setResult('졌습니다')
            setScore((prevScore)=>prevScore-1)
        }

        setTimeout(()=>{
            interval.current = setInterval(changeHandler,1000)
        },2000)
        
    }

    return (
        <>
            <div id="computer" style={{background:`url(/gawebawebo.png) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}

export default RSP