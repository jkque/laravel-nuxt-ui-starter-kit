export default function (source: Record<any, unknown> = {}, data: Record<any, unknown> = {}) {
  const cloneData = JSON.parse(JSON.stringify(data))

  Object.keys(source).forEach((key) => {
    if (cloneData[key] !== undefined) {
      source[key] = cloneData[key]
    }
  })
}
