const Todo = require("../models/Todo");

// Controller methods
exports.getAllTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(todos);
    }
  });
};

exports.createTodo = (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
  });

  newTodo.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(todo);
    }
  });
};

exports.updateTodo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(
    id,
    { completed: req.body.completed },
    { new: true },
    (err, todo) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!todo) {
          res.status(404).send("Todo not found");
        } else {
          res.status(200).json(todo);
        }
      }
    }
  );
};

exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!todo) {
        res.status(404).send("Todo not found");
      } else {
        res.status(200).send("Todo deleted successfully");
      }
    }
  });
};
