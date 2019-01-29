import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { KhachHang } from '.'

const app = () => express(apiRoot, routes)

let khachHang

beforeEach(async () => {
  khachHang = await KhachHang.create({})
})

test('POST /khach-hangs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', email: 'test', phone: 'test', address: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.address).toEqual('test')
})

test('GET /khach-hangs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /khach-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${khachHang.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(khachHang.id)
})

test('GET /khach-hangs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /khach-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${khachHang.id}`)
    .send({ name: 'test', email: 'test', phone: 'test', address: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(khachHang.id)
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.address).toEqual('test')
})

test('PUT /khach-hangs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', email: 'test', phone: 'test', address: 'test' })
  expect(status).toBe(404)
})

test('DELETE /khach-hangs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${khachHang.id}`)
  expect(status).toBe(204)
})

test('DELETE /khach-hangs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
