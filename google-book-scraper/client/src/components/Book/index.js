import React from "react";
import { Row } from "../Grid";

export function UnsavedBook(props){
    // Creates new array containing only unsaed books using the filter method
    const notSaved = props.books.filter(book => !book.saved);

    return(
        <Row>
            {notSaved.map(book => (
                <div>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    <p>{book.link}</p>
                    <p>{book.img}</p>
                    <p>{book.saved}</p>
                </div>
            ))}
        </Row>
    );
};

export function SavedBook(props) {
    return(
        <Row>
            {props.books.map(book => (
                <div>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    <p>{book.link}</p>
                    <p>{book.img}</p>
                    <p>{book.saved}</p>
                </div>
            ))}
        </Row>
    );
}
