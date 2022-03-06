import  React from 'react';
import  ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import TickTacToe from './TickTacToe';

const Hot = hot(TickTacToe);

ReactDOM.render(<TickTacToe />,document.querySelector('#root'))