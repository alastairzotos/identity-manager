export const mapRecord = <K extends string, V = number>(obj: Record<K, V>, mapper: (value: V) => V) =>
  Object.keys(obj)
    .reduce((acc, key) => ({
      ...acc,
      [key]: !!obj[key] ? mapper(obj[key]) : obj[key]
    }), {} as Record<K, V>)
