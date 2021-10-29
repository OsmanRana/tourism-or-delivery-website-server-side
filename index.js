const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wntpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function run() {
  try {
    await client.connect();

    const database = client.db('tourism');
    const packageCollection = database.collection('packages')

    // one time data insertion

    // const packages = [
    //   {
    //     image: 'https://i.ibb.co/q9LLytT/indonesia.jpg',
    //     name: 'Bali Tour Package',
    //     decription: `Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.  Bali is also known as the Land of the Gods, Bali appeals through its sheer natural beauty of looming volcanoes and lush terraced rice fields that exude peace and serenity.

    //     It is very famous for surfers’ paradise! Bali enchants with its dramatic dances and colorful ceremonies, its arts, and crafts, to its luxurious beach resorts and exciting nightlife. And everywhere, you will find intricately carved temples.

    //     Bali 5 days and 4 night tour package price starts from 49900 tk only. 

    //     Let's begin the tour!`,
    //     Price: '৳ 49900',
    //     Duration: '4 Nights/ 5 Days'
    //   },
    //   {
    //     image: 'https://i.ibb.co/cwVLGzV/pattaya.jpg',
    //     name: 'Bangkok Pattaya and Phuket Tour Package',
    //     decription: `Airport pickup from hkt from bkk airport, drop out at mentioned hotel check in&stay over night at hotel. Having breakfast & wait for our representative at hotel lobby&go for phi phi island tour. Transfer to hotel after tour. Stay over night at hotel. Airport pickup from dmk airport&transfer to pttaya by road drop out at mentioned hotel& half day city tour check in &full free day for guest. Having breakfast & wait for our representative at hotel lobby& tranfer to bkk by road &full free day for guest. Stay over night at hotel. Having breakfast .Check out from hotel wait for our representative at hotel lobby to transfer to airport to go dac.`,
    //     Price: '৳ 39900',
    //     Duration: '4 Nights/ 5 Days'
    //   },
    //   {
    //     image: 'https://i.ibb.co/grQLb2t/umrah-night-view.jpg',
    //     name: 'Umrah Package',
    //     decription: `A visit to Ka'bah. Umrah can be performed at any time of the year.`,
    //     price: '৳ 79900',
    //     Duration: '7 Nights/ 8 Days'
    //   },
    //   {
    //     image: 'https://i.ibb.co/d09bscR/agra.jpg',
    //     name: 'Delhi, Agra, Jaipur Tour Package',
    //     decription: `On arrival at delhi international airport, after clearing customs and immigration, come out of the exit gate and meet our assistance and transfer to hotel. Check in to hotel and after fresh up and do half day city tour of delhi. Evening free for leisure and overnight stay at hotel. After breakfast check out from hotel and drive to agra. On arrival visit taj mahal, agra fort. Evening free for leisure and overnight stay at hotel in agra. After breakfast check out from hotel and drive to jaipur. En-route visit fatehpursikri. On arrival check in to hotel and overnight stay at hotel. After breakfast, enjoy a full day city tour of jaipur, morning excursion to amber fort and then visit jaigarh fort, city palace, jantar mantar, hawa mahal. Evening free for leisure and overnight stay at hotel. After breakfast check out from hotel and transfer to delhi airport to board your flight with memorable experience.`,
    //     Price: '৳ 35900',
    //     Duration: '7 Nights/ 8 Days'
    //   },
    //   {
    //     image: 'https://i.ibb.co/JBfg2mR/singapore-1.jpg',
    //     name: 'Singapore and Malaysia Tour Package',
    //     decription: `Airport pick from sin airport, drop at mentioned hotel. Check in &full free day for guest &stay over night at hotel. Having breakfast &wait for our represtative at hotel lobby &go for santosa island tour.Back to hotel after tour&stay over night at hotel. Having breakfast & wait for our representative at hotel lobby,pick from hotel lobby & transfer kul .Pick up from kul bus terminal & transfer to hotel. Check in & stay over night at hotel. Full free day for guest. Stay over night at hotel. Having breakfast, & wait for our representative at hotel lobby,pick from hotel lobby & transfer to half day city tour. Back to hotel after tour&stay over night at hotel.Having breakfast, check out from hotel. Wait in lobby as per mentioned confirmation time drop to airport for back to dac.`,
    //     Price: '৳ 45900',
    //     Duration: '4 Nights/ 5 Days'
    //   },
    //   {
    //     image: 'https://i.ibb.co/4Ks4Bn0/singapore.jpg',
    //     name: 'Singapore and Sentosa Tour Package',
    //     decription: `Airport pick from hkt airport. Drop at mentioned hotel.Hotel check in& rest stay over night. Having breakfast, wait for our represantative at hotel lobby& go for santosa island tour .Back to hotel after tour & stay over night at hotel. Having breakfast check out from hotel. Wait in lobby as per mentioned confirmation time drop to airport for go to dac.`,
    //     Price: '৳ 45900',
    //     Duration: '2 Nights/ 3 Days'
    //   },
    // ]

    // const result = await packageCollection.insertMany(packages);
    // console.log(`${result.insertedCount} documents were inserted`);



    // send all packages GET API
    app.get('/packages', async (req, res) => {
      const cursor = packageCollection.find({});
      const packages = await cursor.toArray();
      res.send(packages)
    })

  }
  finally {
    // await client.close();
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})