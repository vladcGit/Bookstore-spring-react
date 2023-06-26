import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../utils/SpinnerLoading";
import BookImage from "../../Images/BooksImages/book-luv2code-1000.png";
import { useParams } from "react-router-dom";
import { StarsReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import axios from "axios";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isReviewLeft, setisReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadngCurrentLoansCount, setIsLoadngCurrentLoansCount] =
    useState(true);

  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findBookById?bookId=${bookId}`;

      const responseReviews = await axios.get(reviewUrl);
      if (responseReviews.status !== 200) {
        throw new Error("Something went wrong");
      }

      const responseJsonReviews = responseReviews.data;

      const responseData = responseJsonReviews._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;
      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews += responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
        setReviews(loadedReviews);
        setIsLoadingReview(false);
      }
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (authState?.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans/count`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          },
        });
        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
        setCurrentLoansCount(res.data);
      }
      setIsLoadngCurrentLoansCount(false);
    };
    try {
      fetchUserCurrentLoansCount();
    } catch (error: any) {
      setIsLoadngCurrentLoansCount(false);
      setHttpError(error.message);
    }
  }, [authState, isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState?.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          },
        });

        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
        setIsCheckedOut(res.data);
        setIsLoadingBookCheckedOut(false);
      }
    };
    try {
      fetchUserCheckedOutBook();
    } catch (e: any) {
      setIsLoadingBookCheckedOut(false);
      setHttpError(e.message);
    }
  }, [authState]);

  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState?.isAuthenticated) {
        const url = `/api/reviews/secure/user/book?bookId=${bookId}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          },
        });
        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
        setisReviewLeft(res.data);
      }
    };
    try {
      fetchUserReviewBook();
    } catch (e: any) {
      setHttpError(e.message);
    }
    setIsLoadingUserReview(false);
  }, [authState]);

  if (
    isLoading ||
    isLoadingReview ||
    isLoadngCurrentLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `http://localhost:8080/api/books/secure/checkout?bookId=${book?.id}`;
    const res = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    setIsCheckedOut(true);
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }
    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    const url = "/api/reviews/secure";
    const res = await axios.post(url, reviewRequestModel, {
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    setisReviewLeft(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img
              src={book?.img || BookImage}
              width="226"
              height="349"
              alt="Book"
            />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            isAuthenticated={authState?.isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={book?.img || BookImage}
            width="226"
            height="349"
            alt="Book"
          />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentLoansCount={currentLoansCount}
          isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
