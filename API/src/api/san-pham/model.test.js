import { SanPham } from '.'

let sanPham

beforeEach(async () => {
  sanPham = await SanPham.create({ name: 'test', hot: 'test', image: 'test', price: 'test', status: 'test', description: 'test', type: 'test', size: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = sanPham.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sanPham.id)
    expect(view.name).toBe(sanPham.name)
    expect(view.hot).toBe(sanPham.hot)
    expect(view.image).toBe(sanPham.image)
    expect(view.price).toBe(sanPham.price)
    expect(view.status).toBe(sanPham.status)
    expect(view.description).toBe(sanPham.description)
    expect(view.type).toBe(sanPham.type)
    expect(view.size).toBe(sanPham.size)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = sanPham.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sanPham.id)
    expect(view.name).toBe(sanPham.name)
    expect(view.hot).toBe(sanPham.hot)
    expect(view.image).toBe(sanPham.image)
    expect(view.price).toBe(sanPham.price)
    expect(view.status).toBe(sanPham.status)
    expect(view.description).toBe(sanPham.description)
    expect(view.type).toBe(sanPham.type)
    expect(view.size).toBe(sanPham.size)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
