import  React from 'react';
import  ReactDOM from 'react-dom';

import NumberBaseball from './NumberBaseball';
/* require는  node의 모듈 시스템이다.

const React =  require('react')
const ReactDom =  require('react-dom')
위 와 아래의 차이
const {hot} = require('react-hot-loader/root')
{} 를 구조분해 문법이라고 한다.

중괄호로 하는것은 deafult로 export한것이 아니다.
중괄호를 사용하지않는 것은 default로 export한 것이다.

ex) 아래는 es2015문법

export default Numberbaseball;  //Numberbaseball
export const hello;   //import {hello}

export default 랑 호환이 된다.
module.exports = WordRelay; 

export const는 아래와 같으 노드 모듈 문법과 호환된다. (디테일하게 들어가면 다르다고 하는데 강좌에서는 설명안했다.)
노드의 모듈문법을 commonjs라고 불린다.
export.hello ='hello';

import는  es2015 문법으로 아래 2개는 같은 의미다.
const React =  require('react')
import React from 'react'

****************************************
node에서는 commonJs만 지원하는데  바벨이 es2015문법을 commonJs문법으로 변환해준다.
*/


ReactDOM.render(<NumberBaseball />,document.querySelector('#root'))

/*
jsx로 하면 좋은거    x하나 추가해서  react 전용 파일이구나를 깨달을 수 있기 때문에 jsx로 하는게 좋다.
js로 하면 react일수도 있고 javascript일수도 있어서 확인이 필요하다.
*/