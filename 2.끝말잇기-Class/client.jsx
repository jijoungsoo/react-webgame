const React = require('react');
const ReactDOM = require('react-dom');

const WordRelay = require('./WordRelay')


ReactDOM.render(<WordRelay />,document.querySelector('#root'))

/*
jsx로 하면 좋은거    x하나 추가해서  react 전용 파일이구나를 깨달을 수 있기 때문에 jsx로 하는게 좋다.
js로 하면 react일수도 있고 javascript일수도 있어서 확인이 필요하다.
*/