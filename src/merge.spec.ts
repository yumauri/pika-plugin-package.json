import { cloneDeep } from 'lodash'
import { merge } from './merge'

const original = {
  a: 'a',
  b: {
    c: 'c',
    d: {
      e: 'e',
    },
    f: ['1', '2', '3'],
  },
}

test('Test merge manifest with options', () => {
  const orgn1 = cloneDeep(original)
  merge(orgn1, 'test')
  expect(orgn1).toEqual(original)

  const orgn2 = cloneDeep(original)
  merge(orgn2, { '+a': 'aaa' })
  expect(orgn2).toEqual({ ...original, a: 'aaa' })

  const orgn3 = cloneDeep(original)
  merge(orgn3, { '-a': '' })
  expect(orgn3).toEqual({ ...original, a: undefined })

  const orgn4 = cloneDeep(original)
  merge(orgn4, { '*b': { f: ['-2'] } })
  expect(orgn4).toEqual({ ...original, b: { ...original.b, f: ['1', '3'] } })

  const orgn5 = cloneDeep(original)
  merge(orgn5, { '*b': { f: ['4'] } })
  expect(orgn5).toEqual({
    ...original,
    b: { ...original.b, f: ['1', '2', '3', '4'] },
  })

  const orgn6 = cloneDeep(original)
  merge(orgn6, { '*b': { f: [{ test: 'test' }] } })
  expect(orgn6).toEqual({
    ...original,
    b: { ...original.b, f: ['1', '2', '3', { test: 'test' }] },
  })

  const orgn7 = cloneDeep(original)
  merge(orgn7, { '*b': { '*c': {} } })
  expect(orgn7).toEqual({ ...original, b: { ...original.b, c: {} } })

  const orgn8 = cloneDeep(original)
  merge(orgn8, { '*b': { f: '4' } })
  expect(orgn8).toEqual({
    ...original,
    b: { ...original.b, f: ['1', '2', '3', '4'] },
  })

  const orgn9 = 'test'
  merge(orgn9, { '-b': {} })
  expect(orgn9).toEqual('test')

  const orgn10 = cloneDeep(original)
  function T(this: { a: string }) {
    this.a = 'aaa'
  }
  T.prototype.b = 'bbb'
  merge(orgn10, new T())
  expect(orgn10).toEqual({ ...original, a: 'aaa' })
})
