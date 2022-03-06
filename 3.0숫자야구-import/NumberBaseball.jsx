import React ,{ Component,createRef} from 'react';
import Try from './Try';

function getNumbers(){  //숫자 4개를 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9]
    const array = []
    for( let i =0;i<4;i+=1){
        const chosen =candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen)
    }
    return array;
}

/*getNumbers를 class 안에 넣어도 됨
 그런데 바깥으로 뺄수있는 경우는 this가 안쓰일 경우임
 
*/

class NumberBaseball extends Component {
    state = {
        result:'',
        value: '',
        answer: getNumbers(),
        tries: []  //react에서 배열에 넣을때 push를 쓰면 안되요.
        /*
            const arr = [];
            const arr.push(1)
            //이렇게 하면 react는 변경되었다는것을 감지하지 못한다고 한다.
            arr === arr
            true가 나와서 변경점을 모른다고한다.
            const arr1 = [];
            const arr2 = [...arr1,1]
            arr1 === arr2 
            false가 나와서 변경된것을 감지한다고 한다.
        */

    }

    onSubmitForm = (e) => {
        const {result, value,tries,answer} = this.state;   //비구조화 할당 으로 this.state 줄이기
        console.log(answer);
        console.log(value);
        e.preventDefault();
        if(value=== answer.join('')) {
            this.setState((prevState)=>{
                return {
                    result:'홈런',
                    tries: [...prevState.tries,{try:value,result:'홈런!'}]
                    /*push를 쓰면 안되고 위에 방식으로 tries에 추가해야한다. 그래야 react에서 변경점을 인지한다. */
                }                
            })
            alert('게임을 다시 시작합니다.')
            this.setState({
                value:'',
                answer:getNumbers(),
                tries:[]

            })
            this.inputRef.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike=0;
            let ball =0;
            if(tries.length>=9){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`
                })
                alert('게임을 다시 시작합니다.')
                this.setState({
                    value:'',
                    answer:getNumbers(),
                    tries:[]

                })
                this.inputRef.current.focus();
            } else {
                for(let i=0;i<4;i+=1){
                    if(answerArray[i] === answer[i]){
                        strike +=1;
                    } else if (answer.includes(answerArray[i])){
                        ball +=1;
                    }
                }
                this.setState((prevState)=>{
                    return {
                        value:'',
                        tries: [...prevState.tries,{try:value,result:`${strike}스트라이크,${ball} 볼입니다.`}]
                        /*push를 쓰면 안되고 위에 방식으로 tries에 추가해야한다. 그래야 react에서 변경점을 인지한다. */
                    }
                })
                this.inputRef.current.focus();
            }

        }
        
    }

    onChangeInput = (e) => {
        /*화살표 함수를 안쓰면  this로 setState를 찾을수 없고
        화살표를 안쓰려면  contructor를 생성해주고  bind를 연결해줘야한다. */
        this.setState({
            value:e.target.value
        })
    }

    inputRef =createRef();

    render(){
        return (
                <>
                    <h1>{this.state.result}</h1>
                    <form onSubmit={this.onSubmitForm}>
                        <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    </form>
                    <div>시도:{this.state.tries.length}</div>
                    <ul>
                        {this.state.tries.map((v,i)=>{
                            return (
                                <Try key={`${i+1}차 시도 :`} tryInfo={v}  />
                            );
                        })}
                    </ul>

                    <ul>
                        {['사과1','바나나','귤','like'].map((v,i)=>{
                            return (
                                <li key={i}>{v}</li>
                            );
                        })}
                    </ul>

                    <ul>
                        {[
                          ['사과','맛있다'],
                          ['바나나','맛없다.'],
                          ['귤','시다']
                        ].map((v,i)=>{
                            return (
                                <li key={i}><b>{v[0]}</b> - {v[1]}</li>
                            );
                        })}
                    </ul>

                    <ul>
                        {[
                          { fruit:'사과', taste:'맛있다1'},
                          { fruit:'바나나', taste:'맛없다2'},
                          { fruit:'귤', taste:'시다3'},
                        ].map((v,i)=>{
                            return (
                                <li key={i}><b>{v.fruit}</b> - {v.taste}</li>
                            );
                        })}
                    </ul>
                </>

        )
    }
}
export default NumberBaseball;

/*Map 사용 하는 예 방식하나

[1,2,3]  -> [2,4,6]
[1,2,3].map( (v) => v*2 )

이렇게 바꿀수도 있고 숫자를 문자로 바꿀수도 있고 그렇다.
map  용도만도 책1권쓸수있다고 한다.
*/