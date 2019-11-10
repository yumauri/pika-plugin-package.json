import { key, MODIFIER } from './key'

test('Test keys with modifiers', () => {
  expect(key('+author')).toEqual(['author', MODIFIER.ADD])
  expect(key('-author')).toEqual(['author', MODIFIER.REMOVE])
  expect(key('*author')).toEqual(['author', MODIFIER.MERGE])
  expect(key('++author')).toEqual(['+author', MODIFIER.ADD])
  expect(key('--author')).toEqual(['-author', MODIFIER.REMOVE])
  expect(key('**author')).toEqual(['*author', MODIFIER.MERGE])
  expect(key('\\+author')).toEqual(['+author', MODIFIER.MERGE])
  expect(key('\\-author')).toEqual(['-author', MODIFIER.MERGE])
  expect(key('\\*author')).toEqual(['*author', MODIFIER.MERGE])
  expect(key('\\\\+author')).toEqual(['\\+author', MODIFIER.MERGE])
  expect(key('\\\\-author')).toEqual(['\\-author', MODIFIER.MERGE])
  expect(key('\\\\*author')).toEqual(['\\*author', MODIFIER.MERGE])
  expect(key('author')).toEqual(['author', MODIFIER.MERGE])
  expect(key('a')).toEqual(['a', MODIFIER.MERGE])
  expect(key('')).toEqual(['', MODIFIER.MERGE])
})
