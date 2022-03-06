const React = require('react');
const {Component} = React;

class WordRelay extends Component {
    state = {
        word:'제로초',
        value:'',
        result:''

    }

    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.word[this.state.word.length-1] === this.state.value[0]){
            this.setState({
                result:'딩동댕',
                word:this.state.value,
                value:''
            })
        } else {
            this.setState({
                result:'땡',
                value:''
            })
        }


    };

    onChangeInput = (e) =>{
        this.setState({value:e.target.value});
    }

    input;

    onRefInput=(c)=>{
        this.input=c;
    }


    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력!43</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
        
    }
}

module.exports = WordRelay;   /*이게 바깥에서도 WordRelay를 쓸수있게 해주는  node의 모듈 시스템이다. */