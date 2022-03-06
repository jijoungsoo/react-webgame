import React,{Component} from 'react';

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

class Lotto extends Component {
    state={
        winNumbers:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false
    };

    timeouts=[];

    runTimeouts = ()=>{
        console.log('runTimeouts')
        const {winNumbers}  = this.state;
        // let을 쓰면 클로저 문제가 안생긴다고한다.
        for(let i=0;i<winNumbers.length-1;i++){
            this.timeouts[i]= setTimeout(()=>{
                this.setState((prevState)=>{
                    return {
                        winBalls: [...prevState.winBalls,winNumbers[i]],
                    }
                })
            }, (i+1)*1000);
        }
        this.timeouts[6]= setTimeout(()=>{
          this.setState({
            bonus: winNumbers[6],
            redo:true,
          })  
        }, 7000);
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.runTimeouts();
    }

    componentDidUpdate(prevProps,prevState) {
        console.log('componentDidUpdate')
        if(this.state.winBalls.length==0){
            this.runTimeouts();
        }

    }
    /*
        부모컴포넌트가 자식 컴포넌트를 없앨때   setTimeout이 문제가 됨
        보무컴포넌트가 Lotto 콤포넌트를 없앤는데 setTimeout을 클리어 안해주면 메모리에서 상에서 실행된다고 한다.
        이해 안됨

        그래서 componentWillUnmount에서 해제 해주어야한다고 한다.
    */
    componentWillUnmount(){
        /*
        이해 됨  화면이 그려지지 않았는데 부모에 의해서 지워졌을때
        setTimeout은 계속 실행되는데  
        애는 없음 
        극래서 화면에서 사라질때 setTimeout을 해제  해야함
        */

        this.timeouts.forEach((v)=>{
                        clearTimeout(v);
        })
    }

    onClickRedo = () =>{
        this.setState({
            winNumbers:getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo:false
        });
        this.timeouts=[];
    }

    render() {
        const {winBalls,bonus,redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v)=><Ball key={v} number={v} />)  }
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )

    }
}

export default Lotto;