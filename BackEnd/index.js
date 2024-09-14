const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const myDb = require('./MongoDb')
const App = new express()
const PORT = 9000
const CustomerLogin = require('./UserLogin')
const FoodQtyIncrement = require('./AddFood')
const FoodQtyDecrement = require('./RemoveFood')

App.use(cors({origin:"*"}))
App.use(bp.json())
App.use(express.urlencoded({ extended: false}))

App.use("/api/Customer",CustomerLogin)
App.use("/api/Food",FoodQtyIncrement)
App.use("/api/FoodtoBe",FoodQtyDecrement)


App.post("/api/GetAllFoodItems",async(req,resp)=>{


    var FoodCollection =  myDb.collection("Food")

    const FoodItems = await FoodCollection.find({}).toArray()

    resp.send(FoodItems)

})

App.post("/api/GetFoodItemsByCategory",async(req,resp)=>{

    const Category = req.body.SelectedCategory

    var FoodCollection = await myDb.collection("Food")

    const FoodItems = await FoodCollection.find({Category:Category}).toArray()

    resp.send(FoodItems)

})

App.listen(PORT,err=>{

    if(err)
        console.log(err)
    else
        console.log("Server Running at port "+PORT)
})