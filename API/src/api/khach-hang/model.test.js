import { KhachHang } from '.'

let khachHang

beforeEach(async () => {
  khachHang = await KhachHang.create({ name: 'test', email: 'test', phone: 'test', address: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = khachHang.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(khachHang.id)
    expect(view.name).toBe(khachHang.name)
    expect(view.email).toBe(khachHang.email)
    expect(view.phone).toBe(khachHang.phone)
    expect(view.address).toBe(khachHang.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = khachHang.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(khachHang.id)
    expect(view.name).toBe(khachHang.name)
    expect(view.email).toBe(khachHang.email)
    expect(view.phone).toBe(khachHang.phone)
    expect(view.address).toBe(khachHang.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
