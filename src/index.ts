import express, { Request, Response } from 'express';
import connectDB from './config/database';
import bookRoute from './routes/bookRoute';
import userRoute from './routes/userRoute';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', userRoute);
app.use('/api', bookRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
