import Promise from 'bluebird';
import Alamofire from '../lib/Alamofire';
import Config from '../config/env';
/**
 *Retrieve careers
 *
 * @param
 * @returns
 */
export const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}`;

    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        // console.log('res getCategories' + response)
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};

export const getCustomer = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}${'/' + id}`;
    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};

export const queryCompany = ({ q, limit }) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.companies}` +
      `${q ? '?q=' + q : ''} ` +
      `${limit ? '?limit=' + limit : ''} `;

    return Alamofire.request(
      url,
      'GET',
      {},

      {}
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Tạo một công ty mới
 *
 * @param
 * @returns
 */
export const createCustomer = ({ name, email, phone, address, type }) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}`;

    return Alamofire.request(
      url,
      'POST',
      {
        name,
        email,
        phone,
        address,
        type
      },

      {}
    )
      .then(response => {
        console.log('res1111' + JSON.stringify(response));
        resolve(response);
      })
      .catch(err => {
        console.log('errr' + JSON.stringify(err));
        reject(err);
      });
  });
};

export const updateCustomer = ({ id, name, email, phone, address, type }) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}` + '/' + id;

    return Alamofire.request(
      url,
      'PUT',
      {
        name,
        email,
        phone,
        address,
        type
      },

      {}
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteCustomer = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.customers}${'/' + id}`;
    return Alamofire.request(url, 'DELETE', {}, {})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};
