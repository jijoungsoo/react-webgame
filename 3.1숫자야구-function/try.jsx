import React,{memo} from 'react';

const Try = memo(({tryInfo}) =>{
    /*  (props) 이렇게 쓸수도 있지만  구조분해로 {tryInfo}라고 쓸수있음 */
    /* memo(전체)를 써주면  react에 PureComponent하고 같은 동작을 함  
       같은 동작이라고 함은 state를 체크하여 변경점이 없으면 update를 하지 않음
       
       자식들이 모두 PureComponent나 memo라면 부모도 PureComponent나 memo를 쓸수 있다.
    */
    return (
        <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
        </li>
    )
})

export default Try