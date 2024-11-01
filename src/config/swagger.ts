import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Task4 Productzilla - Rezky',
      version: '1.0.0',
      description: 'API untuk manajemen buku',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path ke file yang mengandung anotasi Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
