const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://rishabhsharma123:rishabh123@cluster0.srnxjgu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3001, () => console.log(`Listening on Port 3001}`))

    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch((error) => console.log(`${error} Cant connect`))

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});
const Task = mongoose.model('Task', taskSchema);
app.get('/tasks', async (req, res) => {
    try {
        const post = await Task.find()
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
);
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving task' });
    });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  newTask.save()
    .then(savedTask => {
      res.status(201).json(savedTask);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error creating task' });
    });
});
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  Task.findByIdAndUpdate(taskId, { title, description }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(updatedTask);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating task' });
    });
});
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndDelete(taskId)
    .then(deletedTask => {
      if (!deletedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(deletedTask);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error deleting task' });
    });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});