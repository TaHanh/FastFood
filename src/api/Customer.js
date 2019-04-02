import Promise from 'bluebird'
import Alamofire from '../lib/Alamofire'
import Config from '../config/env'
/**
 *Retrieve careers
 *
 * @param
 * @returns
 */
export const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}`

    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        // console.log('res getCategories' + response)
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}

export const getCustomer = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}${'/' +
      id}`
    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}
export const getCustomerByEmail = email => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${
      Config.api.path.base.customers
    }${'/check-email/' + email}`
    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const queryUser = ({ page, limit, query }) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.customers}` +
      `${page ? '?page=' + page : ''}` +
      `${limit ? '&limit=' + limit : ''}` +
      `${query ? query : ''}`

    return Alamofire.request(
      url,
      'GET',
      {},

      {}
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Tạo một công ty mới
 *
 * @param
 * @returns
 */
export const createCustomer = ({
  name,
  useName,
  avatar,
  email,
  phone,
  address,
  type,
  role,
  password
}) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}`

    return Alamofire.request(
      url,
      'POST',
      {
        name,
        useName,
        avatar,
        email,
        phone,
        address,
        type,
        role,
        password
      },

      {}
    )
      .then(response => {
        console.log('res1111' + JSON.stringify(response))
        resolve(response)
      })
      .catch(err => {
        console.log('errr' + JSON.stringify(err))
        reject(err)
      })
  })
}

export const updateCustomer = ({
  id,
  name,
  useName,
  avatar,
  email,
  phone,
  address,
  type,
  role,
  password
}) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.customers}` + '/' + id

    return Alamofire.request(
      url,
      'PUT',
      {
        name,
        useName,
        avatar,
        email,
        phone,
        address,
        type,
        role,
        password
      },

      {}
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const deleteCustomer = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}${'/' +
      id}`
    return Alamofire.request(url, 'DELETE', {}, {})
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}
