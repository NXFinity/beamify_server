const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beamify API',
      version: '1.0.0',
      description: 'API documentation for the Beamify platform',
    },
    servers: [
      {
        url: 'http://localhost:3021/v1',
        description: 'Development server',
      },
    ],
  },
  apis: [
    // Add paths to your route files or YAML docs here
    // Example: './src/api/**/*.js'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app, path = '/v1/docs') {
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
