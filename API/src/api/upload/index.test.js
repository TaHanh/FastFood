import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Upload } from '.'

const app = () => express(apiRoot, routes)

let upload

beforeEach(async () => {
  upload = await Upload.create({})
})

test('POST /uploads 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ file: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.file).toEqual('test')
})

test('GET /uploads 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /uploads/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${upload.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(upload.id)
})

test('GET /uploads/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /uploads/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${upload.id}`)
    .send({ file: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(upload.id)
  expect(body.file).toEqual('test')
})

test('PUT /uploads/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ file: 'test' })
  expect(status).toBe(404)
})

test('DELETE /uploads/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${upload.id}`)
  expect(status).toBe(204)
})

test('DELETE /uploads/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
