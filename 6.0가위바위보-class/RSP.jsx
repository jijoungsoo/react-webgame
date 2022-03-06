import React,{Component} from 'react';

//실행순서  클래스의 경우 --> constructor -> reder -> ref ->componentDidMount
// -> (setState/props 바뀔때 -> shuldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때   -> componentWillUnmount -> 소멸


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
    console.log(`computerChoice->imgCoord=>${imgCoord}`);

    var tmp = Object.entries(rspCoords).find(function(v){
        console.log(v);
        console.log(imgCoord);
        console.log(v);
        var tmp2=(v[1]===imgCoord);
        console.log(`tmp2->${tmp2}`);
        return tmp2;
    });
    console.log(tmp);
    console.log(`tmp->tmp=>${tmp}`);
    return tmp[0];
}

class RSP extends Component {
    state = {
        reslut:'',
        imgCoord:'0',
        score:0
    }
    /*컴포넌트의 life cycle 
    제일 처음 render가 실행되었다면
    componentDidMount 가 실행된다.

    컴포넌트가  제거되기 직전에는 componentWillUnmount가 실행한다.

    render내에서는 setState를 할수 없으므로 위에 다가 사용한다. 넣으면 무한 루프에 빠짐
    */
   
   interval;
    componentDidMount() {// 컴포넌트가 첫 렌더링된 후 
        this.interval = setInterval(()=>{
          this.changeHandler();
        },1000)

    }

    componentWillUnmount() {// 컴포넌트가 제거되기 전 - 부모가 나를 없앴을 때  , 
        /*비동기 요청 정리를 많이 한다.  */
        clearInterval(this.interval)

    }

    componentDidUpdate(){ // 리렌더링 후 
      
    }

    changeHandler =()=> {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위){
            //console.log('here-바위')
            this.setState({
                imgCoord: rspCoords.가위
            })                
        } else if(imgCoord === rspCoords.가위){
            //console.log('here-가위')
            this.setState({
                imgCoord: rspCoords.보
            })
        } else if(imgCoord === rspCoords.보){
            //console.log('here-보')
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }

    onClickBtn = (choice)=> ()=> {  /* ()=> 를 하나 더 준거 고차함수  이렇게 안쓰면   onClick{()=>this.onClickBtn('바위')   이렇게 써야한다.} */
        const {imgCoord} = this.state;
        clearInterval(this.interval)
        const myScore=scores[choice]
        const cpuScore=scores[computerChoice(imgCoord)]
        const diff = myScore-cpuScore
/*
        console.log(`choice->${choice}`);
        console.log(`[computerChoice(imgCoord)->${computerChoice(imgCoord)}`);
        console.log(`myScore->${myScore}`);
        console.log(scores)
        console.log(`scores->${scores['보']}`);
        console.log(`cpuScore->${cpuScore}`);
        console.log(`diff->${diff}`);
*/        
        if(diff===0){
            this.setState({
                result:"비겼습니다."
            })
        } else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return {
                    result:"이겼습니다.",
                    score: prevState.score+1
                }
                
            })
        } else {
            this.setState((prevState)=>{
                return {
                    result:"졌습니다.",
                    score: prevState.score-1
                }
                
            })
        }

        setTimeout(()=>{
            this.interval = setInterval(()=>{
                this.changeHandler();
              },1000)
        },2000)
        
    }

    render() {
        const {imgCoord,result,score} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(/gawebawebo.png) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP