const express = require('express')
const app = express()
const router = express.Router()


router.use((req, res)=>{

    const {username, password} = req.body
    res.render('dashboard', {username})
})

module.exports = router