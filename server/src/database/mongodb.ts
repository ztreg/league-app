
import mongoose = require("mongoose");

let database: mongoose.Connection;
export const connect = () => {
  const uri = `mongodb+srv://${process.env.dbstring}?retryWrites=true&w=majority`;
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

const UserSchema = new mongoose.Schema({
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