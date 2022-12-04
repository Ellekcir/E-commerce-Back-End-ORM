const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product,       
       attributes: ['id', 'product_name']
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//====================================================
// // GET all cards
// router.get('/', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.findAll({
//       include: [{ model: Reader }],
//     });
//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//====================================================


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});




//====================================================
// // GET a book
// router.get('/:isbn', (req, res) => {
//   // Get one book from the book table
//   Book.findOne(
//     {
//       // Gets the book based on the isbn given in the request parameters
//       where: { 
//         isbn: req.params.isbn 
//       },
//     }
//   ).then((bookData) => {
//     res.json(bookData);
//   });
// });


// // GET a single card
// router.get('/:id', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.findByPk(req.params.id, {
//       include: [{ model: Reader }],
//     });

//     if (!libraryCardData) {
//       res.status(404).json({ message: 'No library card found with that id!' });
//       return;
//     }

//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//====================================================

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body);
    try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
     req.body, {
      where: {
        id: req.params.id,
      }
     }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
 
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;



//====================CLASS EXAMPLE=================================================
// const router = require('express').Router();
// const { LibraryCard, Reader } = require('../../models');

// // GET all cards
// router.get('/', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.findAll({
//       include: [{ model: Reader }],
//     });
//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET a single card
// router.get('/:id', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.findByPk(req.params.id, {
//       include: [{ model: Reader }],
//     });

//     if (!libraryCardData) {
//       res.status(404).json({ message: 'No library card found with that id!' });
//       return;
//     }

//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // CREATE a card
// router.post('/', async (req, res) => {
//   try {
//     const locationData = await LibraryCard.create({
//       reader_id: req.body.reader_id,
//     });
//     res.status(200).json(locationData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // DELETE a card
// router.delete('/:id', async (req, res) => {
//   try {
//     const libraryCardData = await LibraryCard.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!libraryCardData) {
//       res.status(404).json({ message: 'No library card found with that id!' });
//       return;
//     }

//     res.status(200).json(libraryCardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

//============================================
// const router = require('express').Router();
// const Book = require('../../models/Book');

// // GET all books
// router.get('/', (req, res) => {
//   // Get all books from the book table
//   Book.findAll().then((bookData) => {
//     res.json(bookData);
//   });
// });

// // GET a book
// router.get('/:isbn', (req, res) => {
//   // Get one book from the book table
//   Book.findOne(
//     {
//       // Gets the book based on the isbn given in the request parameters
//       where: { 
//         isbn: req.params.isbn 
//       },
//     }
//   ).then((bookData) => {
//     res.json(bookData);
//   });
// });

// // Updates book based on its isbn
// router.put('/:isbn', (req, res) => {
//   // Calls the update method on the Book model
//   Book.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       title: req.body.title,
//       author: req.body.author,
//       isbn: req.body.isbn,
//       pages: req.body.pages,
//       edition: req.body.edition,
//       is_paperback: req.body.is_paperback,
//     },
//     {
//       // Gets the books based on the isbn given in the request parameters
//       where: {
//         isbn: req.params.isbn,
//       },
//     }
//   )
//     .then((updatedBook) => {
//       // Sends the updated book as a json response
//       res.json(updatedBook);
//     })
//     .catch((err) => res.json(err));
// });

// // Delete route for a book with a matching isbn
// router.delete('/:isbn', (req, res) => {
//   // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
//   Book.destroy({
//     where: {
//       isbn: req.params.isbn,
//     },
//   })
//     .then((deletedBook) => {
//       res.json(deletedBook);
//     })
//     .catch((err) => res.json(err));
// });
