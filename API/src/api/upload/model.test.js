import { Upload } from '.'

let upload

beforeEach(async () => {
  upload = await Upload.create({ file: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = upload.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(upload.id)
    expect(view.file).toBe(upload.file)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = upload.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(upload.id)
    expect(view.file).toBe(upload.file)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
