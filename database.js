const { toArray } = require('lodash');
const path = require('path');
const { toASCII } = require('punycode');
require("dotenv").config({ path: path.join(process.env.HOME, '.cs304env')});
const { Connection } = require('./connection');
const cs304 = require('./cs304');


const mongoUri = cs304.getMongoUri();


// REPLACE WITH YOUR OWN USERNAME ("og102", for example)
const myDBName = "wokRoll";

async function insertRest(db){
    let result = await db.collection("restaurants").insertOne(
        {
            id : 001,
            name : "Xiang’s Hunan Kitchen",
            neighborhood: "Allston",
            cuisine: "Hunan",
            phone: "617-202-5498",
            hours: {
                Monday: "11:30AM-3:30PM, 4:30-9:30PM",
                Tuesday: "11:30AM-3:30PM, 4:30-9:30PM",
                Wednesday: "11:30AM-3:30PM, 4:30-9:30PM",
                Thursday: "11:30AM-3:30PM, 4:30-9:30PM",
                Friday: "11:30AM-10PM",
                Saturday: "11:30AM-10PM",
                Sunday: "11:30AM-3:30PM, 4:30-9:30PM"
            },
            menu: [
                "Stirred Fried Crispy Beef Tripes",
                "Hunan Style Sauteed Chicken",
                "Mao Xue Wang"
            ],
            price_range : "$$",
            delivery: "yes",
            dine_in: "yes",
            photo_links:"photo1"

        }
    )
    return result.acknowledged; //will say if insertion was successful
}

async function main(){
    console.log(mongoUri);
    const db = await Connection.open(mongoUri, myDBName);
    q1 = await insertRest(db);
    console.log(q1);
    await Connection.close();
}


main().catch(console.error);
