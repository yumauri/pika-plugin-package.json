import { key } from './key'
import { isObject, Json } from './types'

export function evaluate(options: Json, original: Json) {
  if (!isObject(options) || !isObject(original)) return
  for (const k in options) {
    const [_k] = key(k) // get key without modifier
    if (
      Object.prototype.hasOwnProperty.call(options, k) &&
      Object.prototype.hasOwnProperty.call(original, _k)
    ) {
      if (options[k] === '^') {
        options[k] = original[_k]
      } else {
        evaluate(options[k], original[_k]) // we need to go deeper
      }
    }
  }
}
