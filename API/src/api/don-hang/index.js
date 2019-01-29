import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export DonHang, { schema } from './model'

const router = new Router()
const { name, description, statusOrder, statusShip, message, products, idUser, idAdmin } = schema.tree

/**
 * @api {post} /don-hangs Create don hang
 * @apiName CreateDonHang
 * @apiGroup DonHang
 * @apiParam name Don hang's name.
 * @apiParam description Don hang's description.
 * @apiParam statusOrder Don hang's statusOrder.
 * @apiParam statusShip Don hang's statusShip.
 * @apiParam message Don hang's message.
 * @apiParam products Don hang's products.
 * @apiParam idUser Don hang's idUser.
 * @apiParam idAdmin Don hang's idAdmin.
 * @apiSuccess {Object} donHang Don hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Don hang not found.
 */
router.post('/',
  body({ name, description, statusOrder, statusShip, message, products, idUser, idAdmin }),
  create)

/**
 * @api {get} /don-hangs Retrieve don hangs
 * @apiName RetrieveDonHangs
 * @apiGroup DonHang
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of don hangs.
 * @apiSuccess {Object[]} rows List of don hangs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /don-hangs/:id Retrieve don hang
 * @apiName RetrieveDonHang
 * @apiGroup DonHang
 * @apiSuccess {Object} donHang Don hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Don hang not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /don-hangs/:id Update don hang
 * @apiName UpdateDonHang
 * @apiGroup DonHang
 * @apiParam name Don hang's name.
 * @apiParam description Don hang's description.
 * @apiParam statusOrder Don hang's statusOrder.
 * @apiParam statusShip Don hang's statusShip.
 * @apiParam message Don hang's message.
 * @apiParam products Don hang's products.
 * @apiParam idUser Don hang's idUser.
 * @apiParam idAdmin Don hang's idAdmin.
 * @apiSuccess {Object} donHang Don hang's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Don hang not found.
 */
router.put('/:id',
  body({ name, description, statusOrder, statusShip, message, products, idUser, idAdmin }),
  update)

/**
 * @api {delete} /don-hangs/:id Delete don hang
 * @apiName DeleteDonHang
 * @apiGroup DonHang
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Don hang not found.
 */
router.delete('/:id',
  destroy)

export default router
