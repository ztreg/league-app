
import mongoose = require("mongoose");
// import {Mongoose as test} from "mongoose"

// const dbTest = new test()
let database: mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = "mongodb+srv://JonasEx:F*zRT*R@tuF9Ht8@jonasleague.qnofa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  if (database) {
    console.log(database);
    
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};

import { Schema } from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  summonerName: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  summonerId: {
    type: String
  },
  following: { // list of summoner_ids
    type: Array
  }
});

const User = mongoose.model("User", UserSchema)

export default { UserSchema, User}