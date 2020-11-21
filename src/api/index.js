const data = import('../data/store')

export async function loadData(timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  })
}
