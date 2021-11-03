import sequelize from "../../db/db.js";
import models from "../../db/models/index.js"

const { Product, Review } = models

const getAll = async (_req, res, _next) => {
    try {
      const reviews = await Review.findAll({ include: Product})
      res.send(reviews);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  
  const createReview = async (req, res, _next) => {
    try {
        const reviews = await Review.create(req.body)
  
      res.send(reviews);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const getById = async (req, res, _next) => {
    try {
      const reviews = await Review.findByPk(req.params.id)

      if (reviews.rows.length === 0) {
        res.status(400).send("Review not found");
      } else {
        res.send(reviews.rows);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


  
  const updateReviewById = async (req, res, next) => {
    try {
        const { comment, rate } = req.body;
      const reviews = await pool.query(
        "UPDATE reviews SET comment=$1,rate=$2,product_id=$3 WHERE id=$4 RETURNING *;",
        [comment, rate, req.params.id, req.params.reviewId]
      );
      res.send(reviews.rows[0]);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  const deleteReviewById = async (req, res, next) => {
    try {
      await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.reviewId]);
      res.status(204).send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  const reviewsHandler = {
    getAll,
    getById,
    createReview,
    updateReviewById,
    deleteReviewById,
  };
  
  export default reviewsHandler;