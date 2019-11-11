import { evaluate } from './options'

const original = {
  a: 'a',
  b: {
    c: 'c',
    d: {
      e: 'e',
    },
  },
}

test('Test evaluate options from original', () => {
  const options1 = 'test'
  evaluate(options1, original)
  expect(options1).toEqual('test')

  const options2 = {}
  evaluate(options2, original)
  expect(options2).toEqual({})

  const options3 = { e: 'e' }
  evaluate(options3, original)
  expect(options3).toEqual({ e: 'e' })

  const options4 = { a: '^' }
  evaluate(options4, original)
  expect(options4).toEqual({ a: 'a' })

  const options5 = { b: { d: { e: '^' } } }
  evaluate(options5, original)
  expect(options5).toEqual({ b: { d: { e: 'e' } } })

  const options6 = { '*b': { '+d': { '-e': '^' } } }
  evaluate(options6, original)
  expect(options6).toEqual({ '*b': { '+d': { '-e': 'e' } } })
})
