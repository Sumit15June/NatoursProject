const User = require('../models/userModel');
const AppError = require('../utils/appError');
const userController = require('../controllers/userController');

const mockRequest = () => {
  const req = {}
  req.body = jest.fn().mockReturnValue(req)
  req.params = jest.fn().mockReturnValue(req)
  return req;
}

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

const mockedUser = {
  "status": "success",
  "data": {
    "doc": {
      "role": "user",
      "_id": "5c8a1dfa2f8fb814b56fa181",
      "name": "Lourdes Browning",
      "email": "loulou@example.com",
      "photo": "user-2.jpg",
      "__v": 0
    }
  }
}

describe('shows the details of user by user id', () => {
  jest.setTimeout(1000);

  it("should return data of user when id param is provided  ", async () => {
    const req = mockRequest();
    const res = mockResponse()
    req.params.id = "5c8a1dfa2f8fb814b56fa181"

    User.findById = jest.fn().mockResolvedValue(mockedUser)

    await userController.getUser(req, res)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedUser);
  });

  // it("should not return data of user when id param is provided wrong  ", async () => {
  //   const req = mockRequest();
  //   const res = mockResponse()
  //   req.params.id = "5c8a1dfa2f8fb814b56fa181"

  //   User.findById = jest.fn().mockResolvedValue(null)

  //   await userController.getUser(req, res)
  //   let error = new AppError('No tour found with that id', 404);

  //   expect(error.statusCode).toBe(404);
  //   expect(error.status).toBe('fail');
  // });

});

const mockedAllUsers = {
  "status": "success",
  "results": 2,
  "data": {
    "data": [
      {
        "role": "user",
        "_id": "5c8a211f2f8fb814b56fa188",
        "name": "Cristian Vega",
        "email": "chris@example.com",
        "photo": "user-9.jpg"
      },
      {
        "role": "admin",
        "_id": "5c8a1d5b0190b214360dc057",
        "name": "Jonas Schmedtmann",
        "email": "admin@natours.io@gmail.com",
        "photo": "user-1.jpg"
        
      }
    ]
  }
}

describe('shows the details of user', () => {
  jest.setTimeout(1000);

  it("should return list of user's details", async () => {
    const req = mockRequest();
    const res = mockResponse()


    User.find = jest.fn().mockResolvedValue(mockedAllUsers)

    await userController.getAllUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(200);
  });
})

let mockedUpdateUser = {
  "status": "success",
  "data": {
    "data": {
      "role": "user",
        "_id": "5c8a211f2f8fb814b56fa188",
        "name": "Cristian Vega",
        "email": "chris@example.com",
        "photo": "user-9.jpg"
    }
  }
}


describe('shows the updated user ', () => {
  jest.setTimeout(1000);

  it("should return update details of user when id is provided", async () => {
    const req = mockRequest();
    const res = mockResponse()


    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockedUpdateUser)

    await userController.updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200);
  });
})


const
  mockDeleteUser = {
    "status": "success",
    "data": {
      "doc": {
        "role": "lead-guide",
        "active": true,
        "_id": "5c8a21d02f8fb814b56fa189",
        "name": "Steve T. Scaife",
        "email": "steve@example.com",
        "photo": "user-10.jpg",
        "password": "$2a$12$CokDfXtt8quyqSQJVAJmAuXRces3.IS4er1TyN6O6tyr0NKjZJ1h2",
        "__v": 0
      }
    }
  }



describe('delete user ', () => {
  jest.setTimeout(1000);

  it("should delete user when id is provided", async () => {
    const req = mockRequest();
    const res = mockResponse()
    req.params.id = "5c8a21d02f8fb814b56fa189"


    User.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeleteUser)

    await userController.deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200);
  });
})


const mockUpdateMe = {
  "status": "success",
  "data": {
    "user": {
      "role": "user",
      "_id": "611ccfb75f5a3e28708336a0",
      "name": "Sumit",
      "email": "sumitsaurabh15@gmail.com",
      "photo": "user-1.jpg",
      "__v": 0,
      "passwordChangedAt": "2021-07-28T05:45:30.476Z"
    }
  }
}


describe('update user ', () => {
  jest.setTimeout(1000);

  it("should return data of updated user", async () => {
    const req = mockRequest();
    const res = mockResponse()
    req.params.body = {
      "name": "Sumit",
      "email": "sumitsaurabh15@gmail.com"
    }

    User.findByIdAndDelete = jest.fn().mockResolvedValue(mockUpdateMe)

    await userController.updateMe(req, res)

    expect(res.status).toHaveBeenCalledWith(200);
  });
})







