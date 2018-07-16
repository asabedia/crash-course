const express = require('express');

const app = express();

const port = 5000;

app.get("/api/users", (req, res)=>{
    const users = [
        {id: 1, firstName: 'John', lastName: 'Smith'},
        {id: 2, firstName: 'Jimmy', lastName: 'Smith'}
    ]
    res.json(users);
});

app.listen(port, () => console.log('server started'));