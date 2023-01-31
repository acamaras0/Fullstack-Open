const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://Anamaria:${password}@cluster0.wtu73dl.mongodb.net/?retryWrites=true&w=majority`;
const newName = process.argv[3];
const newNumber = process.argv[4];
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    "usage: node mango.js <passwords> <contact name> <contact phonenumber>"
  );
} else if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: newName,
        number: newNumber,
      });

      return person.save();
    })
    .then(() => {
      console.log(newName, ":", newNumber, " added to contacts!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if (process.argv.length === 3) {
  console.log("Phonebook:");
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  });
}
