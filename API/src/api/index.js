import { Router } from 'express';
import sanPham from './san-pham';
import khachHang from './khach-hang';
import donHang from './don-hang';
import loaiHang from './loai-hang';

const router = new Router();

router.use('/san-phams', sanPham);
router.use('/khach-hangs', khachHang);
router.use('/don-hangs', donHang);
router.use('/loai-hangs', loaiHang);

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

export default router;
