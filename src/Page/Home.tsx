import React, { useEffect } from 'react';
import AppConstants from '../AppConstants';
import BookCard from '../Components/BookCard';
import BookCarousel from '../Components/BookCarousel';
import Book from '../Models/Book';


const Home = () => {
    const [name, setName] = React.useState('');

    // useEffect(() => {
    //     (
    //         // author api https://localhost:7207/api/authorapi/getauthor
    //         async () => {
    //             const token = localStorage.getItem('jwt');
    //             const response = await fetch('https://localhost:7207/api/authorapi/getauthor', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     "Authorization": `Bearer ${token}`
    //                 },
    //                 credentials: 'include'
    //             });
    //             const content = await response.json();
    //             // setName(content.name);
    //             console.log(content);
    //         }
    //     )();
    // });

    // books api https://localhost:7207/api/bookapi/getbooks
    // get all books and map to a list
    const [books, setBooks] = React.useState<Book[]>([]);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    useEffect(() => {
        (

            async () => {
                if (!isDataLoaded) {
                    const token = localStorage.getItem('jwt');
                    const response = await fetch(AppConstants.API_ENDPOINT + '/api/bookapi/getbooks', {
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authentication': `Bearer ${token}`
                        },
                        credentials: 'include'
                    });
                    const content = await response.json();
                    setBooks(content);
                    setIsDataLoaded(true);
                }
            }
        )();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className='text-gradient-purple-magenta'>Popular Books</h1>
                </div>
            </div>
            <div className='d-flex flex-wrap flex-row'>
                {/* <BookCarousel books={books} show={7} /> */}
                {
                    books.map((book) => {
                        return (
                            <div className='mb-2 me-2'>

                                <BookCard key={book.id} book={book} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Home;