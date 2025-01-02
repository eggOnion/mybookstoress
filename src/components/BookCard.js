import React, { useEffect, useState } from "react";

import { fetchBooks } from "../services/fetchBooksAPI";
import AddReview from "./AddReview";
import DeleteReview from "./DeleteReview";

import "../styles/bookCard.css";

function BookCard() {
  const [books, setBooks] = useState([]); // Full list of books
  const [searchType, setSearchType] = useState("author");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Fetch all books on component load
  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    getBooks();
  }, []);

  // Filtered books based on search
  const filteredBooks = query
    ? Object.fromEntries(
        Object.entries(books).filter(([_, book]) =>
          searchType === "author"
            ? book.author.toLowerCase().includes(query.toLowerCase())
            : book.title.toLowerCase().includes(query.toLowerCase())
        )
      )
    : books;

  // Update reviews in the books list
  const updateBookReviews = (isbn, reviews) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      [isbn]: {
        ...prevBooks[isbn],
        reviews,
      },
    }));
  };

  return (
    <header>
      <section className="all-my-books">
        <h2>Welcome, {localStorage.getItem("username")}</h2>    
           
        {/* Search Box */}
        <div className="search-function-section">
          <label className="search-author-radio">
            <input
              style={{ color: "black" }}
              className="custom-radio"
              type="radio"
              value="author"
              checked={searchType === "author"}
              onChange={() => setSearchType("author")}
            />
            Search by Author
          </label>
          <label className="search-title-radio">
            <input
              className="custom-radio"
              type="radio"
              value="title"
              checked={searchType === "title"}
              onChange={() => setSearchType("title")}
            />
            Search by Title
          </label>
          <input
            style={{ borderRadius: "25px" }}
            className="search-function-section-textbox"
            type="text"
            placeholder={`Enter ${searchType}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>

        {/* Book List or Not Found Message */}
        {Object.keys(filteredBooks).length === 0 && query ? (
          <p style={{ fontWeight: "bold", color: "red" }}>Not Found</p>
        ) : (
          <ul className="bookcard-all">
            {Object.keys(filteredBooks).map((isbn) => (
              <div className="bookcard-individual">
                <li key={isbn}>
                  <div className="bookcard-individual-title">
                    <strong>
                      {filteredBooks[isbn].title}
                    </strong>{" "}
                  </div>
                  by{" "}
                  <p className="bookcard-individual-author">
                    {filteredBooks[isbn].author}
                  </p>
                  <div className="review-section">
                    <em>Reviews:</em>{" "}
                    {filteredBooks[isbn].reviews
                      ? Object.entries(filteredBooks[isbn].reviews).map(
                          ([user, review]) => (
                            <div key={user}>
                              <strong>{user}:</strong> {review}{" "}
                              {user === localStorage.getItem("username") && (
                                <DeleteReview
                                  isbn={isbn}
                                  username={user}
                                  onReviewDeleted={(reviews) =>
                                    updateBookReviews(isbn, reviews)
                                  }
                                />
                              )}
                            </div>
                          )
                        )
                      : "No reviews yet."}
                  </div>
                  <AddReview
                    isbn={isbn}
                    onReviewAdded={(reviews) =>
                      updateBookReviews(isbn, reviews)
                    }
                  />
                </li>
              </div>
            ))}
          </ul>
        )}
      </section>
    </header>
  );
}

export default BookCard;
