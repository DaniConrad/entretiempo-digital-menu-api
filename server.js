const express = require('express')
const storage = require('./src/helpers/multer')
const multer = require('multer')
const path = require('path')
const Products = require('./src/scripts/Products')
const cors = require('cors')
const verifyCode = require('./src/Middlewares/AuthMiddleware')
const http = require("http")
const Logger = require('./src/logs/model/log4js.model')

//-- Initializers
const app = express()
const PORT = process.env.PORT || 8080 
const upload = multer({ storage: storage })
app.use(express.urlencoded({extended:false}))


// httpConfig 
const httpServer = http.createServer(app);

//-- Middlewares 
app.use('/static', express.static(path.join(__dirname, './src/public')));
app.use(cors())

//-- Routes

app.get("/", (req, res) => {
    res.send("Running")
})

app.post(`/dataloadmanagement/products/:key`,  (req, res, next) => verifyCode(req, res, next), upload.single('Products'))



app.get('/products', (req, res) => {
    res.send(Products.getProducts())
})

// --Run server 
const server = httpServer.listen(PORT, ()=>{
    Logger.info(`Server running at ${PORT}`)
})
server.on('error', error => console.log('Error on server', error))