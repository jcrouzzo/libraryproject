function findAccountById(accounts, id) {
  return accounts.find((account) => account.id==id)
}

function sortAccountsByLastName(accounts) {
  let output = [...accounts]
  return output.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1: -1)
}

function getTotalNumberOfBorrows(account, books) {
  //returns a NUMBER that is a total count
  //count is all times provided account ID appears in any books of the borrowed array
  //Reduce methodology
  //iterate through every book in books and acc will be total matches of account.id

  return books.reduce((tb, book) =>{
    if (book.borrows.some((item) => item.id === account.id)) tb++;
    return tb}, 0)
  //return totalBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  //get account id to check for and create an array for output
  const accountId = account.id;
  return books.filter((book) => book.borrows[0].id == accountId && book.borrows[0].returned == false).map((book) => {
    book.author =  authors.find((author) => author.id == book.authorId)
    return book
  })
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
