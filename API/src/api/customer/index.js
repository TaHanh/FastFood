import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Customer, { schema } from './model'

const router = new Router()
const { name, email, phone, address, type } = schema.tree

/**
 * @api {post} /customers Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiParam name Customer's name.
 * @apiParam email Customer's email.
 * @apiParam phone Customer's phone.
 * @apiParam address Customer's address.
 * @apiParam type Customer's type.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.post('/',
  body({ name, email, phone, address, type }),
  create)

/**
 * @api {get} /customers Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of customers.
 * @apiSuccess {Object[]} rows List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /customers/:id Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /customers/:id Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 * @apiParam name Customer's name.
 * @apiParam email Customer's email.
 * @apiParam phone Customer's phone.
 * @apiParam address Customer's address.
 * @apiParam type Customer's type.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.put('/:id',
  body({ name, email, phone, address, type }),
  update)

/**
 * @api {delete} /customers/:id Delete customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Customer not found.
 */
router.delete('/:id',
  destroy)

export default router
