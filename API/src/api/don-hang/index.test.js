import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { DonHang } from '.'

const app = () => express(apiRoot, routes)

let donHang

beforeEach(async () => {
  donHang = await DonHang.create({})
})

test('POST /don-hangs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', idAdmin: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.statusOrder).toEqual('test')
  expect(body.statusShip).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.idUser).toEqual('test')
  expect(body.idAdmin).toEqual('test')
})

test('GET /don-hangs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /don-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${donHang.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(donHang.id)
})

test('GET /don-hangs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /don-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${donHang.id}`)
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', idAdmin: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(donHang.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.statusOrder).toEqual('test')
  expect(body.statusShip).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.idUser).toEqual('test')
  expect(body.idAdmin).toEqual('test')
})

test('PUT /don-hangs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', idAdmin: 'test' })
  expect(status).toBe(404)
})

test('DELETE /don-hangs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${donHang.id}`)
  expect(status).toBe(204)
})

test('DELETE /don-hangs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
