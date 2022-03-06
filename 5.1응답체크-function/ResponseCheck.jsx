import React,{useState,useRef} from 'react';

const ResponseCheck = () =>{
    const [state,setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 시작하세요');
    const [result,setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);
    /*
    useState와 useRef의 차이
    useState는 상태가 변하면  return 부분이 다시 실행되지만
    useRef는 return 부분이 변경되지 않는다.

    값이 바뀌어도 redering을 다시 하고 싶지 않은 경우는 useRef를 사용한다. -- 화면에 영향을 미치고 싶지 않을때
    */

    const onClickScreen = ()=>{
        if(state==='waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.')
            
            timeout.current= setTimeout(()=>{
                setState('now');
                setMessage('지금 클릭');                
                startTime.current = new Date();
            }, Math.floor( Math.random() *1000)+2000) //2초~3초 랜덤`
        } else if(state==='ready'){
            clearTimeout(timeout.current)
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
        } else if(state==='now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current-startTime.current]
            })
        }
    }

    const onReset = () => {
        setResult([]);
    }

    
    const renderAverage = () =>{
        return result.length == 0
            ? null 
            : <> <div>평균시간:{result.reduce((a,c)=>a+c)/result.length}ms</div>
                 <button onClick={onReset}>리셋</button>
              </>
            
    }
    return(
        <>
            <div id="screen"
            className={state}
            onClick={onClickScreen}
            >    {message}
            </div>
            { 
                (()=>{
                    if(result.length===0){
                        return null
                    } else {
                        return <> <div>평균시간:{result.reduce((a,c)=>a+c)/result.length}ms</div>
                                <button onClick={onReset}>리셋</button>
                               </>
                    }
                })() /*즉시 실행함수 */
            }
                
            
            {/*{renderAverage()}    */}
        </>

    )
{/* 이런 리턴도 가능하다.
    return [
        <div>123</div>,
        <div>123</div>,
        <div>123</div>,
        <div>123</div>,
        <div>123</div>,
    ]
 */}    
}

export default ResponseCheck