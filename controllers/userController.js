const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};



//to get my own details
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }



  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});


//delete my details
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});


//create a user/sign up
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

//Get a user
//exports.getUser = factory.getOne(User);
exports.getUser = async (req, res, next) => {
const user = await User.findById(req.params.id);
  if (!user) {
    return (new AppError('No user found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: user,
  });
};


exports.getAllUsers = factory.getAll(User);


//update a user
// Do NOT update passwords with this!
//exports.updateUser = factory.updateOne(User);
exports.updateUser=async(req,res)=>{
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if (!updatedUser) {
    
    return (new AppError('No user found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
}






//delete a user
//exports.deleteUser = factory.deleteOne(User);

exports.deleteUser=async(req,res)=>{
  const user = await Tour.findByIdAndDelete(req.params.id);
  if (!user) {
    
    return (new AppError('No user found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: user,
  });

}
