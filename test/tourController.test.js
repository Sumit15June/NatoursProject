const TourController = require("../controllers/tourController");
const TourModel = require("../models/tourModel");
const httpMocks = require("node-mocks-http");




jest.mock("../models/tourModel");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});


mockTour={
  "startLocation": {
    "description": "Miami, USA",
    "type": "Point",
    "coordinates": [-80.185942, 25.774772],
    "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
  },
  "ratingsAverage": 4.8,
  "ratingsQuantity": 6,
  "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
  "startDates": [
    "2021-06-19T09:00:00.000Z",
    "2021-07-20T09:00:00.000Z",
    "2021-08-18T09:00:00.000Z"
  ],
  "name": "Test tour 1",
  "duration": 7,
  "maxGroupSize": 15,
  "difficulty": "medium",
  "guides": ["5c8a22c62f8fb814b56fa18b", "5c8a1f4e2f8fb814b56fa185"],
  "price": 497,
  "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
  "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "imageCover": "tour-2-cover.jpg",
  "locations": [
    {
      "_id": "5c88fa8cf4afda39709c2959",
      "description": "Lummus Park Beach",
      "type": "Point",
      "coordinates": [-80.128473, 25.781842],
      "day": 1
    },
    {
      "_id": "5c88fa8cf4afda39709c2958",
      "description": "Islamorada",
      "type": "Point",
      "coordinates": [-80.647885, 24.909047],
      "day": 2
    },
    {
      "_id": "5c88fa8cf4afda39709c2957",
      "description": "Sombrero Beach",
      "type": "Point",
      "coordinates": [-81.0784, 24.707496],
      "day": 3
    },
    {
      "_id": "5c88fa8cf4afda39709c2956",
      "description": "West Key",
      "type": "Point",
      "coordinates": [-81.768719, 24.552242],
      "day": 5
    }
  ]
}
mockResponse={
  "status": "success",
  "data": {
      "data": {
          "startLocation": {
              "type": "Point",
              "description": "Miami, USA",
              "coordinates": [
                  -80.185942,
                  25.774772
              ],
              "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
          },
          "ratingsAverage": 4.8,
          "ratingsQuantity": 6,
          "images": [
              "tour-2-1.jpg",
              "tour-2-2.jpg",
              "tour-2-3.jpg"
          ],
          "createdAt": "2021-07-12T00:13:20.578Z",
          "startDates": [
              "2021-06-19T09:00:00.000Z",
              "2021-07-20T09:00:00.000Z",
              "2021-08-18T09:00:00.000Z"
          ],
          "secretTour": false,
          "guides": [
              "5c8a22c62f8fb814b56fa18b",
              "5c8a1f4e2f8fb814b56fa185"
          ],
          "_id": "60eb976e805edd5a38267794",
          "name": "Test tour 1",
          "duration": 7,
          "maxGroupSize": 15,
          "difficulty": "medium",
          "price": 497,
          "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
          "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "imageCover": "tour-2-cover.jpg",
          "locations": [
              {
                  "type": "Point",
                  "coordinates": [
                      -80.128473,
                      25.781842
                  ],
                  "_id": "5c88fa8cf4afda39709c2959",
                  "day": 1
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -80.647885,
                      24.909047
                  ],
                  "_id": "5c88fa8cf4afda39709c2958",
                  "day": 2
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.0784,
                      24.707496
                  ],
                  "_id": "5c88fa8cf4afda39709c2957",
                  "day": 3
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.768719,
                      24.552242
                  ],
                  "_id": "5c88fa8cf4afda39709c2956",
                  "day": 5
              }
          ],
       
          "durationWeeks": 1,
          
      }
  }
}


mockDeleteTour={
  "status": "success",
  "data": {
      "doc": {
          "startLocation": {
              "type": "Point",
              "description": "Miami, USA",
              "coordinates": [
                  -80.185942,
                  25.774772
              ],
              "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
          },
          "ratingsAverage": 4.8,
          "ratingsQuantity": 6,
          "images": [
              "tour-2-1.jpg",
              "tour-2-2.jpg",
              "tour-2-3.jpg"
          ],
          "createdAt": "2021-07-12T00:13:20.578Z",
          "startDates": [
              "2021-06-19T09:00:00.000Z",
              "2021-07-20T09:00:00.000Z",
              "2021-08-18T09:00:00.000Z"
          ],
          "secretTour": false,
          "guides": [],
          "_id": "60eb976e805edd5a38267794",
          "name": "Test tour 1",
          "duration": 7,
          "maxGroupSize": 15,
          "difficulty": "medium",
          "price": 497,
          "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
          "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "imageCover": "tour-2-cover.jpg",
          "locations": [
              {
                  "type": "Point",
                  "coordinates": [
                      -80.128473,
                      25.781842
                  ],
                  "_id": "5c88fa8cf4afda39709c2959",
                  "day": 1
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -80.647885,
                      24.909047
                  ],
                  "_id": "5c88fa8cf4afda39709c2958",
                  "day": 2
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.0784,
                      24.707496
                  ],
                  "_id": "5c88fa8cf4afda39709c2957",
                  "day": 3
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.768719,
                      24.552242
                  ],
                  "_id": "5c88fa8cf4afda39709c2956",
                  "day": 5
              }
          ],
          "slug": "test-tour-1",
          "__v": 0,
          "durationWeeks": 1,
          "id": "60eb976e805edd5a38267794"
      }
  }
}




describe("TourController.createTour", () => {
  beforeEach(() => {
    req.body = mockTour;
  });

  it("should have a createTour function", () => {
    expect(typeof TourController.createTour).toBe("function");
  });
  it('the createTour fucntion should return something', () => {
    expect(TourController.createTour).toBeDefined();
  });
  it("should call TourModel.create", () => {
    TourController.createTour(req, res, next);
    expect(TourModel.create).toBeCalledWith(mockTour);
  });
  it("should return 201 response code", async () => {
    TourModel.create.mockReturnValue(mockResponse);
    await TourController.createTour(req, res, next);
 
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TourModel.create.mockReturnValue(mockResponse);
    await TourController.createTour(req, res, next);
    expect(res._isJSON()).toBe(true);
    
    expect(res._getJSONData().data.tour.data.data).toEqual(mockResponse.data.data)

   

    
  });

});









 describe("Tour  deletion", () => {
  beforeEach(() => {
    req.params.id = "60eb976e805edd5a38267794";
  });
  it("should have a delete Tour  function", () => {
    expect(typeof TourController.deleteTour).toBe("function");
  });
  it("should call findByIdAndDelete", async () => {
    
    await TourController.deleteTour(req, res, next);
    expect(TourModel.findByIdAndDelete).toBeCalledWith(req.params.id);
  });
  it("should return 200 OK and delete the tour model", async () => {
    TourModel.findByIdAndDelete.mockReturnValue(mockDeleteTour);
    await TourController.deleteTour(req, res, next);
    expect(res.statusCode).toBe(200);
 
    expect(res._getJSONData().data.data).toStrictEqual(mockDeleteTour.data);
 
     expect(res._isEndCalled()).toBeTruthy();
  });

 });


 mockUpdatedTourResponse={
  "status": "success",
  "data": {
      "data": {
          "startLocation": {
              "type": "Point",
              "description": "Miami, USA",
              "coordinates": [
                  -80.185942,
                  25.774772
              ],
              "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
          },
          "ratingsAverage": 4.8,
          "ratingsQuantity": 6,
          "images": [
              "tour-2-1.jpg",
              "tour-2-2.jpg",
              "tour-2-3.jpg"
          ],
          "startDates": [
              "2021-06-19T09:00:00.000Z",
              "2021-07-20T09:00:00.000Z",
              "2021-08-18T09:00:00.000Z"
          ],
          "secretTour": false,
          "guides": [],
          "_id": "60eb976e805edd5a38267794",
          "name": "Test tour 1",
          "duration": 7,
          "maxGroupSize": 15,
          "difficulty": "medium",
          "price": 497,
          "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
          "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "imageCover": "tour-2-cover.jpg",
          "locations": [
              {
                  "type": "Point",
                  "coordinates": [
                      -80.128473,
                      25.781842
                  ],
                  "_id": "5c88fa8cf4afda39709c2959",
                  "day": 1
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -80.647885,
                      24.909047
                  ],
                  "_id": "5c88fa8cf4afda39709c2958",
                  "day": 2
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.0784,
                      24.707496
                  ],
                  "_id": "5c88fa8cf4afda39709c2957",
                  "day": 3
              },
              {
                  "type": "Point",
                  "coordinates": [
                      -81.768719,
                      24.552242
                  ],
                  "_id": "5c88fa8cf4afda39709c2956",
                  "day": 5
              }
          ],
          "slug": "test-tour-1",
          "__v": 0,
          "durationWeeks": 1,
          "id": "60eb976e805edd5a38267794"
      }
  }
}


newTour={
  "guides":["60ba1ed0c8861663b04019c3","60b4ee81cd997c305c931454","60b4ee52cd997c305c931453"]
}



 describe("TourController.updateTour", () => {

  beforeEach(()=>{
    req.params.id="60eb976e805edd5a38267794";
    req.body = newTour;
  })
 
  it("should have a updateTour function", () => {
    expect(typeof TourController.updateTour).toBe("function");
  });
  it("should update with TourModel.findByIdAndUpdate", async () => {
    
    
    await TourController.updateTour(req, res, next);

    expect(TourModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, {
      new: true,
      useFindAndModify: false
    });
  });
  it("should return a response with json data and http code 200", async () => {

    TourModel.findByIdAndUpdate.mockReturnValue(mockUpdatedTourResponse);
    await TourController.updateTour(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data).toStrictEqual(mockUpdatedTourResponse);
  });

 });



 mockGetTourResponses={
  "status": "success",
  "data":{
    "data":[ {
      "startLocation": {
          "type": "Point",
          "description": "Miami, USA",
          "coordinates": [
              -80.185942,
              25.774772
          ],
          "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
      },
      "ratingsAverage": 4.8,
      "ratingsQuantity": 6,
      "images": [
          "tour-2-1.jpg",
          "tour-2-2.jpg",
          "tour-2-3.jpg"
      ],
      "startDates": [
          "2021-06-19T09:00:00.000Z",
          "2021-07-20T09:00:00.000Z",
          "2021-08-18T09:00:00.000Z"
      ],
      "secretTour": false,
      "guides": [
          {
              "role": "lead-guide",
              "_id": "5c8a22c62f8fb814b56fa18b",
              "name": "Miyah Myles",
              "email": "miyah@example.com",
              "photo": "user-12.jpg"
          },
          {
              "role": "guide",
              "_id": "5c8a1f4e2f8fb814b56fa185",
              "name": "Jennifer Hardy",
              "email": "jennifer@example.com",
              "photo": "user-6.jpg"
          }
      ],
      "_id": "60eb976e805edd5a38267794",
      "name": "Test tour 1",
      "duration": 7,
      "maxGroupSize": 15,
      "difficulty": "medium",
      "price": 497,
      "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
      "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "imageCover": "tour-2-cover.jpg",
      "locations": [
          {
              "type": "Point",
              "coordinates": [
                  -80.128473,
                  25.781842
              ],
              "_id": "5c88fa8cf4afda39709c2959",
              "day": 1
          },
          {
              "type": "Point",
              "coordinates": [
                  -80.647885,
                  24.909047
              ],
              "_id": "5c88fa8cf4afda39709c2958",
              "day": 2
          },
          {
              "type": "Point",
              "coordinates": [
                  -81.0784,
                  24.707496
              ],
              "_id": "5c88fa8cf4afda39709c2957",
              "day": 3
          },
          {
              "type": "Point",
              "coordinates": [
                  -81.768719,
                  24.552242
              ],
              "_id": "5c88fa8cf4afda39709c2956",
              "day": 5
          }
      ],
      "slug": "test-tour-1",
      "durationWeeks": 1,
      "id": "60eb976e805edd5a38267794"
  }]
  }
 }


 mockGetTourResponse={
  "status": "success",
  "data":{
    "data":[ {
      "startLocation": {
          "type": "Point",
          "description": "Miami, USA",
          "coordinates": [
              -80.185942,
              25.774772
          ],
          "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
      },
      "ratingsAverage": 4.8,
      "ratingsQuantity": 6,
      "images": [
          "tour-2-1.jpg",
          "tour-2-2.jpg",
          "tour-2-3.jpg"
      ],
      "startDates": [
          "2021-06-19T09:00:00.000Z",
          "2021-07-20T09:00:00.000Z",
          "2021-08-18T09:00:00.000Z"
      ],
      "secretTour": false,
      "guides": [
          {
              "role": "lead-guide",
              "_id": "5c8a22c62f8fb814b56fa18b",
              "name": "Miyah Myles",
              "email": "miyah@example.com",
              "photo": "user-12.jpg"
          },
          {
              "role": "guide",
              "_id": "5c8a1f4e2f8fb814b56fa185",
              "name": "Jennifer Hardy",
              "email": "jennifer@example.com",
              "photo": "user-6.jpg"
          }
      ],
      "_id": "60eb976e805edd5a38267794",
      "name": "Test tour 1",
      "duration": 7,
      "maxGroupSize": 15,
      "difficulty": "medium",
      "price": 497,
      "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
      "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "imageCover": "tour-2-cover.jpg",
      "locations": [
          {
              "type": "Point",
              "coordinates": [
                  -80.128473,
                  25.781842
              ],
              "_id": "5c88fa8cf4afda39709c2959",
              "day": 1
          },
          {
              "type": "Point",
              "coordinates": [
                  -80.647885,
                  24.909047
              ],
              "_id": "5c88fa8cf4afda39709c2958",
              "day": 2
          },
          {
              "type": "Point",
              "coordinates": [
                  -81.0784,
                  24.707496
              ],
              "_id": "5c88fa8cf4afda39709c2957",
              "day": 3
          },
          {
              "type": "Point",
              "coordinates": [
                  -81.768719,
                  24.552242
              ],
              "_id": "5c88fa8cf4afda39709c2956",
              "day": 5
          }
      ],
      "slug": "test-tour-1",
      "durationWeeks": 1,
      "id": "60eb976e805edd5a38267794"
  }]
  }
 }



 describe("TourController.getTourById", () => {
   beforeEach(()=>{
    req.params.id="60eb976e805edd5a38267794"
   })
  it("should have a getTourById", () => {
    expect(typeof TourController.getTour).toBe("function");
  });
  it("should call TourModel.findById with route parameters", async () => {
    await TourController.getTour(req, res, next);
    expect(TourModel.findById).toBeCalledWith(req.params.id);
  });
  it("should return json body and response code 200", async () => {
    TourModel.findById.mockReturnValue(mockGetTourResponse);
    await TourController.getTour(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().data).toStrictEqual(mockGetTourResponse);
    expect(res._isEndCalled()).toBeTruthy();
  });

 });

describe("TourController.getTours", () => {
  it("should have a getTours function", () => {
    expect(typeof TourController.getAllTours).toBe("function");
  });
  it("should call TourModel.find({})", async () => {
    await TourController.getAllTours(req, res, next);
    expect(TourModel.find).toHaveBeenCalledWith({});
  });
  it("should return response with status 200 and all tours", async () => {
    TourModel.find.mockReturnValue(mockGetTourResponses);
    await TourController.getAllTours(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData().data.tours).toStrictEqual(mockGetTourResponses);
    //console.log(res._getJSONData().data.tours);
  });

});


