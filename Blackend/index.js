const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = [];
let counter = 1;

// paht = get/users
app.get('/users', (req, res) => {
    res.json(users);
});

//path = Post/user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter++;
    users.push(user);
    res.json({ message: 'User added successfully', user: user });x
});

//path = put/user/:id
app.patch('/user/:id', (req, res) => {
   let id = req.params.id;
   let updatedUser = req.body;
   //หา user จาก id
    let selectedindex = users.findIndex(user => user.id == id);
   //update user
   if (updatedUser.name ) {
    users[selectedindex].name = updatedUser.name;
    }
    if (updatedUser.age) {
        users[selectedindex].age = updatedUser.age;
    }
   //ส่ง response กลับไป
    res.json({ 
    message: 'User updated successfully',
    data : {
        user : updatedUser,
        indexUpdate : selectedindex
    }
     });
})
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let selectedindex = users.findIndex(user => user.id == id);
    if (selectedindex !== -1) {
        users.splice(selectedindex, 1);
        res.json({ 
            message: 'User deleted successfully',
            data:{deletedIndex: selectedindex}
        });
    } else {
        res.status(404).json({ 
            message: 'User not found' });
    }
});

app.listen(port, () => {
  console.log(`server runing is portnpx:${port}`);
});
