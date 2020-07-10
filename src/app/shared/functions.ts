export const deepCopyObject = (original : any) => {
  if (typeof original !== "object" || original === null) {
    return original
  }

  const deepCopy = Array.isArray(original) ? [] : {}

  for (const key in original) {
    const value = original[key]

    deepCopy[key] = deepCopyObject(value)
  }

  return deepCopy
}