const express = require('express');
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

var app = express();
//middlewares
app.use(express.urlencoded({ extended: true })); //poder aceptar datos 
app.use(express.json()); //enviar y recibir json


//Connect to the Azure Cosmos account
const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

app.listen(3000, () => {
    console.log('server on port 3000');
});

//Query items

app.get("/",async (req,res) =>{

const querySpec = {
    query: "SELECT * from c"
  };
  
  const { resources: Orders } = await container.items
    .query(querySpec)
    .fetchAll();
  
  res.send(Orders);

});

app.get("/:id", async (req,res) =>{
  const {id} =req.params; //to catch id
  const { resource:result } = await container.item(id,id)
  .read();
  
  res.send(result);
  
});

app.post("/",async (req,res) =>{
  let Order = req.body
    const { resource: createdOrder} = await container.items.create(Order);
    res.send(`${createdOrder.id}`);
});

app.put("/:id",async (req,res) =>{
  
})

app.delete("/:id", async (req,res) =>{
  const {id} =req.params; //to catch id
  const { resource: result } = await container.item(id, id).delete();
    res.send(`Deleted Order with id: ${id}`);
});

