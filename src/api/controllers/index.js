import { PUBLIC_URL } from '../../libs/env.js';
import * as Types from '../../libs/types/common.js';

/**
 * @type {Types.Controller}
 * @returns {void}
 */
export function ping(_req, res) {
  const { HEROKU_APP_NAME, HEROKU_BRANCH, HEROKU_PR_NUMBER } = process.env;

  // eslint-disable-next-line no-console
  console.log({ HEROKU_APP_NAME, HEROKU_BRANCH, HEROKU_PR_NUMBER });

  res.status(200).json({
    message: 'Ping successfully on dev',
    documentation: `${PUBLIC_URL}/docs`
  });
}
