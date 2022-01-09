import { useMemo, useState, useEffect, useCallback } from "react"
import {
  Box,
  BoxProps,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Product } from "../types"
import { motion } from "framer-motion"
import CartModal from "../components/cartModal"
import reduceProducts from "../helpers/reduceProducts"

interface Props {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  const MotionBox = motion<BoxProps>(Box)
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclosure()
  const [cart, setCart] = useState<Product[]>([])
  const [cartFormatted, setCartFormatted] = useState<Set<Product>>()
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  let setData: Set<Product> = new Set()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const itemsSaveLocally = window.localStorage.getItem("cart")
      if (itemsSaveLocally) {
        let productsSave = JSON.parse(itemsSaveLocally) as Product[]
      }
    }
  }, [])

  const addItem = (item: Product) => {
    const itemsOnState = [...cart]
    itemsOnState.push(item)
    setProducts(itemsOnState, item)
  }

  const changeQuantity = (type: String, item: Product) => {
    const itemsOnState = [...cart]

    if (type === "add") {
      itemsOnState.push(item)
      setProducts(itemsOnState, item)
    } else {
      const index = itemsOnState.findIndex((r) => r.id === item.id)

      if (index !== -1) {
        itemsOnState.splice(index, 1)
        setProducts(itemsOnState, item)
      }
    }
  }

  const handleStates = (
    setData: Set<Product>,
    items: Product[],
    totalCount: number,
    totalPrice: number
  ) => {
    setCartFormatted(setData)
    setCart(items)
    setTotalItems(totalCount)
    setTotalPrice(totalPrice)
  }

  const getTotals = (setData: Set<Product>) => {
    let totalCountItems = 0
    let totalPrice = 0
    setData.forEach((item) => {
      totalCountItems += item.count ? item.count : 1
      totalPrice += item.price * (item.count ? item.count : 1)
    })

    return { totalCountItems, totalPrice }
  }

  const setProducts = (productsItems: Product[], item: Product) => {
    const countItems = productsItems.filter((p) => p.id === item.id).length
    productsItems.map((c) => {
      if (c.id === item.id) c.count = countItems
      setData.add(c)
    })

    const { totalCountItems, totalPrice } = getTotals(setData)
    handleStates(setData, productsItems, totalCountItems, totalPrice)
    window.localStorage.setItem("cart", JSON.stringify(productsItems))
  }

  const marqueeVariants = {
    animate: {
      x: [0, -1350],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 8,
          ease: "linear",
        },
      },
      // https://www.framer.com/docs/transition/
      // https://dev.to/holdmypotion/react-marquee-in-framer-motion-3d5a
    },
  }

  return (
    <Container maxWidth="95vw" paddingTop={6}>
      <Stack>
        <Stack
          as="nav"
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          paddingBottom={5}
        >
          <Box display={["none", "none", "none", "block"]}>
            {" "}
            <Image
              alt="Basement Logo"
              src={"/basement-logo.svg"}
              width={192}
              height={28}
            />
          </Box>
          <Box display={["block", "block", "block", "none"]}>
            {" "}
            <Image
              alt="Basement Logo Mobile"
              src={"/logo-basement-mobile.svg"}
              width={43}
              height={40}
            />
          </Box>
          <Box display={["none", "none", "none", "block"]}>
            {" "}
            <Image
              alt="Basement Header"
              src={"/icons-group.svg"}
              width={283}
              height={24}
            />
          </Box>
          <Button variant="outline" onClick={openModal}>
            CART ({totalItems})
          </Button>
        </Stack>
        <Stack as="header">
          <Image src={"/header.svg"} width={1300} height={360} alt="Header" />
          <Box borderBottomWidth={2} borderColor="white" borderTopWidth={2}>
            <MotionBox
              fontSize={["1sm", "1sm", "1sm", "2xl", "2xl"]}
              drag="x"
              variants={marqueeVariants}
              animate="animate"
            >
              {
                "A man can't have enough basement swag - A man can't have enough basement swag"
              }
            </MotionBox>
          </Box>
        </Stack>
        <Flex
          direction={["column", "column", "column", "row", "row"]}
          justifyContent="center"
          alignItems="center"
        >
          {products.map((product: Product) => (
            <Box
              key={product.id}
              marginLeft={5}
              marginTop={7}
              cursor="pointer"
              onClick={() => addItem(product)}
            >
              <Stack>
                {" "}
                <Box
                  margin="auto"
                  bgGradient="linear(to-b, black, #1D1D1D)"
                  borderBottomWidth={2}
                >
                  {" "}
                  <Image
                    src={product.image}
                    width={435}
                    height={468}
                    alt={product.name}
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                marginTop={2}
              >
                <Text>{product.name}</Text>
                <Text>$ {product.price}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Image
          src={"/footer.svg"}
          width={1376}
          height={486}
          alt="Footer Basement"
        />
      </Stack>
      <CartModal
        cart={cartFormatted}
        totalPrice={totalPrice}
        isOpen={isOpen}
        closeModal={closeModal}
        changeQuantity={changeQuantity}
      />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props, any> = async () => {
  try {
    // TODO: Read URL from .env
    const res = await fetch(
      "https://mvp-next-js.vercel.app/api/products/getProductList"
    )

    const products = await res.json()

    if (!products) {
      return {
        props: { notFound: true },
      }
    }

    return {
      props: products,
    }
  } catch (error) {
    return {
      props: {
        notFound: true,
        error: "Ha ocurrido un error inesperado, intente mas tarde!",
      },
    }
  }
}

export default Home
