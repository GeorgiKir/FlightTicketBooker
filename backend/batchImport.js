const { flights, reservations } = require("./data");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let flightList = [];
console.log(Object.keys(flights).length);

Object.keys(flights).forEach((item) => {
  let flightObj = {
    _id: item,
    flight: item,
    seats: flights[item],
  };
  flightList.push(flightObj);
});

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("SlingAir");

    await db.collection("flights").insertMany(flightList);
    console.log("SUCCESS!");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

batchImport();
