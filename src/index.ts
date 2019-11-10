import { join } from 'path'
import { BuilderOptions } from '@pika/types'
import { Json } from './types'
import { merge } from './merge'
import { evaluate } from './options'

export async function manifest(
  manifest: Json,
  { options, cwd }: BuilderOptions
): Promise<Json> {
  const original = require(join(cwd, 'package.json')) // tslint:disable-line tsr-detect-non-literal-require
  evaluate(options, original)
  merge(manifest, options)
  return manifest
}
