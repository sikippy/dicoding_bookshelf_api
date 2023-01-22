const {postBook,getBook,getBookById,updateBook,deleteBook} = require ('./handler');
const routes=[
{
    method : 'POST',
    path: '/books',
    handler : postBook
},
{
    method : 'GET',
    path: '/books',
    handler : getBook
},
{
    method : 'GET',
    path: '/books/{bookId}',
    handler : getBookById
},
{
    method : 'PUT',
    path: '/books/{bookId}',
    handler : editBookById
},
{
    method : 'DELETE',
    path: '/books/{bookId}',
    handler : deleteBook
}
];

module.exports = routes;