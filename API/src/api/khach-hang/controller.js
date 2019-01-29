import { success, notFound } from '../../services/response/'
import { KhachHang } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  KhachHang.create(body)
    .then((khachHang) => khachHang.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  KhachHang.count(query)
    .then(count => KhachHang.find(query, select, cursor)
      .then((khachHangs) => ({
        count,
        rows: khachHangs.map((khachHang) => khachHang.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  KhachHang.findById(params.id)
    .then(notFound(res))
    .then((khachHang) => khachHang ? khachHang.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  KhachHang.findById(params.id)
    .then(notFound(res))
    .then((khachHang) => khachHang ? Object.assign(khachHang, body).save() : null)
    .then((khachHang) => khachHang ? khachHang.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  KhachHang.findById(params.id)
    .then(notFound(res))
    .then((khachHang) => khachHang ? khachHang.remove() : null)
    .then(success(res, 204))
    .catch(next)
