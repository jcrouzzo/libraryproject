function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length
}

// Helper function used for next 3 functions getMostCommonGenres, getMostPopularAuthors and GetMostPopularBooks
function _objectSort(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]) {
      return -1;
    } else if(obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  })
}

function getMostCommonGenres(books) {
  let count = books.reduce((obj, { genre })=> {
    if(obj[genre]){
      obj[genre] +=1
    } else {obj[genre] = 1}
    return obj }, {});
  const outputSorted = _objectSort(count);
  return outputSorted.map((name) => ({
    name, count: count[name]
  })).slice(0, 5)
}

function getMostPopularBooks(books) {

  const groupById = books.reduce((acc, { id, borrows })=> {
    acc[id] = borrows.length;
    return acc }, {});
  
  const outputSorted = _objectSort(groupById);
  return outputSorted.map((id) => {
    const { title: name } = books.find(({ id: bookId }) => bookId === id);
    return { name, count: groupById[id] };
  }).slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
    let count = books.reduce((obj, { authorId, borrows })=> {
    if(obj[authorId]){
      obj[authorId].push(borrows.length)
    } else {obj[authorId] = [borrows.length]}
    return obj }, {});
    //console.log(count)

    for(let id in count){
      const sum = count[id].reduce((countA, countB) => countA+countB, 0)
      count[id] = sum
    }
    const sorted = _objectSort(count)

    let arr = sorted.map((authorId) => 
    {
      const {name:{first, last}} = authors.find(({id}) => id === Number(authorId));
            let name = `${first} ${last}`;
            return {name, count: count[authorId]};}).slice(0,5)
    return arr
    }
    

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
