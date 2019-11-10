// define generic Json type
export type Json =
  | null
  | undefined
  | string
  | number
  | boolean
  | JsonArray
  | JsonObject
export interface JsonArray extends Array<Json> {}
export interface JsonObject {
  [key: string]: Json
}

// helper check functions
export const isArray = (o: Json): o is JsonArray => Array.isArray(o)
export const isObject = (o: Json): o is JsonObject =>
  typeof o === 'object' && o !== null && !isArray(o)
