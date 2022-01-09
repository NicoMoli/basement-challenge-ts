import { useMemo } from "react"
import { StringDecoder } from "string_decoder"
import { Product } from "../types"

const reduceProducts = (items: Product[]) => {
  let totalCountItems = 0
  let totalPrice = 0

  const result = [
    ...items
      .reduce((previous, current) => {
        if (!previous.has(current.id)) {
          previous.set(current.id, { ...current })
        }

        const data = previous.get(current.id)
        if (data && data?.count) {
          data.count++
        } else if (data && !data.count) {
          data.count = 1
        }
        return previous
      }, new Map<String, Product>())
      .values(),
  ]

  result.forEach((item) => {
    totalCountItems += item.count ? item.count : 1
    totalPrice += item.price * (item.count ? item.count : 1)
  })

  return {
    itemsFormatted: result,
    totalCount: totalCountItems,
    totalPrice: totalPrice,
  }
}

export default reduceProducts
