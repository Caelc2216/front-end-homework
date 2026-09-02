import type { Product } from "./Product";
import type {ProductCategory} from "./Product"


export function calculateInventoryValue(products:Product[]):string
{
    let total:number = 0
    products.forEach(element => {
        total += (element.price * element.quantity)
    });
    return `$${total.toFixed(2)}`
}

export function findLowStock(products:Product[], minimumQuantity:number)
{
    console.log(`===LOW STOCK===`)

    products.forEach(element => {
        if(element.quantity < minimumQuantity)
        {
            console.log(`${element.name} - ${element.quantity} remaining`)
        }
    });
    console.log("")
}

export function findByCategory(products:Product[], category:ProductCategory)
{
    console.log(`===${category}===`)
    products.forEach(element => {
        if (element.category == category)
        {
            console.log(`${element.name}`)
        }
    });
    console.log("")
}

