"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayProduct = displayProduct;
function displayProduct(product) {
    let description;
    if (product.description == null) {
        description = "No description available";
    }
    else {
        description = product.description;
    }
    console.log(`${product.name} 
Price: $${product.price.toFixed(2)}
Quantity: ${product.quantity}
Category: ${product.category}
Description: ${description}\n`);
}
//# sourceMappingURL=Product.js.map