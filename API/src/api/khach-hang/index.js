import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export KhachHang, { schema } from './model'

const router = new Router()
const { name, email, phone, address } = schema.tree

/**
 * @api {post} /khach-hangs Create khach hang
 * @apiName CreateKhachHang
 * @apiGroup KhachHang
 * @apiParam name Khach hang's name.
 * @apiParam email Khach hang's email.
 * @apiParam phone Khach hang's phone.
 * @apiParam address Khach hang's address.
 * @apiSuccess {Object} khachHang Khach hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Khach hang not found.
 */
router.post('/',
  body({ name, email, phone, address }),
  create)

/**
 * @api {get} /khach-hangs Retrieve khach hangs
 * @apiName RetrieveKhachHangs
 * @apiGroup KhachHang
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of khach hangs.
 * @apiSuccess {Object[]} rows List of khach hangs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /khach-hangs/:id Retrieve khach hang
 * @apiName RetrieveKhachHang
 * @apiGroup KhachHang
 * @apiSuccess {Object} khachHang Khach hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Khach hang not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /khach-hangs/:id Update khach hang
 * @apiName UpdateKhachHang
 * @apiGroup KhachHang
 * @apiParam name Khach hang's name.
 * @apiParam email Khach hang's email.
 * @apiParam phone Khach hang's phone.
 * @apiParam address Khach hang's address.
 * @apiSuccess {Object} khachHang Khach hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Khach hang not found.
 */
router.put('/:id',
  body({ name, email, phone, address }),
  update)

/**
 * @api {delete} /khach-hangs/:id Delete khach hang
 * @apiName DeleteKhachHang
 * @apiGroup KhachHang
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Khach hang not found.
 */
router.delete('/:id',
  destroy)

export default router
