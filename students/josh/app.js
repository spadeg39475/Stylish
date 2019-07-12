const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
const port = 3000;

app.get('/', (req, res) =>{
    res.send('test');
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});