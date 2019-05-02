import * as express from 'express';
import { getUserHandler, updateUserHandler, addUserFeedbackHandler } from './handlers/user';
import { getUserPersonalHandler, updateUserPersonalHandler } from './handlers/personal';
import { getUserAccidentsHandler, newUserAccidentHandler, getUserAccidentHandler, updateUserAccidentHandler, deleteUserAccidentHandler } from './handlers/accident';
import { getUserVehiclesHandler, getUserVehicleHandler, updateUserVehicleHandler, deleteUserVehicleHandler, newUserVehicleHandler } from './handlers/vehicle';


export const userRouter = express.Router()

  // USER
  // get current user
  .get('/', getUserHandler)

  // update current user
  .put('/', updateUserHandler)


  // USER/PERSONAL
  // get current user personal
  .get('/personal', getUserPersonalHandler)

  // update current user personal
  .put('/personal', updateUserPersonalHandler)


  // USER/VEHICLES
  // get all user vehicles
  .get('/vehicles', getUserVehiclesHandler)

  // create new user vehicle
  .post('/vehicles', newUserVehicleHandler)

  // get current user vehicle
  .get('/vehicle/:id', getUserVehicleHandler)

  // update current user vehicle
  .put('/vehicle/:id', updateUserVehicleHandler)

  // delete current user vehicle
  .delete('/vehicle/:id', deleteUserVehicleHandler)


  // USER/ACCIDENTS
  // get all user accidents
  .get('/accidents', getUserAccidentsHandler)

  // create new user accident
  .post('/accidents', newUserAccidentHandler)

  // get current user accident
  .get('/accident/:id', getUserAccidentHandler)

  // update current user accident
  .put('/accident/:id', updateUserAccidentHandler)

  // delete current user accident
  .delete('/accident/:id', deleteUserAccidentHandler)


  // USER/FEEDBACK
  // post user feedback to slack
  .post('/feedback', addUserFeedbackHandler)