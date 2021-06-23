import express from 'express'
const router = express.Router()


router.get('/hello/:name', async (req, res) => {
    const name = req.params.name
    console.log(name)
    try {
        res.send(`Hello ${name}`)
    } catch(err) {
        res.status(404).send(err.message)
    }
});

router.get('/add/:x/:y', async (req, res) => {
    const x = req.params.x
    const y = req.params.y
    console.log(isNaN(x), isNaN(y))
    if (isNaN(x) === true || isNaN(y) === true) {
        res.send("Invalid values. Please enter 2 numbers")
    } else {
        res.send(`Sum: ${parseInt(x) + parseInt(y)}`)
    }
});

router.get('/teapot', async (req, res) => {
    res.status(418).send(true)
});

router.post('/teapot/:isATeapot', async (req, res) => {
    const areYouATeapot = req.params.isATeapot
    if (areYouATeapot === "true") {
        res.status(418).send(`amIATeapot: yes`)
    } else {
        res.send("amIATeapot: no")
    }
})

module.exports = router