import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../docs/swagger.json' assert { type: 'json' };
import * as Types from '../../libs/types/common.js';

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  /** @type {swaggerUi.SwaggerUiOptions} */
  const options = {
    swaggerOptions: {
      deepLinking: true
    }
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
};
