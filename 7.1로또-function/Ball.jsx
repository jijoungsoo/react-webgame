import React,{memo} from 'react';

/*
훅스라고 안부름
혹스는 useEffect같은거 쓰는걸 말함

함수콤포넌트
*/

const Ball = memo( ({number}) => {
        let background;

        if(number<=10){
            background='red'
        } else if(number<=20){
            background='orange'
        } else if(number<=30){
            background='yellow'
        } else if(number<=40){
            background='blue'
        } else  {
            background='green'
        }

        return (
            <div className='ball' style={{background}}>{number}</div>
        )
})

export default Ball;