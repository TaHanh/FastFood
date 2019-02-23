import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Upload, { schema } from './model'

const router = new Router()
const { file } = schema.tree

/**
 * @api {post} /uploads Create upload
 * @apiName CreateUpload
 * @apiGroup Upload
 * @apiParam file Upload's file.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 */
router.post('/',
  body({ file }),
  create)

/**
 * @api {get} /uploads Retrieve uploads
 * @apiName RetrieveUploads
 * @apiGroup Upload
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of uploads.
 * @apiSuccess {Object[]} rows List of uploads.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /uploads/:id Retrieve upload
 * @apiName RetrieveUpload
 * @apiGroup Upload
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /uploads/:id Update upload
 * @apiName UpdateUpload
 * @apiGroup Upload
 * @apiParam file Upload's file.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 */
router.put('/:id',
  body({ file }),
  update)

/**
 * @api {delete} /uploads/:id Delete upload
 * @apiName DeleteUpload
 * @apiGroup Upload
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Upload not found.
 */
router.delete('/:id',
  destroy)

export default router
