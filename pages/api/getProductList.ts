import products from "../../products/mock.json"
import { Product } from "../../types"

const getProducts = async (req: any, res: any) => {
  try {
    const responseData = {
      products: await products,
    }

    res.status(200).json(responseData)
  } catch (e) {
    console.log(e)
    res.status(404).json("NOT FOUND")
  }
}

export default getProducts
