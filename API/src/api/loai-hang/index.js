import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export LoaiHang, { schema } from './model'

const router = new Router()
const { name, key, description } = schema.tree

/**
 * @api {post} /loai-hangs Create loai hang
 * @apiName CreateLoaiHang
 * @apiGroup LoaiHang
 * @apiParam name Loai hang's name.
 * @apiParam description Loai hang's description.
 * @apiSuccess {Object} loaiHang Loai hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Loai hang not found.
 */
router.post('/', body({ name, key, description }), create)

/**
 * @api {get} /loai-hangs Retrieve loai hangs
 * @apiName RetrieveLoaiHangs
 * @apiGroup LoaiHang
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of loai hangs.
 * @apiSuccess {Object[]} rows List of loai hangs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

/**
 * @api {get} /loai-hangs/:id Retrieve loai hang
 * @apiName RetrieveLoaiHang
 * @apiGroup LoaiHang
 * @apiSuccess {Object} loaiHang Loai hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Loai hang not found.
 */
router.get('/:id', show)

/**
 * @api {put} /loai-hangs/:id Update loai hang
 * @apiName UpdateLoaiHang
 * @apiGroup LoaiHang
 * @apiParam name Loai hang's name.
 * @apiParam description Loai hang's description.
 * @apiSuccess {Object} loaiHang Loai hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Loai hang not found.
 */
router.put('/:id', body({ name, key, description }), update)

/**
 * @api {delete} /loai-hangs/:id Delete loai hang
 * @apiName DeleteLoaiHang
 * @apiGroup LoaiHang
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Loai hang not found.
 */
router.delete('/:id', destroy)

export default router
