const express = require('express')
const router = express.Router()
const Subscriber = require("../models/subscriber")

// Get all
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Get one
router.get("/:id", getSubscriber , async (req, res) => {
    
    res.send(res.subscriber.name)
})
// Create one
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save() // Creating 
        console.log(req.body)
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
    
})
// Update one
router.patch("/:id", getSubscriber , async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Delete one
router.delete("/:id", getSubscriber , async (req, res) => {
    try {
        await res.subscriber.delete() // Deleting the sub
        res.json({message: "Subscriber removed successfully!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getSubscriber(req, res, next){      // Middleware to find subscriber
    let subscriber;
    try {
        
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message: "No subsriber found"});
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.subscriber = subscriber;
    next();
}
module.exports = router