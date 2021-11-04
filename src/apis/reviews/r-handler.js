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
        const reviews = await Review.create({
          ...req.body, 
          productId:req.params.id
        })
  
      res.send(reviews);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const getById = async (req, res, _next) => {
    try {
      const reviews = await Review.findByPk(req.params.id)

        res.send(reviews);

    } catch (error) {
      res.status(400).send(error.message);
    }
  };


  
  const updateReviewById = async (req, res, next) => {
    try {
   const updatedReview =  await Review.update(
            { ...req.body },
            {
              where: {
                id: req.params.id,
              },
              returning: true,
            }
          );
      res.send(updatedReview);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  const deleteReviewById = async (req, res, next) => {
    try {
        const review = await Review.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.send({ review });
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