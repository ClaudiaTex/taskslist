const model = require('./model.js')
const tasksData = require('./tasks.json');
const global = require('./counter.json');

const hello = (req,res) => {
    res.send('Hello world!')
}


//CRUD TASKS

const createTask = (req,res) => { 

    if(global.countTask >= 0){
        const taskID = global.countTask += 1;
        const title = req.body.title
        const description = req.body.description
        const flag = req.body.flag
        const creationDate = new Date().toISOString();
        const updateDate = new Date().toISOString();
        tasksData.tasks.push({
            taskID,
            title,
            description,
            flag,
            creationDate,
            updateDate
        })
        model.saveTask(tasksData)
        response1 = `Tarea ${taskID}: ${title} añadida`
        console.log(global)
    }else {
        response1 ='Error'
    }
    res.send(response1)
}

const readTask = (req,res) => { 
    const paramTaskID = req.params.taskID
    const taskFind = tasksData.tasks.find(task => task.taskID === paramTaskID)
    let response;
    if(taskFind){
        response = taskFind
    }else{
        response = 'Tarea no encontrada.'
    }
    res.send(response)
}

const allTasks = (req,res) => {
    const getAll = model.getAllTasks(tasksData)
    res.sendFile(getAll)
}

const updateTask = (req,res) => {
    const paramTaskID = req.params.taskID
    const taskIndex = tasksData.tasks.findIndex(task => task.taskID === paramTaskID)
    const newTitle = req.body.title
    const newDescription = req.body.description
    const newFlag = req.body.flag
    //const updateDate = new Date().toISOString();
    let response2;

    if (taskIndex >= 0){
        if(newTitle && newDescription && newFlag){
            tasksData.tasks[taskIndex].title = newTitle
            tasksData.tasks[taskIndex].description = newDescription
            tasksData.tasks[taskIndex].flag = newFlag
            tasksData.tasks[taskIndex].updateDate = new Date().toISOString();
            model.saveTask(tasksData)
            response2 = `Tarea ${taskID} modificada.`
        }else if(newTitle){
            tasksData.tasks[taskIndex].title = newTitle
            tasksData.tasks[taskIndex].updateDate = new Date().toISOString();
            model.saveTask(tasksData)
            response2 = `Tarea ${taskID}: Titulo modificado.`
        }else if(newDescription){
            tasksData.tasks[taskIndex].description = newDescription
            tasksData.tasks[taskIndex].updateDate = new Date().toISOString();
            model.saveTask(tasksData)
            response2 = `Tarea ${taskID}: Descripcion modificada.`
        }else if(newFlag){
            tasksData.tasks[taskIndex].flag = newFlag
            tasksData.tasks[taskIndex].updateDate = new Date().toISOString();
            model.saveTask(tasksData)
            response2 = `Tarea ${taskID}: Visibilidad ${newFlag}`
        }else{
            response2 = 'Modifique todos los elementos de una vez o de uno en uno.'
        }

    }else{
        response2 = 'Tarea no encontrada.'
    }

    res.send(response2);
}


const deleteTask = (req,res) => {
    const paramTaskID = req.params.taskID
    const taskIndex = tasksData.tasks.findIndex(task => task.taskID === paramTaskID)

    if(taskIndex >= 0){
        tasksData.tasks.splice(taskIndex, 1)
        model.saveTask(tasksData)
        response3 = `Tarea ${paramTaskID}: Eliminada.`
    }else{
        response3 = `Tarea ${paramTaskID} no encontrada.`
    }
    res.send(response3)
}


module.exports = {
    hello,
    createTask,
    readTask,
    allTasks,
    updateTask,
    deleteTask
}