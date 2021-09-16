const User = require('./../models/userModel');
//const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
//const factory = require('./handlerFactory');
const APIFeatures = require('./../utils/apiFeatures');


//filtered Objects
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};



//To get my own details
exports.getMe = async (req, res, next) => {
  req.params.id="5c8a1d5b0190b214360dc057"
  const user = await User.findById(req.params.id);
  if (!user) {
    return (new AppError('No user found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: user,
  });
};


//Updation
exports.updateMe =(async (req, res, next) => {
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
  const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
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
exports.deleteMe = (async (req, res, next) => {
  req.params.id="611ccfb75f5a3e28708336a0"
  const user=await User.findByIdAndDelete(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: user
  });
});


//create a user/sign up
exports.createUser = (async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

//Get a user
//exports.getUser = factory.getOne(User);
exports.getUser = async (req, res, next) => {
  
 const user = await User.findById(req.params.id);
  if (!user) {
    return (new AppError('No user found with that id', 404));
  }
   res.status(201).json({
    status: 'success',
    data: user,
  });
};



//Get All users
//exports.getAllUsers = factory.getAll(User);
exports.getAllUsers=(async (req, res, next) => {
 

    const users=await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      //results: users.length,
      data: {
        data: users
      }
    });
  });





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
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    
    return (new AppError('No user found with that id', 404));
  }
   res.status(200).json({
    status: 'success',
    data: user,
  });

}


