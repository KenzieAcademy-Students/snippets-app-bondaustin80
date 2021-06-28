import express from 'express'
import { User } from '../models';
const router = express.Router()

router.get('/alice', async (req, res) => {
    const alice = await User.findOne({ username: 'alice' })
    if (alice) {
        res.send("User alice exists")
    } else {
        res.status(404).send("User alice does not exist")
    }
})

router.get('/top', async (req, res) => {
    let top1 = {posts: []}
    let top2 = {posts: []}
    let top3 = {posts: []}
    let allUsers = await User.find()
    if (allUsers) {
        for (let i = 0; i < allUsers.length; i++) {
            if ((allUsers[i].posts.length > top1.posts.length) || (top1 === null)) {
                top3 = top2
                top2 = top1
                top1 = allUsers[i]
            } else if ((allUsers[i].posts.length > top2.posts.length) || (top2 === null)) {
                top3 = top2
                top2 = allUsers[i]
            } else if ((allUsers[i].posts.length > top3.posts.length) || (top3 === null)) {
                top3 = allUsers[i]
            }
        }
        res.send(`The top 3 users are ${top1.username}, ${top2.username}, and ${top3.username}`)
    } else {
        res.status(404).send("There was a problem accessing the top 3 users")
    }
    
})

module.exports = router