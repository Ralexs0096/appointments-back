const express = require('express')
const { dbConnection } = require('../database/config')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 4000
        this.authRoutePath = '/api/auth'
        this.AppoitmentRoutePath = '/api/appoitment'
        
        this.connectDB()
        this.middlewares()
        this.routes()
    }
    
    // methods
    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.static('public'))
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.authRoutePath, require('../routes/auth.route'))
        this.app.use(this.AppoitmentRoutePath, require('../routes/appoitment.route'))
    }
    listen(){
        this.app.listen(this.port, () => console.log('Server running on Port', this.port))
    }
}

module.exports = Server