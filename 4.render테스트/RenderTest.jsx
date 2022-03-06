import React,{PureComponent} from 'react';

class Test extends PureComponent {
    state = {
        counter:0
    }
/*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }
*/    
    /*
    react 가 setState({})를 호출 할때마다 갱신이 된다.
    이럴때 shouldComponentUpdate 를 사용해서 update 되어야 하는 상태를 지정해주면
    그 경우에만 update가 된다.

    shuldComponentUpdate를 명시적으로 안하려면  PureCompnent를  사용해도 된다.
    내부적으로 shuldCompnentUpdate를 구현해 놓은 것이다.
    1. state의 값들이 변경되어있는지 비교 
    2. 개체나 배열들이 state로 있으면  PureComponent도 정상적으로 동작하지 않는다.
       객체나 배열을  다차원 참조로 쓰지 말자고  동영상 강사는 이야기한다.
       쓸거면 1차원적으로 객체나 배열을 쓰자고 한다. 
       1차원도 더할 땐 ...을 사용해서 복사하도록

       함수를 쓸때는 memo를 쓰면 된다. 3.1숫자야구-function 참고 

    */

       /*
       Context

       //A->B->C->D->E->F->G

       A-->G로 바로 데이터를 이동 하고 싶을 때 ccontext를 쓴다고 하는데 
       안알려줌

       props의 진화용이라고 한다.

       redux는 context의 진화용이라고 한다.
       
       */

    onClick =()=>{
        this.setState({})
    };

    render(){
        console.log('렌더링',this.state)
        return (
        <div>
            <button onClick={this.onClick}>클릭</button>
        </div>
        )
    }

}
export default Test