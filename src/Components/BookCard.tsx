import { makeStyles, Body1, Caption1, Button, shorthands } from "@fluentui/react-components";
import { Card, CardFooter, CardHeader, CardPreview } from "@fluentui/react-components/unstable";
import React, { FC } from 'react';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import "./BookCard.css"
import Book from "../Models/Book";

const useStyles = makeStyles({
  card: {
    width: '12rem',
    maxWidth: '100%'
  }
});

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const styles = useStyles();
  return <Card className={styles.card}>
    <img src="https://picsum.photos/300/200" alt="Face of a person" />
    <strong className="max-two-line">{book.name}</strong>
    <span>{book.authorNames}</span>
    <h5 className="text-gradient">${book.mrp}</h5>
    <Button as="a" href={"/" + book.id}>View</Button>
  </Card >;
}
export default BookCard;