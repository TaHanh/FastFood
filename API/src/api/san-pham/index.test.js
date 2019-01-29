import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { SanPham } from '.'

const app = () => express(apiRoot, routes)

let sanPham

beforeEach(async () => {
  sanPham = await SanPham.create({})
})

test('POST /san-phams 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', hot: 'test', image: 'test', price: 'test', status: 'test', description: 'test', type: 'test', size: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.hot).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.size).toEqual('test')
})

test('GET /san-phams 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /san-phams/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${sanPham.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sanPham.id)
})

test('GET /san-phams/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /san-phams/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${sanPham.id}`)
    .send({ name: 'test', hot: 'test', image: 'test', price: 'test', status: 'test', description: 'test', type: 'test', size: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sanPham.id)
  expect(body.name).toEqual('test')
  expect(body.hot).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.size).toEqual('test')
})

test('PUT /san-phams/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', hot: 'test', image: 'test', price: 'test', status: 'test', description: 'test', type: 'test', size: 'test' })
  expect(status).toBe(404)
})

test('DELETE /san-phams/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sanPham.id}`)
  expect(status).toBe(204)
})

test('DELETE /san-phams/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
