const express = require('express');
const router = express.Router();
const Todos = require('../TodoSchema');
const auth=require('../middleware/auth');
router.use(express.json());


router.post('/create',auth,async (req, res) => {
    try {
       
        const { Todo } = req.body;
        // if(Todo==="") return alert('Todo must be specified');
        const newTodo = new Todos({
            Todo: Todo,
            user: req.id,
        })
        await newTodo.save();
        
        res.json(newTodo); // Respond with the created todo
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
});
router.get('/todo',auth,async (req, res) => {
    
    
    try {
        
        let UserID=req.id;
        let data = await Todos.find({user: UserID});

        res.json(data);
    } catch (error) {
        
        return res.status(500).json({ error: 'Internal Server Error' });
        
    }
});


router.delete('/delete',auth,async (req, res) => {
    try{
        
        await Todos.findByIdAndDelete(req.body.id);

        res.status(200).json("Deleted");
    }
    catch(err){
        
        res.status(500).json("Internal Server Error");
    
    }
})

router.put('/update',auth,async(req,res)=>{
    try{
        const {id,Todo}=req.body;
        const note=await Todos.findById(id);
        note.Todo=Todo;
        await note.save();
        res.json(note);
    }
    catch(err){
        
        res.status(500).json("Internal Server Error");
    
    }
})
module.exports = router;
