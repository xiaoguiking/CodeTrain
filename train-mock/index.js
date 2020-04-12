
const express = require('express');
const path = require('path');
const apiMocker = require('mocker-api');

const app = express();
// app.get('/', (request, response) => {
//     response.status(200);
//     response.send('hello');
//     response.end();
// });

// app.get('/rest', (request, response) => {
//     response.json({
//         result: 1,
//         msg: 'hello world'
//     })
// });

apiMocker(app, path.resolve('./mocker/mocker.js'))
// app.listen(80);

app.listen(5000, () => {console.log('express port is 5000')});

/**
 * yarn add mocker-api
 * yarn add dayjs
 */