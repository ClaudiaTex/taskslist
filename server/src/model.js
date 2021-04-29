const tasksData = require('./tasks.json')
const fs = require('fs');
const path = require('path');


const saveTask = tasksData => {
    fs.writeFile('./src/tasks.json', JSON.stringify(tasksData), function (err) {
        if (err) {
            console.log('Error!!')
        }
    })
}

const getAllTasks = tasksData => {
    const tasksFile = path.join(__dirname, 'tasks.json')
    return tasksFile
}


module.exports = {
    saveTask,
    getAllTasks
}
