import  React from 'react';
import  ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import Lotto from './Lotto';

const Hot = hot(Lotto);

ReactDOM.render(<Lotto />,document.querySelector('#root'))