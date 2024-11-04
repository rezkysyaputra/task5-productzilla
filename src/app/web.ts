import express from 'express';
import connectDB from '../config/database';
import userRoute from '../routes/userRoute';
import bookRoute from '../routes/bookRoute';
import swaggerDocs from '../config/swagger';
import swaggerUi from 'swagger-ui-express';

export const web = express();

web.use(express.json());
connectDB();

web.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

web.use('/api', userRoute);
web.use('/api', bookRoute);
