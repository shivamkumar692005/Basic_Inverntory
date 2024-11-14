const mongoose = require("mongoose");
const data = require("./init.json");
const Item = require('../models/item');
async function main() {
  await mongoose.connect("mongodb://localhost:27017/MSD");
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const initData = async() => {
    try {
        const items = data.map((item) => {
            return new Item(item);
        });
        const savedItem = items.map( async(item) => await item.save());
        console.log(savedItem);
    } catch(err) {
        console.log(err);
    }
}
initData();