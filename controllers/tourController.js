const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
//const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

//exports.getAllTours = factory.getAll(Tour);
exports.getAllTours = async (req, res, next) => {
  
  const tours = await Tour.find(req.query);
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};
//exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getTour = async (req, res, next) => {
  //we need to write populate in all query where there is find so we are creatinga middleware function
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return (new AppError('No tour found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: tour,
  });
};
//exports.createTour = factory.createOne(Tour);
exports.createTour = async (req, res, next) => {

  const newTour = await Tour.create(req.body);
  res.status(201).json({
  status: 'success',
  data: {
  tour: newTour,
  },
  });
  };


//updating a tour
//exports.updateTour = factory.updateOne(Tour);


exports.updateTour=async(req,res)=>{
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false
    //runValidators: true
  })
  if (!tour) {
    
    return (new AppError('No tour found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: tour,
  });
}



//exports.deleteTour = factory.deleteOne(Tour);
exports.deleteTour=async(req,res)=>{
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    
    return (new AppError('No tour found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: tour,
  });

}
exports.getTourStats = (async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
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

exports.getMonthlyPlan = (async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
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
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
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
      $sort: { numTourStarts: -1 }
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

// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = (async (req, res, next) => {
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

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});

exports.getDistances = (async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Tour.aggregate([
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
