export default function groupByBrandAndPrice(products) {
    return products.reduce((brandGroups, product) => {
        const { brand, price } = product;

        // If the brand doesn't exist in our groups, create it
        if (!brandGroups[brand]) {
            brandGroups[brand] = {};
        }

        // Convert price to string to use as object key
        const priceKey = price.toString();

        // If the price doesn't exist for this brand, create an array for it
        if (!brandGroups[brand][priceKey]) {
            brandGroups[brand][priceKey] = [];
        }

        // Add the product to the appropriate brand and price group
        brandGroups[brand][priceKey].push(product);

        return brandGroups;
    }, {});
};