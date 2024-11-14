const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const Item = require('./models/item');
async function main() {
  await mongoose.connect("mongodb://localhost:27017/MSD");
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(cors());

app.get('/api', (req, res) => {
    res.send({data: "hello world"})
});

app.get('/api/items' , async(req, res) => {
    const items = await Item.find();
    // console.log(items);
    res.send({items});
});

app.post('/api/items', async(req, res) => {
  try {
    const {name, quantity, price} = req.body;
  const item = new Item({name, quantity, price});
  await item.save();
  res.send(item);
  } catch(err) {
    console.log(err);
  }
})

app.post('/api/items/:id', async(req, res) => {
    const {id} = req.params;
    const {name, price, quantity} = req.body;
    const item = await Item.findById(id);
    if(!item) {
        return res.status(404).send({message: "Item not found"})
        }
    const updatedItem = await Item.findByIdAndUpdate(id, {name, price, quantity}, { new: true });
    res.send(updatedItem);
})


app.delete('/api/items/:id',  async(req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    if(!item) {
        return res.status(404).send({message: "Item not found"})
        }
    const removedItem = await Item.findByIdAndDelete(id);
    res.send(removedItem);
});

app.get('/api/items/value', async(req, res) => {
    const items = await Item.find({});
    const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    res.json({ totalInventoryValue: totalValue });
});
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});