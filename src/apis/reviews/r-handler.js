import models from "../../db/models/index.js"

const { Product, Review } = models

const getAll = async (_req, res, _next) => {
    try {
      const reviews = await Review.findAll({ include: Product})
      res.send(reviews);
    } catch (error) {
      console.error(error)
      next(error)
    }
  };
  
  
  const createReview = async (req, res, _next) => {
    try {
        const reviews = await Review.create({
          text: req.body.text, 
          productId:req.params.productId,
          userId:req.params.userId
        })
  
      res.send(reviews);
    } catch (error) {
      console.error(error)
      next(error)
    }
  };

  const getById = async (req, res, _next) => {
    try {
      const reviews = await Review.findByPk(req.params.id)

        res.send(reviews);

    } catch (error) {
      console.error(error)
      next(error)
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
      console.error(error)
      next(error)
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
      console.error(error)
      next(error)
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