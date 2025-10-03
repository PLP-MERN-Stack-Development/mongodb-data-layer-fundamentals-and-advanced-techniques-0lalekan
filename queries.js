const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    // connect to mongodb server
    await client.connect();
    console.log('Connected to MongoDB server')

    // get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Task 2: basic CRUD operations
    
    // all books in a specific genre
    const fictionBooks = await collection.find({genre: "Fiction"}).toArray();
    console.log('Fictions Books:', fictionBooks);

    // books published after a certain year
    const recentBooks = await collection.find({published_year: {$gt: 1950}}).toArray();
    console.log('Books published after 1950:', recentBooks);    

    // books by a specific author
    const authorBooks = await collection.find({author: "J.R.R. Tolkien"}).toArray();
    console.log('Books by J.R.R. Tolkien:', authorBooks);

    // update the price of a specific book
    const updatePrice = await collection.updateOne(
      {title: 'Animal Farm'},
      {$set: {price: 11.90}}
    );
    console.log( "Price of Animal Farm has been updated.")

    //delete a book by its title
    const deleteBook = await collection.deleteOne({title: 'The Great Gatsby'});
    console.log('The Great Gatsby has been deleted.')

    // Task 3: advance queries

    // find books in stock and publish after 2010
    const inStockRecentBooks = await collection.find({in_stock: true, published_year: {$gt: 2010}}).toArray();
    console.log('In-stock books published after 2010:', inStockRecentBooks);

    // projection to return only title, author and price fields
    const projectedBooks = await collection.find({}, {projection: {title: 1, author: 1, price: 1, _id: 0}}).toArray();
    console.log('Books with only title, author and price fields:', projectedBooks);

    // sort books bt price both asc order and desc order
    const sortedBooksAsc = await collection.find({}).sort({price: 1}).toArray();    // asc
    console.log('Books sorted by price in ascending order:', sortedBooksAsc);

    const sortedBooksDesc = await collection.find({}).sort({price: -1}).toArray();   // desc
    console.log('Books sorted by price in descending order:', sortedBooksDesc);

    // limit and skip to implement pagination (5 book per page)
    const page = 1;
    const pageSize = 5;

    const paginatedBooks = await collection.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    console.log(`Books on page ${page}:`, paginatedBooks);


    // Task 4: aggregation pipeline

    // aggregation pipeline to calculate the average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log('Average price of books by genre:', avgPriceByGenre);
    
    // aggregation pipeline to fine author with the most books
    const authorWithMostBooks = await collection.aggregate([
      { $group: { _id: "$author", bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('Author with the most books:', authorWithMostBooks);

    // pipeline that groups books by publication decade and counts them
    const booksByDecade = await collection.aggregate([
      { $group: {
          _id: { $subtract: [
            "$published_year", { $mod: [ "$published_year", 10 ] }
          ] },
          count: { $sum: 1 } 
        }
      },
      { $sort: { _id: 1 } }]).toArray();
    console.log('Books grouped by publication decade:', booksByDecade);


    // Task 5: Indexing

    // index on the title field
      await collection.createIndex({title: 1});
      console.log('Index created on title field');

    // compound index on author and published_year
      await collection.createIndex({author: 1, published_year: -1});
      console.log('Compound index created on author and published_year fields');

    // explain to demostrate the perfomance improvement with the indexes
    const explainResult = await collection.find({author: "Jane Austen"})
    .sort({published_year: -1})
    .explain("executionStats");
    console.log('Explain output for query with index:', explainResult);


  } catch (error) {
    console.error('Error running queries:', error);
  } finally {
    // close the connection
    await client.close();
    console.log('Connection closed')
  }
}


// run the script
runQueries().catch(console.error);