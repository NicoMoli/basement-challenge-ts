import type { NextApiRequest, NextApiResponse } from 'next'
import products from "../../../products/mock.json"
import { Product } from "../../../types"

type Response = {
  products: Product[]
}

type Error = {
  error: String
}

const getProducts = async (req: NextApiRequest,
  res: NextApiResponse<Response | Error>) => {
  try {
    const responseData = {
      products: await products,
    }

    res.status(200).json(responseData)
  } catch (e) {
    console.log(e)
    res.status(404).json({error: 'NOT FOUND'})
  }
}

export default getProducts
