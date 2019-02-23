import { success, notFound } from '../../services/response/'
import { Upload } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Upload.create(body)
    .then((upload) => upload.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Upload.count(query)
    .then(count => Upload.find(query, select, cursor)
      .then((uploads) => ({
        count,
        rows: uploads.map((upload) => upload.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Upload.findById(params.id)
    .then(notFound(res))
    .then((upload) => upload ? upload.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Upload.findById(params.id)
    .then(notFound(res))
    .then((upload) => upload ? Object.assign(upload, body).save() : null)
    .then((upload) => upload ? upload.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Upload.findById(params.id)
    .then(notFound(res))
    .then((upload) => upload ? upload.remove() : null)
    .then(success(res, 204))
    .catch(next)
