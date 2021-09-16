const UserController = require("../controllers/userController");
const AuthController=require("../controllers/authController")
const UserModel = require("../models/userModel");
const httpMocks = require("node-mocks-http");



jest.mock("../models/userModel");


let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});




MockUsersResponse = {
    "status": "success",
    "data": {
        "data": [
            {
                "role": "guide",
                "_id": "5c8a1f292f8fb814b56fa184",
                "name": "Leo Gillespie",
                "email": "leo@example.com",
                "photo": "user-5.jpg"
            },
            {
                "role": "user",
                "_id": "5c8a1dfa2f8fb814b56fa181",
                "name": "Lourdes Browning",
                "email": "loulou@example.com",
                "photo": "user-2.jpg"
            },
            {
                "role": "guide",
                "_id": "5c8a1f4e2f8fb814b56fa185",
                "name": "Jennifer Hardy",
                "email": "jennifer@example.com",
                "photo": "user-6.jpg"
            }


        ]
    }
}

//Test for getting all users


describe("UserController.getAllUsers", () => {
    it("should have a getAllUsers function", () => {
        expect(typeof UserController.getAllUsers).toBe("function");
    });
    it("should call Usermodel.find({})", async () => {
        await UserController.getAllUsers(req, res, next);
        expect(UserModel.find).toHaveBeenCalledWith();
    });
    it("should return response with status 200 and all users", async () => {
        UserModel.find.mockReturnValue(MockUsersResponse);
        await UserController.getAllUsers(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();


        expect(res._getJSONData().data.data).toStrictEqual(MockUsersResponse);
    });


});


//testing for get a user

MockGetUserResponse = {
    "status": "success",
    "data": {
        "doc": {
            "role": "guide",
            "_id": "5c8a1f292f8fb814b56fa184",
            "name": "Leo Gillespie",
            "email": "leo@example.com",
            "photo": "user-5.jpg",
            "__v": 0
        }
    }
}




describe("UserController.getUserById", () => {
    beforeEach(() => {
        req.params.id = "5c8a1f292f8fb814b56fa184"
    });
    it("should have a getUserById", () => {
        expect(typeof UserController.getUser).toBe("function");
    });
    it("should call UserModel.findById with route parameters", async () => {

        await UserController.getUser(req, res, next);

        expect(UserModel.findById).toBeCalledWith(req.params.id);
    });
    it("should return json body and response code 200", async () => {
        UserModel.findById.mockReturnValue(MockGetUserResponse);
        await UserController.getUser(req, res, next);
        expect(res.statusCode).toBe(201);

        expect(res._getJSONData().data).toStrictEqual(MockGetUserResponse);

        expect(res._isEndCalled()).toBeTruthy();
    });

});


mockDeleteUserResponse = {
    "status": "success",
    "data": {
        "doc": {
            "role": "user",
            "active": true,
            "_id": "5c8a1dfa2f8fb814b56fa181",
            "name": "Lourdes Browning",
            "email": "loulou@example.com",
            "photo": "user-2.jpg",
            "password": "$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..",
            "__v": 0
        }
    }

}

//Test for Deletion
describe("User  deletion", () => {
    beforeEach(() => {
        req.params.id = "5c8a1dfa2f8fb814b56fa181";
    });

    it("should have a delete User  function", () => {
        expect(typeof UserController.deleteUser).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {

        await UserController.deleteUser(req, res, next);
        expect(UserModel.findByIdAndDelete).toBeCalledWith(req.params.id);
    });
    it("should return 200 OK and delete the user model", async () => {
        UserModel.findByIdAndDelete.mockReturnValue(mockDeleteUserResponse);
        await UserController.deleteUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData().data).toStrictEqual(mockDeleteUserResponse);
        

        expect(res._isEndCalled()).toBeTruthy();
    });



});


MockUpdatedUserResponse={
    "status": "success",
      "data": {
          "data": {
              "role": "user",
              "_id": "5c8a20d32f8fb814b56fa187",
              "name": "Aliana",
              "email": "eliana@example.com",
              "photo": "user-8.jpg",
              "__v": 0
          }
      }
  }
  
   describe("UserController.updateUser", () => {
    beforeEach(() => {
        req.params.id = "5c8a20d32f8fb814b56fa187";
        req.body={
          "name":"Aliana"
        }
      });
  
  
  it("should have a updateUser function", () => {
    expect(typeof UserController.updateUser).toBe("function");
  });
  it("should update with UserModel.findByIdAndUpdate", async () => {
  
    await UserController.updateUser(req, res, next);
  
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, {
      new: true,
      runValidators: true
      
    });
  });
  it("should return a response with json data and http code 200", async () => {
     
  
    UserModel.findByIdAndUpdate.mockReturnValue(MockUpdatedUserResponse);
    await UserController.updateUser(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data).toStrictEqual(MockUpdatedUserResponse);
  });
  
  });


  //test for get me profile

  MockGetMeResponse={
    "status": "success",
    "data": {
        "doc": {
            "role": "user",
            "_id": "611ccfb75f5a3e28708336a0",
            "name": "Sumit",
            "email": "sumitsaurabh15@gmail.com",
            "photo": "user-1.jpg",
            "__v": 0
        }
    }
}

describe("UserController.getMe", () => {
    beforeEach(() => {
        req.params.id = "611ccfb75f5a3e28708336a0";
       
      });
  
  
  it("should have a getMe function", () => {
    expect(typeof UserController.getMe).toBe("function");
  });
  it("should update with UserModel.findByIdAndUpdate", async () => {
  
    await UserController.getMe(req, res, next);
  
    expect(UserModel.findById).toHaveBeenCalledWith(req.params.id);
  });
  it("should return a response with json data and http code 200", async () => {
     
  
    UserModel.findById.mockReturnValue(MockGetMeResponse);
    await UserController.getMe(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data).toStrictEqual(MockGetMeResponse);
  });
  
  });
  

  //test for delete me 

  mockDeletedUser={
    "status": "success",
    "data": {
        "doc": {
            "role": "user",
            "_id": "611ccfb75f5a3e28708336a0",
            "name": "Sumit",
            "email": "sumitsaurabh15@gmail.com",
            "__v": 0,
            "active": true,
           "password": "$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..",
           "photo": "user-2.jpg",
         
        }
    }
}


describe("User  delete me ", () => {
    beforeEach(() => {
        req.params.id = "5c8a1dfa2f8fb814b56fa181";
    });

    it("should have a delete Me  function", () => {
        expect(typeof UserController.deleteMe).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {

        await UserController.deleteMe(req, res, next);
        expect(UserModel.findByIdAndDelete).toBeCalledWith(req.params.id,{ active: false });
    });
    it("should return 200 OK and delete the user profile", async () => {
        UserModel.findByIdAndDelete.mockReturnValue(mockDeleteUserResponse);
        await UserController.deleteMe(req, res, next);
        expect(res.statusCode).toBe(204);
        expect(res._getJSONData().data).toStrictEqual(mockDeleteUserResponse);
        

        expect(res._isEndCalled()).toBeTruthy();
    });



});


describe("UserController.updateMe", () => {
    beforeEach(() => {
        req.params.id = "5c8a20d32f8fb814b56fa187";
        req.body={
          "name":"Aliana"
        }
      });
  
  
  it("should have a updateMe function", () => {
    expect(typeof UserController.updateMe).toBe("function");
  });
  it("should update with UserModel.findByIdAndUpdate", async () => {
  
    await UserController.updateMe(req, res, next);
  
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, {
      new: true,
      runValidators: true
      
    });
  });
  it("should return a response with json data and http code 200", async () => {
     
  
    UserModel.findByIdAndUpdate.mockReturnValue(MockUpdatedUserResponse);
    await UserController.updateMe(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data.user).toStrictEqual(MockUpdatedUserResponse);
    console.log(res._getJSONData());
  });
  
  });



  //Auth

  




CreatedMockUser = {
  "name": "sumit",
  "email": "sumitsaurabh156@gmail.com",
  "password": "test12345",
  "passwordConfirm": "test12345"
}

CreatedMockResponse = {
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2YxZWUwNjM1YTU4MzdjODEwYTU5NSIsImlhdCI6MTYzMTUyNjYyNSwiZXhwIjoxNjMxNTI5NjI1fQ.-sijwOt8yDhBReUdZmEbqIv8K_wzpMnA-HXKjeFT2Dg",
  "data": {
    "role": "user",
    "name": "sumit",
    "email": "sumitsaurabh156@gmail.com",
    "active": true,
    "_id": "613f1ee0635a5837c810a595"
  }
}



//Testing for creation of user Sign Up


describe("AuthController.createSignUp", () => {

  beforeEach(() => {
    req.body = CreatedMockUser;

  });

  it("should have a createReview function", async () => {
    expect(typeof AuthController.signup).toBe("function");
  });
  it('the signUp function should return something', () => {
    expect(AuthController.signup).toBeDefined();
  });
  it("should call Usermodel create", () => {
    AuthController.signup(req, res, next);
    expect(UserModel.create).toBeCalledWith(req.body);
  });
  it("should return 201 response code", async () => {
    UserModel.create.mockReturnValue(CreatedMockResponse);
    await AuthController.signup(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    UserModel.create.mockReturnValue(CreatedMockResponse);
    await AuthController.signup(req, res, next);
    expect(res._isJSON()).toBe(true);


  });

});


//Test for Sign In


CreatedMockLoginUser = {
  "email": "sumitsaurabh156@gmail.com",
  "password": "test12345"
}

CreatedMockLoginResponse = {
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2YxZWUwNjM1YTU4MzdjODEwYTU5NSIsImlhdCI6MTYzMTUyODM2MiwiZXhwIjoxNjMxNTMxMzYyfQ.wB2QlR-5kTYbZub_DBniBqgEiV-li9RPQ0tTHwzE6rY",
  "data": {
    "user": {
      "role": "user",
      "_id": "613f1ee0635a5837c810a595",
      "name": "sumit",
      "email": "sumitsaurabh156@gmail.com",
      "__v": 0
    }
  }
}




//forget password


mockForgetPasswordResponse = {
  "status": "success",
  "message": "Token sent to mail"
}

mockUpdateForgetPassword =
{
  "email": "elina@example.com"
}


describe("authController.forgetPassword", () => {
  beforeEach(() => {
    req.body = mockUpdateForgetPassword;

  });


  it("should have a forgetPassword function", async () => {
    expect(typeof AuthController.forgotPassword).toBe("function");
  });
  it('the forgetpassword function should return something', () => {
    expect(AuthController.forgotPassword).toBeDefined();
  });

  it("should call Usermodel forget", () => {
    AuthController.forgotPassword(req, res, next);
    expect(UserModel.findOne).toBeCalledWith(req.body);
  });


})

//Reset Password

createdMockResetPassword = {
  "password": "pass1234",
  "passwordConfirm": "pass1234"
}


createdMockResetResponse = {
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGEyMGQzMmY4ZmI4MTRiNTZmYTE4NyIsImlhdCI6MTYyNjE1NDMzMSwiZXhwIjoxNjMzOTMwMzMxfQ.jTeL6isZr4wuSP_AHFBNpQMjpHgBhsToJsWsZYOQit8",
  "data": {
    "user": {
      "role": "user",
      "_id": "5c8a20d32f8fb814b56fa187",
      "name": "Elina",
      "email": "elina@example.com",
      "photo": "user-8.jpg",
      "__v": 0,
      "passwordChangedAt": "2021-07-13T05:32:10.317Z"
    }
  }
}

describe("AuthController.resetPassword", () => {

  beforeEach(() => {
    req.body = createdMockResetPassword,
    passwordResetToken="12345",
    passwordResetExpires="17/2/21"


  });

  it("should have a reset password function", async () => {
    expect(typeof AuthController.resetPassword).toBe("function");
  });
  it('the reset function should return something', () => {
    expect(AuthController.resetPassword).toBeDefined();
  });


});












