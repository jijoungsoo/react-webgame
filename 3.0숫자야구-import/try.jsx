import React,{PureComponent} from 'react';

class Try extends PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        const {TryInfo} = this.props;
        /*
        props는 부모가 바꿔야지 자식에서 바꾸면 안된다.
        실무에서   props를 바꿔야 하는 경우가 있다면
        --그래야 부모한테 영향을 미치지 않음

        useState에 props를 넣어준다는데  이해 못함
        */
        return (
            <li>
                    <div>{tryInfo.try}</div>
                    <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default Try