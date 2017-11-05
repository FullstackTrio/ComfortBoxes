module.exports = {
  createBoxInShoppingCart,
  removeBoxFromShoppingCart,
  addProductToBox,
  removeAllOfThisProductFromBox,
  removeOneInstanceOfProductFromBox,
  changeCurrentBox,
  getCopyOfTempShoppingCart,  //all boxes, including those not completed
  getCopyOfShoppingCart, //only boxes that have been completed
  completeBox,
  clearCart
}

/*
ITEMS IN STORAGE:

localStorage.numberOfBoxes
localStorage.currentBoxId
localStorage.completedBoxIds

POSSIBLE EXAMPLES OF localStorage.box{x}ProductIds
localStorage.box1ProductIds
localStorage.box2ProductIds
localStorage.box3ProductIds
*/

/*
NOTES FOR LOCAL STORAGE KEYS FORMATTED AS 'box{x}ProductIds':
(example: 'box1ProductIds')
Value of each of these keys is a list of the productIds that box holds, formatted as a string. Ex: '14,7,12,8'.
Each time a new box is added, createBoxInShoppingCart() adds a new box{x}ProductIds localStorage key, with x being equal to:
 (Number(localStorage.getItem('numberOfBoxes'))) +1
*/

//'Creates' a box in the shopping cart & makes that box the 'currentBox':
function createBoxInShoppingCart(){
  let boxId = 1 + (Number(localStorage.getItem('numberOfBoxes')));
  localStorage.setItem(`box${boxId}ProductIds`, '')
  localStorage.setItem('numberOfBoxes', boxId);
  localStorage.setItem('currentBoxId', boxId)
}

//Stores the product in currently selected box:
function addProductToBox(productId) {
  const currentBoxId = localStorage.getItem('currentBoxId');
  const currentProducts = localStorage.getItem(`box${currentBoxId}ProductIds`);
  if (currentProducts){
    localStorage.setItem(`box${currentBoxId}ProductIds`, `${currentProducts},${productId}`);
  } else {
    localStorage.setItem(`box${currentBoxId}ProductIds`, productId);
  }
}

//removes entire box from temp shopping cart and from official shopping cart if was added to it
function removeBoxFromShoppingCart(boxId) {
  localStorage.removeItem(`box${boxId}ProductIds`);
  if (boxId == localStorage.currentBoxId){
    localStorage.setItem('currentBoxId', '')
  }
  const cart = getCopyOfShoppingCart();
  if (cart.boxId) {
    const completedBoxIds = localStorage.getItem('completedBoxIds');
    const newCompletedBoxIds = completedBoxIds.split(',')
    .filter((id) => id != boxId)
    .join(',');
    localStorage.setItem('completedBoxIds', newCompletedBoxIds);
  }
}

//removes all quantities of this product from this box
function removeAllOfThisProductFromBox(productId, boxId) {
  if (!boxId){
    boxId = localStorage.getItem('currentBoxId');
  }
  const productsInBox = localStorage.getItem(`box${boxId}ProductIds`);
  const productsSansTheRemoved = [];
  productsInBox.split(',').forEach(id => {
    if (id != productId) {
      productsSansTheRemoved.push(id)
    }})
  localStorage.setItem(`box${boxId}ProductIds`, productsSansTheRemoved);
}

//removes only one quantity of this product from this box
function removeOneInstanceOfProductFromBox(productId, boxId) {
  if (!boxId) {
    boxId = localStorage.getItem('currentBoxId');
  }
  const productsInBox = localStorage.getItem(`box${boxId}ProductIds`);

  const length = ('' + productId).length + 1
  const index = productsInBox.indexOf(productId) - 1
  if (productsInBox.length > length - 1){
    if (index > 0) {
      localStorage.setItem(`box${boxId}ProductIds`, productsInBox.slice(0, index) + productsInBox.slice(index + length));
    } else {  //if it's the first item in list
      localStorage.setItem(`box${boxId}ProductIds`, productsInBox.slice(length + 1));
    }
  } else {
    //if removing only item left in box, remove box from cart
    removeBoxFromShoppingCart(boxId);
  }
}

//changes current box so that added items will add to this box
// (run when customer selects a different previously created box to edit)
function changeCurrentBox(newCurrentBoxId) {
  localStorage.setItem('currentBoxId', newCurrentBoxId);
}


/* returns object version of the temp shopping cart
(temp meaning all boxes that have been started are included--
  not just those that have been completed),
  (but note that it's only a representation of what is being stored,
  modifications to this object will not affect temp shopping cart in local storage)
*/
function getCopyOfTempShoppingCart() {
  let cart = {};
  const idsUsed = Number(localStorage.getItem('numberOfBoxes'));
  for (let i = 1; i <= idsUsed; i++) {
    const str = localStorage.getItem(`box${i}ProductIds`)
    if (str) {
      const strProductArray = str.split(',');
      const productIdArray = strProductArray.map(productId => Number(productId))
      cart[i] = productIdArray;
    }
  }
  return cart;
}
/* example of possible cart return object from getCopyOfShoppingCart() or getCopyOfTempShoppingCart():
{
  1: [12, 14, 8, 2, 19, 12],  // note that product ids may be repeated if customer purchased more than one of that item for that box
  3: [18, 6, 3, 24, 11],
  4: [22, 20, 7, 13, 9, 17, 18, 4]
}
  NOTE: The keys in the object are the box ids that exist in the cart. These are typically incremental from one, unless a customer has removed a box from their order (such as box 2 in the example object). The values of those keys are arrays of the productIds within that particular box.
*/

/* returns object version of the official shopping cart
(official meaning only boxes that have been completed are included--
  not any of those that have been started but not completed),
  (but note that it's only a representation of what is being stored,
  modifications to this object will not affect official shopping cart in local storage)
*/

function getCopyOfShoppingCart() {
  let cart = {};
  const completedBoxIds = localStorage.getItem('completedBoxIds');

  let completedBoxIdsArray = [];
  if (completedBoxIds){
    completedBoxIdsArray = completedBoxIds.split(',').map(boxId => {
      return Number(boxId)
    })
  }
  completedBoxIdsArray.forEach((boxId) => {
    const str = localStorage.getItem(`box${boxId}ProductIds`)
    if (str) {
      const strProductArray = str.split(',');
      const productIdArray = strProductArray.map(productId => Number(productId))
      cart[boxId] = productIdArray;
    }
  })
  return cart;
}

function completeBox() {
  const currentBoxId = localStorage.getItem('currentBoxId')
  if (localStorage.getItem('completedBoxIds')) {
    const completedBoxIds = localStorage.getItem('completedBoxIds')
    localStorage.setItem('completedBoxIds', completedBoxIds + ',' + currentBoxId)
  } else {
    localStorage.setItem('completedBoxIds', currentBoxId)
  }
}

function clearCart(){
  localStorage.clear()
  localStorage.setItem('numberOfBoxes', '0');
  localStorage.setItem('currentBoxId', '');
}
