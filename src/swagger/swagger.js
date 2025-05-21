const swaggerUi = require('swagger-ui-express');
const userSwagger = require('../api/user/userSwagger.json');
const authSwagger = require('../security/authSwagger.json');
const adminSwagger = require('../admin/adminSwagger.json');
const gamifySwagger = require('../api/gamify/gamifySwagger.json');
const paymentSwagger = require('../api/payment/payementSwagger.json');
const storeSwagger = require('../api/store/storeSwagger.json');

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
    ...(gamifySwagger.components || {}),
    ...(storeSwagger.components || {})
  },
  security: [
    { BearerAuth: [] }
  ],
  paths: {
    ...userSwagger.paths,
    ...authSwagger.paths,
    ...adminSwagger.paths,
    ...gamifySwagger.paths,
    ...paymentSwagger.paths,
    ...storeSwagger.paths
  },
  tags: [
    ...(userSwagger.tags || []),
    ...(authSwagger.tags || []),
    ...(adminSwagger.tags || []),
    ...(gamifySwagger.tags || []),
    ...(paymentSwagger.tags || []),
    ...(storeSwagger.tags || [])
  ],
};

function setupSwagger(app, path = '/v1/docs') {
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
