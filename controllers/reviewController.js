const Review = require('./../models/reviewModel');
//const factory = require('./handlerFactory');
 //const catchAsync = require('./../utils/catchAsync');
 const AppError = require('./../utils/appError');



exports.setReviewUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.review) req.body.review = req.params.reviewId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};




//get all reviews
exports.getAllReviews = async (req, res, next) => {
  
  const reviews = await Review.find(req.query);
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
};


//get a review
//exports.getReview = factory.getOne(Review, { path: 'reviews' });
exports.getReview = async (req, res, next) => {
  //we need to write populate in all query where there is find so we are creatinga middleware function
  const review = await Review.findById(req.params.id);
  if (!review) {
    return (new AppError('No review found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: review,
  });
};


//create a review
//exports.createReview = factory.createOne(Review);
exports.createReview = async (req, res, next) => {

  const newReview = await Review.create(req.body);
  res.status(201).json({
  status: 'success',
  data: {
  review: newReview,
  },
  });
  };




//updating a review
//exports.updateReview = factory.updateOne(Review);
exports.updateReview=async(req,res)=>{
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if (!review) {
    
    return (new AppError('No review found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: review,
  });
}


//Delete a review
//exports.deleteReview = factory.deleteOne(Review);
exports.deleteReview=async(req,res)=>{
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    
    return (new AppError('No review found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: review,
  });



}



//Get review Stats
exports.getReviewStats = (async (req, res, next) => {
  const stats = await Review.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numReviews: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});



//Get Monthly Plan
exports.getMonthlyPlan = (async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Review.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numReviewStarts: { $sum: 1 },
        reviews: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numReviewStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});



//Get review based on distance/lat n lang
// /reviews-within/:distance/center/:latlng/unit/:unit
// /reviews-within/233/center/34.111745,-118.113491/unit/mi
exports.getReviewsWithin = (async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const reviews = await Review.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      data: reviews
    }
  });
});


//Get distance
exports.getDistances = (async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitute and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Review.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});




