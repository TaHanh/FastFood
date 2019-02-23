import { LoaiHang } from '.'

let loaiHang

beforeEach(async () => {
  loaiHang = await LoaiHang.create({ name: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = loaiHang.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(loaiHang.id)
    expect(view.name).toBe(loaiHang.name)
    expect(view.key).toBe(loaiHang.key)
    expect(view.description).toBe(loaiHang.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = loaiHang.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(loaiHang.id)
    expect(view.name).toBe(loaiHang.name)
    expect(view.key).toBe(loaiHang.key)
    expect(view.description).toBe(loaiHang.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
