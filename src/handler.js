const {nanoid} = require('nanoid');
const books = require('./book');

const response = function(h,status,message,code){
    return h.response({
        status :status,
        message :message,
    }).code(code);
}

const insertedAt = new Date().toISOString();
const updateAt = insertedAt;

//post /books
postBook=(req,h)=>{
     var  bookss = req.payload;
      try{
            if(!bookss.name){
               return response(h,'fail','Gagal menambahkan buku. Mohon isi nama buku',400);
            }
            if(bookss.readPage>bookss.pageCount){
               return response(h,'fail','Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',400);
            }
            else {
                const id = nanoid(16);
                books.push({
                    id:id,
                    name : bookss.name,
                    year : bookss.year,
                    author: bookss.author,
                    finished:bookss.pageCount===bookss.readPage,
                    summary: bookss.summary,
                    publisher: bookss.publisher,
                    pageCount: bookss.pageCount,
                    readPage : bookss.readPage,
                    reading : bookss.reading,
                    insertedAt:insertedAt,
                    updateAt:updateAt
                });
   
                return h.response({
                    status :'success',
                    message :'Buku berhasil ditambahkan',
                    data:{
                       bookId:id
                    },
                }).code(201);
            }
      }
      catch(error){
        return response(h,'error','Buku gagal ditambahkan',500);
      }
},
//get /books
getBook=(req,h)=>{
    if(books.length<1){
        return h.response({
            status :'success',
            data:{
               books :[]
            },
           }).code(200);  
    }
    return h.response({
         status :'success',
         data:{
            books : books.map((b)=>({
                id: b.id,
                name :b.name,
                publisher:b.publisher
            })),
         },
        }).code(200);    
},
//get /books/{bookId}
getBookById=(req,h)=>{
    const{bookId,bookIdWithFinishedReading} = req.params;
    const book = books.filter(b=>b.id===bookId);
    book:{
        bookId,
        book.name,
        book.year,
        book.author,
        book.summary,
        book.publisher,
        book.pageCount,
        book.readPage,
        book.finished,
        book.reading,
        book.insertedAt,
        book.updateAt
    }
    try{
        if(bookId){
            if ( book.length>0){
                return h.response({
                    status :'success',
                    data:{book}
                }).code(200);
            }
            else{
                return response(h,'fail','Buku tidak ditemukan',404);
            }
        }
        if(bookIdWithFinishedReading){
            const book = books.filter(b=>b.finished==true&&b.id==bookIdWithFinishedReading);
            return h.response({
                status :'success',
                data:{book}
               }).code(200);
        }
  }
  catch(error){
        return response(h,'error',error.message,500);
  }
},
//put /books/{bookId}
editBookById=(req,h)=>{
    const{bookId} = req.params;
    const{name,year,author,summary,publisher,pageCount,readPage,reading} = req.payload;
    try{
        if(!name){
            return response(h,'fail','Gagal memperbarui buku. Mohon isi nama buku',400);
         }
        if(readPage>pageCount){
              return response(h,'fail','Gagal memperbarui buku, readPage tidak boleh lebih besar dari pageCount',400);
        }
        if(bookId){
            const cariBuku = books.filter(b=>b.id===bookId);
            if ( cariBuku.length>0){
                 const finished = pageCount===readPage;
                 const id = cariBuku.id;
                 var item ={id,name,year,author,summary,publisher,pageCount,readPage,
                        reading,finished,updateAt,insertedAt                       
                    };
                books.pop(cariBuku);
                books.push(item);
                 return h.response({
                        status :'success',
                        data: item,
                        message:'Buku berhasil diperbarui'
                }).code(200);
            }
            else{
                return response(h,'fail','Gagal memperbarui buku. Id tidak ditemukan',404);
            }
        }
    }
    catch(error){
        return response(h,'error',error.message,500);
    }
  },
//delete /books/{bookId}
deleteBook=(req,h)=>{
    const {bookId,bookIdWithFinishedReading} = req.params;
    try{
        if(bookId){
            const cariBuku = books.filter(b=>b.id===bookId);
            if ( cariBuku.length>0){
                books.pop(cariBuku);
                return h.response({
                    status :'success',
                    message:'Buku berhasil dihapus'
                }).code(200);
            }
            else{
                return response(h,'fail','Buku gagal dihapus.Id tidak ditemukan',404);
            }
        }
        if(bookIdWithFinishedReading){
            const cariBuku = books.filter(b=>b.finished==true&&b.id==bookIdWithFinishedReading);
            if ( cariBuku.length>0){
                books.pop(cariBuku);
                return h.response({
                    status :'success',
                    message:'Buku berhasil dihapus'
                }).code(200);
            }
        }
    }
    catch(error){
        return response(h,'error',error.message,500);
    }
  }
 module.exports={postBook,getBook,getBookById,editBookById,deleteBook} 