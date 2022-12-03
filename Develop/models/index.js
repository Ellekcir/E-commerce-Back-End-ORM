// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: 'ProductTag',
  foreignKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: 'ProductTag',
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};


// Products are conected to the category by the category_id
//  {
//   product_name: 'Plain T-Shirt',
//   price: 14.99,
//   stock: 14,
//   category_id: 1,
// } 
// is connected to catergory 1 in the seeds:
// {
//   category_name: 'Shirts',
// },

// Category has many products which is also known to be the 'parent' again uses the category_id

// the product tag belongs to each other connecting data in ProductTag combining the product_id and tag_id into one