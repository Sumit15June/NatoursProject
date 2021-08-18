const request = require('supertest');
const app = require("../app")

const AppError = require('../utils/appError');
const userController = require('../controllers/userController');
const User = require("../models/userModel");

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


//unit test for a user by id 
describe('shows the details of user by user id', () => {
  jest.setTimeout(1000);

  it("should return data of user when id param is provided", async () => {
    const req = mockRequest();
    const res = mockResponse() 
    req.params.id = "5c8a24822f8fb814b56fa192";

    User.findById = jest.fn().mockResolvedValue(mockGetTourDetails) 

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

//unit test for getting all users
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
  
  
  //unit test for creating a user
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
    
    //Testing updation of a user
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
  
  //unit test for deleting a user 
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
  














