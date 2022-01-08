import { Product } from "../types"

const reduceProducts = (items: Product[]) => {
  let totalCountItems: number = 0
  let totalPrice: number = 0

  var result = [
    ...items
      .reduce((previous, current) => {
        if (!previous.has(current.id))
          previous.set(current.id, { ...current, count: 0 })

        const data = previous.get(current.id) as Product
        if (data?.count) data.count++
        else data.count = 1

        return previous
      }, new Map<String, Product>())
      .values(),
  ]

  result.map((item) => {
    totalCountItems += item.count ? item.count : 0
    totalPrice += item.price * (item.count ? item.count : 1)
  })

  return { items: result, totalCount: totalCountItems, totalPrice: totalPrice }
}

export default reduceProducts
