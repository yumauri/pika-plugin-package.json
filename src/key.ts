export enum MODIFIER {
  ADD,
  REMOVE,
  MERGE,
}

/**
 * By key - get modifier and real key
 */
export function key(key: string): [string, MODIFIER] {
  // key is too short to have modifier -> MERGE
  if (!key || key.length <= 1) {
    return [key, MODIFIER.MERGE]
  }

  // key has modifier (or escape) -> get modifier value
  if (key[0] === '+' || key[0] === '-' || key[0] === '*' || key[0] === '\\') {
    return [
      key.substring(1),
      key[0] === '+'
        ? MODIFIER.ADD
        : key[0] === '-'
        ? MODIFIER.REMOVE
        : MODIFIER.MERGE,
    ]
  }

  // by default -> MERGE
  return [key, MODIFIER.MERGE]
}
