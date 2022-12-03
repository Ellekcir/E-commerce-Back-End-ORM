// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      Validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

// Product

// id✔
// Integer
// Doesn't allow null values
// Set as primary key
// Uses auto increment

// product_name✔
// String
// Doesn't allow null values

// price
// price: {
//   type: DataTypes.DECIMAL,
//   allowNull: false,
//   validate: {
//     isDecimal: true,
//   }
// }
// Decimal
// Doesn't allow null values
// Validates that the value is a decimal

// stock
// stock: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   defaultValue: 10,
//   validate: {
//     isNumeric: true
//   }

// }
// Integer
// Doesn't allow null values
// Set a default value of 10
// Validates that the value is numeric

// category_id
// catergory_id: {
//   type: DataTypes.INTEGER,
//   references: {
//   model: 'catergory',
//     key: 'id'

// //   }
// // }
// Integer
// References the category model's id

//===========================================================
// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.

// Category has many Product models.

// Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.

// Tag belongs to many Product models.
// Make sure you set up foreign key relationships that match the column we created in the respective models.