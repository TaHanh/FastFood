import { DonHang } from '.'

let donHang

beforeEach(async () => {
  donHang = await DonHang.create({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', idAdmin: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = donHang.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(donHang.id)
    expect(view.name).toBe(donHang.name)
    expect(view.description).toBe(donHang.description)
    expect(view.statusOrder).toBe(donHang.statusOrder)
    expect(view.statusShip).toBe(donHang.statusShip)
    expect(view.message).toBe(donHang.message)
    expect(view.products).toBe(donHang.products)
    expect(view.idUser).toBe(donHang.idUser)
    expect(view.idAdmin).toBe(donHang.idAdmin)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = donHang.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(donHang.id)
    expect(view.name).toBe(donHang.name)
    expect(view.description).toBe(donHang.description)
    expect(view.statusOrder).toBe(donHang.statusOrder)
    expect(view.statusShip).toBe(donHang.statusShip)
    expect(view.message).toBe(donHang.message)
    expect(view.products).toBe(donHang.products)
    expect(view.idUser).toBe(donHang.idUser)
    expect(view.idAdmin).toBe(donHang.idAdmin)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
