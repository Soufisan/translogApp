import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRouter from './modules/auth/auth.routes.js';
import operatorRouter from './modules/operator/operator.routes.js';
import publicRouter from './modules/public/public.routes.js';
import userRouter from './modules/user/user.routes.js';
import shipmentsRouter from './modules/shipments/shipments.routes.js';
/*
import supervisorRouter from './modules/supervisor/supervisor.routes.js';


*/


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares Rutas
app.use('/api', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/operator', operatorRouter);
app.use('/api/user', userRouter)
app.use('/api/shipments', shipmentsRouter);
/*
app.use('/api/supervisor', supervisorRouter);

*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({message: "Error del servidor"});
});

export default app;
