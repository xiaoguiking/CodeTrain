import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css';  // 清除浏览器全局样式

import store from './store';
import './index.css';
import App from './App';

ReactDom.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
    );