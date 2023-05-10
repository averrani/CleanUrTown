const express = require('express');
const app = express();
const port = 3000;
 
app.use(express.static('public')); 
        
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

//lance l'ecoute
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
}) 