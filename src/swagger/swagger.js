const swaggerUi = require('swagger-ui-express');
const userSwagger = require('../api/user/userSwagger.json');
const authSwagger = require('../security/authSwagger.json');
const adminSwagger = require('../admin/adminSwagger.json');
const gamifySwagger = require('../api/gamify/gamifySwagger.json');

const swaggerDocument = {
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
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    ...(gamifySwagger.components || {})
  },
  security: [
    { BearerAuth: [] }
  ],
  paths: {
    ...userSwagger.paths,
    ...authSwagger.paths,
    ...adminSwagger.paths,
    ...gamifySwagger.paths
  },
  tags: [
    ...(userSwagger.tags || []),
    ...(authSwagger.tags || []),
    ...(adminSwagger.tags || []),
    ...(gamifySwagger.tags || [])
  ],
};

function setupSwagger(app, path = '/v1/docs') {
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
