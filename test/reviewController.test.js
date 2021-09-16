const ReviewController = require("../controllers/reviewController");
const ReviewModel = require("../models/reviewModel");
const httpMocks = require("node-mocks-http");



jest.mock("../models/reviewModel");


let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});



CreatedMockReview={
    "review":"Nice review",
    "review":"5c88fa8cf4afda39709c2955",
    "user":"5c8a1e1a2f8fb814b56fa182"
}


CreatedMockResponse={
    "status": "success",
    "data": {
        "data": {
            "_id": "60ed2fa106df636650a61a68",
            "review": "Nice review",
            "review": "5c88fa8cf4afda39709c2955",
            "user": "5c8a1e1a2f8fb814b56fa182",
            "createdAt": "2021-07-13T06:16:01.347Z",
            "__v": 0,
            "id": "60ed2fa106df636650a61a68"
        }
    }
}


// testing for creation of review

describe("ReviewController.createRour", () => {
    beforeEach(() => {
      req.body = CreatedMockReview;
    });
  
    it("should have a createReview function", () => {
      expect(typeof ReviewController.createReview).toBe("function");
    });
    it('the createReview fucntion should return something', () => {
      expect(ReviewController.createReview).toBeDefined();
    });
    it("should call ReviewModel.create", () => {
      ReviewController.createReview(req, res, next);
      expect(ReviewModel.create).toBeCalledWith(CreatedMockReview);
    });
    it("should return 201 response code", async () => {
      ReviewModel.create.mockReturnValue(CreatedMockResponse);
      await ReviewController.createReview(req, res, next);
   
      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async () => {
      ReviewModel.create.mockReturnValue(CreatedMockResponse);
      await ReviewController.createReview(req, res, next);
      expect(res._isJSON()).toBe(true);
      
      expect(res._getJSONData().data.review.data.data).toEqual(CreatedMockResponse.data.data)
  
     
  
      
    });
  
  });


  //testing for getting all reviews

  MockGetResponses={
    "status": "success",
    "results": 67,
    "data": {
        "data": [
            {
                "_id": "60cec379aa1b8939e4c1a1a7",
                "rating": 3,
                "review": "Hel",
                "review": "60cd8fb0e0fc656790946855",
                "user": {
                    "_id": "5c8a23c82f8fb814b56fa18d",
                    "name": "Laura Wilson",
                    "photo": "user-14.jpg"
                },
                "createdAt": "2021-06-20T04:26:33.426Z",
                "id": "60cec379aa1b8939e4c1a1a7"
            }]}}




  describe("ReviewController.getReviews", () => {
  it("should have a getReviews function", () => {
    expect(typeof ReviewController.getAllReviews).toBe("function");
  });
  it("should call ReviewModel.find({})", async () => {
    await ReviewController.getAllReviews(req, res, next);
    expect(ReviewModel.find).toHaveBeenCalledWith({});
  });
  it("should return response with status 200 and all reviews", async () => {
    ReviewModel.find.mockReturnValue(MockGetResponses);
    await ReviewController.getAllReviews(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
 
    
    expect(res._getJSONData().data.reviews.data.data).toStrictEqual(MockGetResponses.data.data);
  });


});


//testing for get a review

MockGetResponse={
    "status": "success",
    "data": {
        "doc": {
            "_id": "60cd969aa6d3a905403ce788",
            "rating": 1,
            "review": "Terrible",
            "review": "60cd8fb0e0fc656790946855",
            "user": {
                "_id": "5c8a23c82f8fb814b56fa18d",
                "name": "Laura Wilson",
                "photo": "user-14.jpg"
            },
            "createdAt": "2021-06-19T07:02:50.692Z",
            "__v": 0,
            "id": "60cd969aa6d3a905403ce788"
        }
    }
}

 


describe("ReviewController.getReviewById", () => {
    beforeEach(() => {
        req.params.id = "60cd969aa6d3a905403ce788"
      });
  it("should have a getReviewById", () => {
    expect(typeof ReviewController.getReview).toBe("function");
  });
  it("should call ReviewModel.findById with route parameters", async () => {

    await ReviewController.getReview(req, res, next);
   
    expect(ReviewModel.findById).toBeCalledWith(req.params.id);
  });
  it("should return json body and response code 200", async () => {
    ReviewModel.findById.mockReturnValue(MockGetResponse);
    await ReviewController.getReview(req, res, next);
    expect(res.statusCode).toBe(200);
 
     expect(res._getJSONData().data).toEqual(MockGetResponse);
   
    expect(res._isEndCalled()).toBeTruthy();
  });

});


mockDeleteReview={
    "status": "success",
    "data": {
        "doc": {
            "_id": "60ed2fa106df636650a61a68",
            "review": "Nice review",
            "review": "5c88fa8cf4afda39709c2955",
            "user": {
                "_id": "5c8a1e1a2f8fb814b56fa182",
                "name": "Sophie Louise Hart",
                "photo": "user-3.jpg"
            },
            "createdAt": "2021-07-13T06:16:01.347Z",
            "__v": 0,
            "id": "60ed2fa106df636650a61a68"
        }
    }
}

//Test for Deletion
describe("Review  deletion", () => {
    beforeEach(() => {
        req.params.id = "60ed2fa106df636650a61a68";
      });

    it("should have a delete Review  function", () => {
      expect(typeof ReviewController.deleteReview).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {
      
      await ReviewController.deleteReview(req, res, next);
      expect(ReviewModel.findByIdAndDelete).toBeCalledWith(req.params.id);
    });
    it("should return 200 OK and delete the review model", async () => {
      ReviewModel.findByIdAndDelete.mockReturnValue(mockDeleteReview);
      await ReviewController.deleteReview(req, res, next);
      expect(res.statusCode).toBe(200);
  

      expect(res._isEndCalled()).toBeTruthy();
    });

    
  
   });

   //Test for updation of review


 
   MockUpdatedReview={
    "status": "success",
    "data": {
        "data": {
            "_id": "60cd951468dd6a3944ff9e25",
            "rating": 4,
            "review": "Great",
            "tour": "60cd8fb0e0fc656790946855",
            "user": {
                "_id": "5c8a23c82f8fb814b56fa18d",
                "name": "Laura Wilson",
                "photo": "user-14.jpg"
            },
            "createdAt": "2021-06-19T06:56:20.397Z",
            "__v": 0,
            "id": "60cd951468dd6a3944ff9e25"
        }
    }
}

   describe("ReviewController.updateReview", () => {
    beforeEach(() => {
        req.params.id = "60ed2fa106df636650a61a68";
        req.body={
            "rating":4
        }
      });


  it("should have a updateReview function", () => {
    expect(typeof ReviewController.updateReview).toBe("function");
  });
  it("should update with ReviewModel.findByIdAndUpdate", async () => {
  
    await ReviewController.updateReview(req, res, next);

    expect(ReviewModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, {
      new: true,
      
    });
  });
  it("should return a response with json data and http code 200", async () => {
     

    ReviewModel.findByIdAndUpdate.mockReturnValue(MockUpdatedReview);
    await ReviewController.updateReview(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data).toStrictEqual(MockUpdatedReview);
  });

});