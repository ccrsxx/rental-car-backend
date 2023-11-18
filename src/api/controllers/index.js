import * as Types from '../../libs/types/common.js';

/**
 * @type {Types.Controller}
 * @returns {void}
 */
export function ping(_req, res) {
  res.status(200).json({
    message: 'Ping successfully',
    documentation: 'https://dev.risalamin.com/docs'
  });
}
