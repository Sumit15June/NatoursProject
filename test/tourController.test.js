const request = require('supertest');
const app = require("../app")

const AppError = require('../utils/appError');
const tourController = require('../controllers/tourController');
const Tour = require("../models/tourModel");

const mockdata=
{
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
    "name": "Test tour 10",
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

    let mockcreateTour = {
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
                "createdAt": "2021-08-13T05:29:45.971Z",
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
                "_id": "611603692d354049d4ba26b9",
                "name": "Test tour 2",
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
                "slug": "test-tour-2",
                "__v": 0,
                "durationWeeks": 1,
                "id": "611603692d354049d4ba26b9"
            }
        }
    }




const mockGetTourDetails = 
{
  status: 'success',
  data: {
    tour: {
      startLocation: [Object],
      ratingsAverage: 4.8,
      ratingsQuantity: 6,
      images: [Array],
      startDates: [Array],
      secretTour: false,
      guides: [Array],
      _id: '5c88fa8cf4afda39709c2955',
      name: 'test tour',
      duration: 7,
      maxGroupSize: 15,
      difficulty: 'medium',
      price: 497,
      summary: 'Exploring the jaw-dropping US east coast by foot and by boat',
      description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
        'Irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      imageCover: 'tour-2-cover.jpg',
      locations: [Array],
      slug: 'the-sea-explorer',
      __v: 0,
      durationWeeks: 1,
      reviews: [Array],
      id: '5c88fa8cf4afda39709c2955'
    }
  }
}

const mockRequest = () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    return req
  }

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res
}

describe('shows the details of tour by tour id', () => {
  jest.setTimeout(1000);

  it("should return data of tour when id param is provided", async () => {
    const req = mockRequest();
    const res = mockResponse() 
    req.params.id = "5c88fa8cf4afda39709c2955";

    Tour.findById = jest.fn().mockResolvedValue(mockGetTourDetails) 

    let tour =  await tourController.getTour(req,res)
  
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.data).toEqual(mockGetTourDetails);
  });

  it('should not return data of tour when id param is provided wrong', async () => {
    const req = mockRequest();
    const res = mockResponse()

    req.params.id = "5c88fa8cf4afda39709c2956";

    Tour.findById = jest.fn().mockResolvedValue(null) 
    await tourController.getTour(req,res)
    let error = new AppError('No tour found with that id', 404);

    expect(error.statusCode).toBe(404);
    expect(error.status).toBe('fail');
  });

});

const mockGetAllTours = {
  "status": "success",
  "results": 10,
  "data": {
      "tours": [
          {
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
              "_id": "6100ef26a5630831e4aa1cf7",
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
              "id": "6100ef26a5630831e4aa1cf7"
          },
          {
              "startLocation": {
                  "type": "Point",
                  "description": "California, USA",
                  "coordinates": [
                      -122.29286,
                      38.294065
                  ],
                  "address": "560 Jefferson St, Napa, CA 94559, USA"
              },
              "ratingsAverage": 4.4,
              "ratingsQuantity": 7,
              "images": [
                  "tour-7-1.jpg",
                  "tour-7-2.jpg",
                  "tour-7-3.jpg"
              ],
              "startDates": [
                  "2021-02-12T10:00:00.000Z",
                  "2021-04-14T09:00:00.000Z",
                  "2021-09-01T09:00:00.000Z"
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
                      "_id": "5c8a23412f8fb814b56fa18c",
                      "name": "Ben Hadley",
                      "email": "ben@example.com",
                      "photo": "user-13.jpg"
                  }
              ],
              "_id": "5c88fa8cf4afda39709c296c",
              "name": "The Wine Taster",
              "duration": 5,
              "maxGroupSize": 8,
              "difficulty": "easy",
              "price": 1997,
              "summary": "Exquisite wines, scenic views, exclusive barrel tastings,  and much more",
              "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              "imageCover": "tour-7-cover.jpg",
              "locations": [
                  {
                      "type": "Point",
                      "coordinates": [
                          -122.479887,
                          38.510312
                      ],
                      "_id": "5c88fa8cf4afda39709c296f",
                      "day": 1
                  },
                  {
                      "type": "Point",
                      "coordinates": [
                          -122.582948,
                          38.585707
                      ],
                      "_id": "5c88fa8cf4afda39709c296e",
                      "day": 3
                  },
                  {
                      "type": "Point",
                      "coordinates": [
                          -122.434697,
                          38.482181
                      ],
                      "_id": "5c88fa8cf4afda39709c296d",
                      "day": 5
                  }
              ],
              "slug": "the-wine-taster",
              "durationWeeks": 0.7142857142857143,
              "id": "5c88fa8cf4afda39709c296c"
          }
      ]
  }
}



describe('shows the list of tour', () => {
  jest.setTimeout(1000);  
  let mockedReq;

  beforeEach(() => {
      mockedReq = {
          query: {}
      };
  })

  it("return list of tours", async () => {
    Tour.find = jest.fn().mockResolvedValue(mockGetAllTours); 
    
    const res = mockResponse() 
    await tourController.getAllTours(mockedReq,res)
    expect(res.status).toHaveBeenCalledWith(200);
  });
});



describe('testing the create tour', () => {
    jest.setTimeout(1000);  
  
    it("create tours", async () => {
        const req = mockRequest();
        const res = mockResponse() 
        req.body = mockdata;
    
        Tour.create = jest.fn().mockResolvedValue(mockcreateTour);
        let tour =  await tourController.createTour(req.body,res)  
        //console.log(res)      
        expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  
  //Testing updation
  describe('testing the updation of tour by tour id', () => {
  jest.setTimeout(1000);
  
    it("should update data of tour when id param is provided", async () => {
      const req = mockRequest();
      const res = mockResponse() 
      req.params.id = "60eb976e805edd5a38267794";
      req.body={
        "guides":["60ba1ed0c8861663b04019c3","60b4ee81cd997c305c931454","60b4ee52cd997c305c931453"]
      }
  
      Tour.findByIdUpdate = jest.fn().mockResolvedValue(mockGetTourDetails) 
  
      let tour =  await tourController.updateTour(req,res)
    
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.data).toEqual(mockGetTourDetails);

    });
  
  
  
  });

   //testing deletion
  describe('testing the deletion of tour by tour id', () => {
    jest.setTimeout(100000000);
  
    it("should delete data of tour when id param is provided", async () => {
      const req = mockRequest();
      const res = mockResponse() 
      req.params.id = "60eb976e805edd5a38267794";
      
  
      Tour.findByIdAndDelete = jest.fn().mockResolvedValue(mockGetTourDetails) 
  
      let tour =  await tourController.deleteTour(req,res)
    
      
      expect(res.status).toHaveBeenCalledWith(200);
    });
  
    
  
  });



  




