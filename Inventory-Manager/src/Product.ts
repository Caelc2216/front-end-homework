

export interface Product {
    id:number
    name:string
    price:number
    quantity:number
    category:ProductCategory
    description?:string
}

export type ProductCategory = "Electronics" | "Clothing" | "Food" | "Other"


export function displayProduct(product: Product)
{
    let description:string
    if (product.description == null)
    {
        description = "No description available"
    }
    else
    {
        description = product.description
    }
    console.log(
        `${product.name} 
Price: $${product.price.toFixed(2)}
Quantity: ${product.quantity}
Category: ${product.category}
Description: ${description}\n`
    )
}