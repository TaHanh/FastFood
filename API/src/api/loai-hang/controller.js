import { success, notFound } from '../../services/response/'
import { LoaiHang } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  LoaiHang.create(body)
    .then((loaiHang) => loaiHang.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  LoaiHang.count(query)
    .then(count => LoaiHang.find(query, select, cursor)
      .then((loaiHangs) => ({
        count,
        rows: loaiHangs.map((loaiHang) => loaiHang.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  LoaiHang.findById(params.id)
    .then(notFound(res))
    .then((loaiHang) => loaiHang ? loaiHang.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  LoaiHang.findById(params.id)
    .then(notFound(res))
    .then((loaiHang) => loaiHang ? Object.assign(loaiHang, body).save() : null)
    .then((loaiHang) => loaiHang ? loaiHang.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  LoaiHang.findById(params.id)
    .then(notFound(res))
    .then((loaiHang) => loaiHang ? loaiHang.remove() : null)
    .then(success(res, 204))
    .catch(next)
