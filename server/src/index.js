const express = require('express');
const morgan = require('morgan');
const controller = require('./controller');

//settings
const app = express();


//port
app.set('port', 4000);


//midelware
app.use(morgan('dev'));
app.use(express.json());



//endpoints
app.get('/', controller.hello);
app.post('/newTask', controller.createTask); //NO FUNCIONA CORRECTAMENTE
app.get('/task/:taskID', controller.readTask); //NO FUNCIONA CORRECTAMENTE
app.get('/tasks', controller.allTasks);
app.put('/updateTask/:taskID', controller.updateTask); //NO FUNCIONA CORRECTAMENTE
app.delete('/deleteTask/:taskID', controller.deleteTask); //NO FUNCIONA CORRECTAMENTE



//server
app.listen(app.get('port'), () =>{
    console.log('Server on port:', app.get('port'))
})