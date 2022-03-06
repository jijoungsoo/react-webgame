import React,{Component} from 'react';

class ResponseCheck extends Component {
    state = {
        state:'waiting',
        message:'클릭해서 시작하세요',
        result : [],

    }

    timeout;
    startTime;
    endTime;

    onClickScreen = ()=>{
        const {state,message,result} = this.state;
        if(state==='waiting'){
            this.setState(
                {
                    state:'ready',
                    message:'초록색이 되면 클릭하세요.'
                })
            this.timeout= setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭'

                })
                this.startTime = new Date();
            }, Math.floor( Math.random() *1000)+2000) //2초~3초 랜덤`
        } else if(state==='ready'){
            clearTimeout(this.timeout)
            this.setState({
                    state:'waiting',
                    message:'너무 성급하시군요! 초록색이 된 후에 클릭하세요',                
            })
        } else if(state==='now'){
            this.endTime = new Date();
            this.setState((prevState)=>{
                return {
                    state:'waiting',
                    message:'클릭해서 시작하세요',
                    result:[...prevState.result, this.endTime-this.startTime]
                }
            })
        }

    }

    onReset = () => {
        this.setState({
            result:[]
        })
    }

    renderAverage = () =>{
        const {result} = this.state;
        return result.length == 0
            ? null 
            : <> <div>평균시간:{this.state.result.reduce((a,c)=>a+c)/this.state.result.length}ms</div>
                 <button onClick={this.onReset}>리셋</button>
              </>
            
    }

    render() {
        return(
            <>
                <div id="screen"
                className={this.state.state}
                onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                {this.renderAverage()}
{/*
                {this.state.result.length == 0
                 ? null 
                 : <div>평균시간:{this.state.result.reduce((a,c)=>a+c)/this.state.result.length}ms</div>
                }                
*/}                
{/*  위에 3항 연상자와 아래 와 같은 것
                {this.state.result.length !== 0
                    &&  <div>평균시간:{this.state.result.reduce((a,c)=>a+c)/this.state.result.length}ms</div>
                }
*/}                
            </>

        )
        
    }
}
export default ResponseCheck