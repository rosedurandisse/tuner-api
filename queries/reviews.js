const db = require("../db/dbConfig");

const getAllReviews = async () => {
  try {
    const reviews = await db.any("SELECT * FROM reviews");
    return reviews;
  } catch (err) {
    return err;
  }
};

//returning the review that matches anime id on the reviews table to the serial id in the anime table
const getSongReviews = async (id) => {
  try {
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE song_id = $1",
      id
    );

    return reviews;
  } catch (error) {
    return error;
  }
};

//returning one review based on the id on the review table
const getReview = async (id) => {
  try {
    const review = await db.one("SELECT * FROM reviews WHERE id = $1", id);
    return review;
  } catch (err) {
    return err;
  }
};

const newReview = async (review) => {
  try {
    const reviews = await db.any(
      "INSERT INTO reviews (song_id, reviewer, title, content, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        review.anime_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
      ]
    );
    return reviews;
  } catch (err) {
    return err;
  }
};

const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET song_id=$1, reviewer=$2, title=$3, content=$4, rating=$5 WHERE id=$6 RETURNING *",
      [
        review.anime_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        id,
      ]
    );
    return updatedReview;
  } catch (err) {
    return err;
  }
};

const deleteReview = async (id) => {
  try {
    const review = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      id
    );
    return review;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
  getSongReviews,
};
