import React, { useEffect, useState, TouchEvent, FC } from 'react'
import Book from '../Models/Book'
import BookCard from './BookCard'
import './BookCarousel.css'

interface BookCarouselProps {
    books: Book[];
    show: number;
}

const BookCarousel: FC<BookCarouselProps> = ({ books, show }) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(books.length)
    // const [touchPosition, setTouchPosition] = useState(0)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(books.length)
    }, [books])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    // const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    //     const touchDown = e.touches[0].clientX
    //     setTouchPosition(touchDown)
    // }

    // const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    //     const touchDown = touchPosition

    //     if (touchDown === null) {
    //         return
    //     }

    //     const currentTouch = e.touches[0].clientX
    //     const diff = touchDown - currentTouch

    //     if (diff > 5) {
    //         next()
    //     }

    //     if (diff < -5) {
    //         prev()
    //     }

    //     setTouchPosition(0)
    // }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="position-relative left-arrow">
                        <div className='position-absolute top-50 start-50 translate-middle'>
                            {/* <ArrowLeft16Filled /> */}
                        </div>
                    </button>
                }
                <div className="carousel-content-wrapper">
                    {/* onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}> */}
                    <div className={`carousel-content show-${show}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                        {
                            books.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        }
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex < (length - show) &&
                    <button onClick={next} className="position-relative right-arrow">
                        <div className='position-absolute top-50 start-50 translate-middle'>
                            {/* <ArrowRight16Filled /> */}
                        </div>
                    </button>
                }
            </div>
        </div>
    )
};

export default BookCarousel