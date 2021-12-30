const { MongoClient } = require("mongodb");
const fs = require('fs');

const uri = "mongodb+srv://nee00011:X57sjut6BfQWW2K@cluster0.kfdxu.mongodb.net/schedule?retryWrites=true&w=majority"; 

function run() {
  // use connect method to connect to the server
  MongoClient.connect(uri, function(err, database) {
    if (err)
      throw err;
    const schedule = database.db("ScheduleDB").collection("schedule");

    const scheduleJson = JSON.parse(fs.readFileSync('schedule.json'));
    
    let allEvents = [];
    for (day in scheduleJson) {
      let newDayEvents = scheduleJson[day].map(e => {
        e.day = day;
        return e;
      });
      allEvents = allEvents.concat(newDayEvents);
    }
    console.log('Creating indexes on day and start time.');
    schedule.createIndex({ day: "hashed", start: 1 }, function(err, indexObj) {
      if (err)
        throw err;
      console.log('Created index:', indexObj);
      schedule.insertMany(allEvents, { ordered: true }, (err, insertRes) => {
        if (err)
          throw err;
        if (insertRes.acknowledged) {
          console.log(`Inserted ${insertRes.insertedCount} items`);
        } else {
          console.log('Failed to insert all items.');
          throw 'Insertion failed';
        }
        console.log('Listing all events in database...');
        schedule.find().toArray(function(err, items) {
          if (err)
            throw err;
          console.dir(items);
          database.close();
        });
      });
    });
  })
}

run();

// 6LoeUVi1H5ni1NZ1
