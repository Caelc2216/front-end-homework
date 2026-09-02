"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInventoryValue = calculateInventoryValue;
exports.findLowStock = findLowStock;
exports.findByCategory = findByCategory;
function calculateInventoryValue(products) {
    let total = 0;
    products.forEach(element => {
        total += (element.price * element.quantity);
    });
    return `$${total.toFixed(2)}`;
}
function findLowStock(products, minimumQuantity) {
    console.log(`===LOW STOCK===`);
    products.forEach(element => {
        if (element.quantity < minimumQuantity) {
            console.log(`${element.name} - ${element.quantity} remaining`);
        }
    });
    console.log("");
}
function findByCategory(products, category) {
    console.log(`===${category}===`);
    products.forEach(element => {
        if (element.category == category) {
            console.log(`${element.name}`);
        }
    });
    console.log("");
}
//# sourceMappingURL=Inventory.js.map