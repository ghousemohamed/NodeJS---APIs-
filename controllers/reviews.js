const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get reviews
// @route       GET /api/v1/review
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      PUBLIC

exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
      const reviews = await Review.find({ bootcamp: req.params.bootcampId });
  
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  });

// @desc        Get a single reviews
// @route       GET /api/v1/review/:id
// @access      PUBLIC

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!review) {
        return next(new ErrorResponse('No reivew found with the given ID'), 404);
    }

    res.status(200).json({
        success: true,
        data: review
    })
  });