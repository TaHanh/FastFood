import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export SanPham, { schema } from './model'

const router = new Router()
const { name, hot, image, price, status, description, type, size } = schema.tree

/**
 * @api {post} /san-phams Create san pham
 * @apiName CreateSanPham
 * @apiGroup SanPham
 * @apiParam name San pham's name.
 * @apiParam hot San pham's hot.
 * @apiParam image San pham's image.
 * @apiParam price San pham's price.
 * @apiParam status San pham's status.
 * @apiParam description San pham's description.
 * @apiParam type San pham's type.
 * @apiParam size San pham's size.
 * @apiSuccess {Object} sanPham San pham's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 San pham not found.
 */
router.post('/',
  body({ name, hot, image, price, status, description, type, size }),
  create)

/**
 * @api {get} /san-phams Retrieve san phams
 * @apiName RetrieveSanPhams
 * @apiGroup SanPham
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of san phams.
 * @apiSuccess {Object[]} rows List of san phams.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /san-phams/:id Retrieve san pham
 * @apiName RetrieveSanPham
 * @apiGroup SanPham
 * @apiSuccess {Object} sanPham San pham's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 San pham not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /san-phams/:id Update san pham
 * @apiName UpdateSanPham
 * @apiGroup SanPham
 * @apiParam name San pham's name.
 * @apiParam hot San pham's hot.
 * @apiParam image San pham's image.
 * @apiParam price San pham's price.
 * @apiParam status San pham's status.
 * @apiParam description San pham's description.
 * @apiParam type San pham's type.
 * @apiParam size San pham's size.
 * @apiSuccess {Object} sanPham San pham's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 San pham not found.
 */
router.put('/:id',
  body({ name, hot, image, price, status, description, type, size }),
  update)

/**
 * @api {delete} /san-phams/:id Delete san pham
 * @apiName DeleteSanPham
 * @apiGroup SanPham
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 San pham not found.
 */
router.delete('/:id',
  destroy)

export default router
