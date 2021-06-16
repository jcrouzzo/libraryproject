function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id)
}

function findBookById(books, id) {
  return books.find((book) => book.id == id)
}

function partitionBooksByBorrowedStatus(books) {
  borrowed = books.filter(({borrows}) => borrows[0].returned == false)
  returned = books.filter(({borrows}) => borrows[0].returned == true)
  return [borrowed, returned]
  }
  


function getBorrowersForBook(book, accounts) {
  return book.borrows.map((item) => {
    let accountData = accounts.find((account) => account.id == item.id)
    let _item = {...item, ...accountData}
    return _item
  }).slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
