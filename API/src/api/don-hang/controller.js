import { success, notFound } from '../../services/response/'
import { DonHang } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  DonHang.create(body)
    .then((donHang) => donHang.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DonHang.count(query)
    .then(count => DonHang.find(query, select, cursor)
      .then((donHangs) => ({
        count,
        rows: donHangs.map((donHang) => donHang.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DonHang.findById(params.id)
    .then(notFound(res))
    .then((donHang) => donHang ? donHang.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  DonHang.findById(params.id)
    .then(notFound(res))
    .then((donHang) => donHang ? Object.assign(donHang, body).save() : null)
    .then((donHang) => donHang ? donHang.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  DonHang.findById(params.id)
    .then(notFound(res))
    .then((donHang) => donHang ? donHang.remove() : null)
    .then(success(res, 204))
    .catch(next)
