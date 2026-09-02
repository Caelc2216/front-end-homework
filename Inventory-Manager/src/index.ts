import type {Product} from "./Product"
import { displayProduct } from "./Product"
import { findByCategory, findLowStock, calculateInventoryValue } from "./Inventory"

const products: Product[] = []
products.push({id: 1, name: "Mt. Dew", price: 8.00, quantity: 4, category: "Food", description: "12 pack of Mt. Dew"})
products.push({id: 2, name: "Chicken Patties", price: 7.00, quantity: 2, category:"Food"})
products.push({id: 3, name: "Samsung 1TB SSD", price: 100.00, quantity:1, category: "Electronics"})
products.push({id: 4, name: "Bicycle Playing Cards", price: 5.00, quantity: 2, category:"Other", description: "Red Bicycle Playing Cards"})
products.push({id: 5, name: "Shorts", quantity: 4, price: 10.00, category: "Clothing"})
products.push({id: 6, name: "Xbox Controller", price: 64.10, quantity: 3, category: "Electronics"})

function displayInventory()
{
    console.log(`=== Inventory ===`)
    products.forEach(element => {
        displayProduct(element)
    });
}
displayInventory()

console.log(`=== Inventory value ===`)
console.log(`${calculateInventoryValue(products)}\n`)

findLowStock(products, 2)

findByCategory(products, "Electronics")









