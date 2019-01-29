import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { LoaiHang } from '.'

const app = () => express(apiRoot, routes)

let loaiHang

beforeEach(async () => {
  loaiHang = await LoaiHang.create({})
})

test('POST /loai-hangs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('GET /loai-hangs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /loai-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${loaiHang.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(loaiHang.id)
})

test('GET /loai-hangs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /loai-hangs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${loaiHang.id}`)
    .send({ name: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(loaiHang.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /loai-hangs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /loai-hangs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${loaiHang.id}`)
  expect(status).toBe(204)
})

test('DELETE /loai-hangs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
