import { Customer } from '.'

let customer

beforeEach(async () => {
  customer = await Customer.create({ name: 'test', email: 'test', phone: 'test', address: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = customer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(view.name).toBe(customer.name)
    expect(view.email).toBe(customer.email)
    expect(view.phone).toBe(customer.phone)
    expect(view.address).toBe(customer.address)
    expect(view.type).toBe(customer.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = customer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(view.name).toBe(customer.name)
    expect(view.email).toBe(customer.email)
    expect(view.phone).toBe(customer.phone)
    expect(view.address).toBe(customer.address)
    expect(view.type).toBe(customer.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
