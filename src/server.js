const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());


let tasks = [];

app.post('/tasks', (req, res) => {
  const { title, dueDate, completed } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    dueDate,
    completed: completed || false,
  };
  tasks.push(newTask);
  res.json(newTask);
});


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, dueDate, completed } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.title = title || task.title;
    task.dueDate = dueDate || task.dueDate;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});


app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json({ message: 'Task deleted' });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


//module.exports = app;