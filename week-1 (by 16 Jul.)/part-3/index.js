const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static("public"));

// app.get('/', (req, res) => {
//     res.send('test test');
// });


app.listen(port, () =>{
    console.log('App is listening on port ${port}!');
});