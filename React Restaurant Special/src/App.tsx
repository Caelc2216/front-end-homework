import './App.css';


function App() {

  class MenuItem {
    name: string
    price: number
    ratings: number[]
    ingredients: string[]
    description: string

    constructor(name: string, price: number, decription: string, ingredients: string[]) {
      this.name = name;
      this.price = price;
      this.ratings = []
      this.description = decription
      this.ingredients = ingredients
    }

    addRating(rating: number) {
      this.ratings.push(rating)
    }
  }

  let item1 = new MenuItem("Mystery Burger", 12.99,"A suspiciously delicious burger, see if you can catch what it is", ["Who knows", "Some kind of meat (we hope)", "Tase it and you tell me"])

  const restaurantName: string = "Craig's Cafe";
  const mealName: string = item1.name;
  const price: number = item1.price;
  const quantity: number = 2;

  function calculate_price(price: number, quantity: number) {
    return price * quantity
  }

  function order() {
    alert("Your order has been placed!")
  }

  return (

    <>
      <h1 className="restaurantName">{restaurantName}</h1>
      <p>
        <span className='special'>{mealName}</span>: {'$'}{price}</p>
      <p>{item1.description}</p>
      <br></br>
      <p>Quantity: {quantity}</p>
      <p>Total: ${calculate_price(price, quantity)}</p>
      <div>
        <button className="orderBTN" onClick={order}>Order</button>
        <button className="ingredientsBTN" onClick={() => alert(`Ingredients are ${item1.ingredients}`)}>View Ingredients</button>
        <button className='reviewBTN' onClick={() => alert("Rating added")}>Leave Review</button>
      </div>
    </>
  )
}

export default App;