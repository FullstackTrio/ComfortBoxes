const db = require('./server/db');
require('./server/db/models');
const Category = require('./server/db/models/category');
const Product = require('./server/db/models/product');
const User = require('./server/db/models/user');
const Order = require('./server/db/models/order');
const Review = require('./server/db/models/review');

const categories = [
  {
    title: 'Box',
    description: 'Choose which box type you would like your comforting items to be enclosed within.'
  },
  {
    title: 'Sight',
    description: 'What do you find most comforting to look at when you\'re in distress? Choose the visual items you would most like to see in your box.'
  },
  {
    title: 'Taste',
    description: 'Mmmm... Which tastes do you find most comforting? Choose the flavored items you would most like to have in your box.'
  },
  {
    title: 'Touch',
    description: 'Certain materials can be quite grounding. Choose the items you find most comforting to touch.'
  },
  {
    title: 'Sound',
    description: 'Music and sound have helped soothe people for centuries. Choose the sounds you would most like your box to be able to play to comfort you.'
  },
  {
    title: 'Smell',
    description: 'Calming, inspiring, balancing... smells give us some of our strongest associations with positive vibes. Select the smells you would most like to comfort you when you open your box.'
  }
]


const users = [
  {email: 'jorblgoo@joe.com', password: 'ruih3419r83y41W8r3y', isAdmin: true },
  {email: 'numphy@kex.com', password: 'cbphjds3812', isAdmin: true },
  {email: 'jim@magicness.com', password: 'equifbwejl3f5dmscsnds', isAdmin: true },
  {email: 'eternalfonz@man.com', password: 'fiekqubjwcdkwdnmflen2325', isAdmin: true },
  {email: 'minz@zorba.com', password: 'dycbJHjqdmbedk4nsj2', isAdmin: true },
  {email: 'test@test.com', password: '123', isAdmin: true }
]


const boxDescription = 'Boxes may be made of durable materials such as wood or metal, or of corrugated fiberboard, paperboard, or other non-durable materials. The size may vary from very small (e.g., a matchbox) to the size of a large appliance. A corrugated box is a very common shipping container. When no specific shape is described, a box of rectangular cross-section with all sides flat may be expected, but a box may have a horizontal cross section that is square, elongated, round or oval; sloped or domed top surfaces, or vertical edges.'


  // Boxes

const boxProducts = [
  {title: 'Jade Butterfly Box', price: 15, description: boxDescription, img: '/img/box/1.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Eastern Connection Box', price: 12, description: boxDescription, img: '/img/box/2.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'The Contents Of My Heart Box', price: 17, description: boxDescription, img: '/img/box/3.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Pleasing Pastel Box', price: 13, description: boxDescription, img: '/img/box/4.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Geometric Comfort Box', price: 10, description: boxDescription, img: '/img/box/5.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Hexagon Hat Box', price: 10, description: boxDescription, img: '/img/box/6.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Nature Is Texture Box', price: 22, description: boxDescription, img: '/img/box/7.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Node Star Box', price: 15, description: boxDescription, img: '/img/box/8.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Violet Butterfly Box', price: 15, description: boxDescription, img: '/img/box/9.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Lilac With Love Box', price: 18, description: boxDescription, img: '/img/box/10.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Wooden Wonders Box', price: 18, description: boxDescription, img: '/img/box/11.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Back To Basics Box', price: 8, description: boxDescription, img: '/img/box/12.jpg', inventoryQuantity: Math.floor(Math.random() * 100)}
]

  // Sights

const sightProducts = [
  {title: 'Mischievous Monkey Print', price: 7, description: 'Monkey loves to play. Look at Monkey and remember to be cheeky!', img: '/img/sight/1.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Cherry Blosson Sunset Print', price: 9, description: 'Admire the myriad colors of the sunset', img: '/img/sight/2.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Animal Meagerie Print', price: 5, description: 'Animals of the forest', img: '/img/sight/3.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Sea Turtle Print', price: 9, description: 'Sea turtle in shades of violet, aquamarine and light blue. Admire him/her swimming along.', img: '/img/sight/4.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Floating Flowers Print', price: 8, description: 'Pure, effervescent flowers. Watch them waft in the wind.', img: '/img/sight/5.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Watchful Deer Print', price: 8, description: 'He\'s keeping his eye on you. Keep him in your box as a reminder of quiet and mindfulness in nature', img: '/img/sight/6.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Ecstatic Owlie Print', price: 6, description: 'That is one happy owl - he can barely contain himself. Put him in your box and share in his boundless joy!', img: '/img/sight/7.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'She Sells, Sea Shells Print', price: 7, description: 'Admire the mother of pearl tones on this hand sketched shell print.', img: '/img/sight/8.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Dina The Dino Print', price: 4, description: 'Meet Dina. She just doesn\'t care. Share in her chilled out vibe and let go of your cares and worries.', img: '/img/sight/9.jpg', inventoryQuantity: Math.floor(Math.random() * 100)}
]

  // Smells

const smellProducts = [
  {title: 'Berry-Scented Candle', price: 8, description: 'This scent is berry delicious', img: '/img/smell/1.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Cherry Blossom Perfurme', price: 13, description: 'Spray and step into the cherry blossom grove', img: '/img/smell/2.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Lavendar Pot Pourri', price: 8, description: 'Luxuriate in the luscious scent of lavendar', img: '/img/smell/3.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Lemongrass Scented Oil', price: 11, description: 'It\'s not lemon, it\'s not grass - it\'s lemongrass. And it smells fantastic!', img: '/img/smell/4.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Mint Scent', price: 9, description: 'Mint is the best. (Obviously.)', img: '/img/smell/5.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'White Rose Scent', price: 8, description: 'A rose by any other name would smell better in your box', img: '/img/smell/6.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Sweet Cinammon Stick', price: 7, description: 'Let festive, calming cinammon scent spice up your day', img: '/img/smell/7.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
  {title: 'Vish Vanilla Candle', price: 9, description: 'Sweeten your world with this magical vanilla candle.', img: '/img/smell/8.jpg', inventoryQuantity: Math.floor(Math.random() * 100)},
]

let touchCount = 0

 // Touches
 const touchProducts = ['Metallic Paint On A Page', 'Smooth Black Stone', 'Gold Foil', 'Angelite Stone', 'Translucent Quartz', 'Recycled Paper Texture', 'Silky Jasper', 'Rough Jasper'].map(title => {
  touchCount += 1
  return {title: title, price: Math.floor(Math.random() * 15) + 4, description: title + ' feels great to touch! You shoud totally add this to your box!', img: '/img/touch/' + touchCount.toString() + '.jpg', inventoryQuantity: Math.floor(Math.random() * 100)}
})


let imgCount = 0

  // Tastes
const tasteProducts = ['Chocolate Nibbles', 'Hibiscus Tea', 'Caramel Squares', 'Cinammon Crackers', 'Mint Tea', 'Choc-Covered Coffee Beans', 'Honey Roasted Peanuts', 'Fizzy Candy', 'Chai Loose Leaf'].map(title => {
  imgCount += 1
  return {title: title, price: Math.floor(Math.random() * 4) + 4, description: title + ' is so delicious. You shoud totally add this to your box!', img: '/img/taste/' + imgCount.toString() + '.jpg', inventoryQuantity: Math.floor(Math.random() * 100)}
})


  // Sounds
const soundProducts = ['Calming', 'Magical', 'Soothing', 'Ethereal', 'Yoga', 'Trancey', 'Peppy', 'Rockful'].map(adj => {
  return {title: adj + ' Music', price: 4, description: 'The most ' + adj[0].toLowerCase() + adj.slice(1) + ' music in the world.', img: '/img/sound/sound.png', inventoryQuantity: Math.floor(Math.random() * 100)}
})


const products = [ [...boxProducts], [...sightProducts], [...smellProducts], [...tasteProducts], [...soundProducts], [...touchProducts]]

const reviewContentArr = ['These people put the "uncomfortable" in comfort boxes', 'I sleep with this product under my pillow. Wonderful!', 'It\'s OK I guess', 'Some reviews are better than others', 'The rain in Spain stays mainly in the plains']

const reviews = reviewContentArr.map(reviewContent => {
  return {content: reviewContent}
})

const orders = [{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '234 Hey St',
  city: 'Los Angeles',
  state: 'CA',
  email: 'ttt@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '3445 Hope St',
  city: 'San Francisco',
  state: 'CA',
  email: 'tartr@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '1133 Lafayette St',
  city: 'San Diego',
  state: 'CA',
  email: 'aerhg@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '89754 Wilshire St',
  city: 'Los Angeles',
  state: 'CA',
  email: 'wtrbh@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '234 Hey St',
  city: 'Seattle',
  state: 'WA',
  email: 'yuts@gmail.com'
}]
// for (var i = 0; i < 5; i++) {
//   orders.push({status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)]})
// }


let seededBoxProducts, seededSightProducts, seededSmellProducts, seededTouchProducts, seededTasteProducts, seededSoundProducts, seededCategories


// The seeding promise chain that just won't quit.

const seed = () =>

//Products

  Promise.all(boxProducts.map(boxProduct =>
    Product.create(boxProduct)
  ))
  .then((createdBoxProducts) =>
    seededBoxProducts = createdBoxProducts
  )
  .then(() =>
    Promise.all(sightProducts.map(sightProduct =>
    Product.create(sightProduct)
    ))
  )
  .then((createdSightProducts) =>
    seededSightProducts = createdSightProducts
  )
  .then(() =>
    Promise.all(smellProducts.map(smellProduct =>
    Product.create(smellProduct)
    ))
  )
  .then((createdSmellProducts) =>
    seededSmellProducts = createdSmellProducts
  )
  .then(() =>
    Promise.all(tasteProducts.map(tasteProduct =>
    Product.create(tasteProduct)
    ))
  )
  .then((createdTasteProducts) =>
    seededTasteProducts = createdTasteProducts
  )
  .then(() =>
    Promise.all(touchProducts.map(touchProduct =>
    Product.create(touchProduct)
    ))
  )
  .then((createdTouchProducts) =>
    seededTouchProducts = createdTouchProducts
  )
  .then(() =>
    Promise.all(soundProducts.map(soundProduct =>
    Product.create(soundProduct)
    ))
  )
  .then((createdSoundProducts) =>
    seededSoundProducts = createdSoundProducts
  )

  // Users

  .then(() =>
    Promise.all(users.map(user =>
      User.create(user)
    ))
  )

  // Orders

  .then((createdUsers) =>
    Promise.all(orders.map(order =>
      createdUsers[Math.floor(Math.random() * createdUsers.length)].createOrder(order)
    ))
  )

  //Reviews is missing user and product detail, need to update for this.

  .then(() =>
    Promise.all(reviews.map(review =>
      Review.create(review)
    ))
  )

  .then(() =>
    Promise.all(categories.map(category =>
      Category.create(category)
    ))
  )
  .then((createdCategories) =>
    seededCategories = createdCategories
  )

// No error messages on product_category seeding, however it's swapping the id's when putting in the table. Need to troubleshoot this further

  .then(() =>
  Promise.all(seededBoxProducts.map(boxProduct =>
      boxProduct.addCategory(seededCategories[0], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSightProducts.map(sightProduct =>
      sightProduct.addCategory(seededCategories[1], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededTasteProducts.map(tasteProduct =>
      tasteProduct.addCategory(seededCategories[2], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededTouchProducts.map(touchProduct =>
      touchProduct.addCategory(seededCategories[3], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSoundProducts.map(soundProduct =>
      soundProduct.addCategory(seededCategories[4], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSmellProducts.map(smellProduct =>
      smellProduct.addCategory(seededCategories[5], { through: 'product_category' })
    ))
  )


const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
