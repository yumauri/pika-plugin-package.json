import { key, MODIFIER } from './key'
import { isArray, isObject, Json, JsonArray, JsonObject } from './types'

/**
 * Merge any single value to JsonArray
 */
function merge_value_to_array(array: JsonArray, _value: Json) {
  if (typeof _value === 'string') {
    // value is string, so it can contain modifier
    const [val, mod] = key(_value)
    if (mod === MODIFIER.REMOVE) {
      const i = array.indexOf(val)
      array.splice(i, 1)
    } else {
      // if (mod === MODIFIER.ADD || mod === MODIFIER.MERGE)
      array.push(val)
    }
  } else {
    // value is not string -> just push it to array
    array.push(_value)
  }
}

/**
 * Merge any value to JsonArray
 */
function merge_array(array: JsonArray, _value: Json) {
  const val = isArray(_value) ? _value : [_value]
  for (const v of val) {
    merge_value_to_array(array, v)
  }
}

/**
 * Merge any single value to JsonObject
 */
function merge_value_to_object(object: JsonObject, _key: string, _value: Json) {
  const [k, mod] = key(_key)
  if (mod === MODIFIER.REMOVE) {
    object[k] = undefined
  } else if (mod === MODIFIER.ADD || object[k] == null) {
    object[k] = _value
  } else {
    // if (mod === MODIFIER.MERGE)
    if (isArray(object[k])) {
      merge_array(object[k] as JsonArray, _value)
    } else if (isObject(object[k])) {
      merge_object(object[k] as JsonObject, _value)
    } else {
      object[k] = _value
    }
  }
}

/**
 * Merge any value to JsonObject
 */
function merge_object(object: JsonObject, _value: Json) {
  if (!isObject(_value)) return
  for (const k in _value) {
    if (Object.prototype.hasOwnProperty.call(_value, k)) {
      merge_value_to_object(object, k, _value[k])
    }
  }
}

/**
 * Merge Jsons
 */
export function merge(json: Json, value: Json) {
  if (!isObject(json)) return
  merge_object(json, value)
}
