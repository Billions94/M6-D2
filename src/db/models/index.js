import User from "./user.js"
import Product from "./products.js";
import Review from "./reviews.js";
import Category from "./category.js";
import ProductCategory from "./productCategory.js"
import Cart from "./cart.js";

Product.hasMany(Review, { onDelete: 'CASCADE'})
Review.belongsTo(Product, { onDelete: 'CASCADE'})


User.hasMany(Review, { onDelete: 'CASCADE'})
Review.belongsTo(User, { onDelete: 'CASCADE'} )

Category.hasMany(Product, { onDelete: 'CASCADE'})
Product.belongsTo(Category, { onDelete: 'CASCADE'})

Product.belongsToMany(User, { through : { model: Cart, unique: false }})
User.belongsToMany(Product, { through : { model: Cart, unique: false }})

Product.hasMany(Cart) // Product.findAll({include: Cart})
Cart.belongsTo(Product)


User.hasMany(Cart); // User.findAll({include: Cart})
Cart.belongsTo(User);

// Product.belongsToMany(Category, 
//     { through: { model: ProductCategory, unique: false },
// })
// Category.belongsToMany(Product, {
//     through: { model: ProductCategory, unique: false },
// })






export default { User, Product, Review, Category, ProductCategory, Cart };