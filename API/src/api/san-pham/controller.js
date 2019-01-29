import { success, notFound } from '../../services/response/'
import { SanPham } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  SanPham.create(body)
    .then((sanPham) => sanPham.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  SanPham.count(query)
    .then(count => SanPham.find(query, select, cursor)
      .then((sanPhams) => ({
        count,
        rows: sanPhams.map((sanPham) => sanPham.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  SanPham.findById(params.id)
    .then(notFound(res))
    .then((sanPham) => sanPham ? sanPham.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  SanPham.findById(params.id)
    .then(notFound(res))
    .then((sanPham) => sanPham ? Object.assign(sanPham, body).save() : null)
    .then((sanPham) => sanPham ? sanPham.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  SanPham.findById(params.id)
    .then(notFound(res))
    .then((sanPham) => sanPham ? sanPham.remove() : null)
    .then(success(res, 204))
    .catch(next)
