const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.status(200);
    response.send('hello');
    response.end();
});

app.get('/rest', (request, response) => {
    response.json({
        result: 1,
        msg: 'hello world'
    })
});

app.listen(5000, () => {console.log('express port is 5000')});