import { BuilderOptions } from '@pika/types'
import { manifest } from './'

const original = {
  a: 'a',
  b: {
    c: 'c',
    d: {
      e: 'e',
    },
  },
  f: ['1', '2', '3'],
}

test('Test manifest merge functionality', async () => {
  expect(
    await manifest(original, {
      options: {
        a: 'aaa',
        b: { '-d': {} },
        '*f': ['-3'],
        license: '^',
      },
      cwd: '../',
    } as BuilderOptions)
  ).toEqual({
    a: 'aaa',
    b: { c: 'c' },
    f: ['1', '2'],
    license: 'MIT',
  })
})
