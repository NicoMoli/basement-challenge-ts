import { useMemo, useState, useEffect } from "react"
import {
  Box,
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
import { Product } from "../types"
import CartModal from "../components/cartModal/cartModal"
import Marquee from "../components/marquee/marquee"
interface Props {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclosure()
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const itemsSaved = window.localStorage.getItem("cart")
      if (itemsSaved) {
        const items = JSON.parse(itemsSaved)
        setCart(items)
      }
    }
  }, [])

  const getTotalItems = useMemo(() => {
    return cart.reduce(
      (acum, product) => acum + (product.count ? product.count : 1),
      0
    )
  }, [cart])

  const getTotalPrice = useMemo(() => {
    return cart.reduce(
      (acum, product) =>
        acum + product.price * (product.count ? product.count : 1),
      0
    )
  }, [cart])

  const handleAddItem = (item: Product) => {
    setCart((prev) => {
      const isItemInTheCart = prev.find((i) => i.id === item.id)
      if (isItemInTheCart) {
        const items = prev.map((product) =>
          product.id === item.id
            ? { ...product, count: (product.count ? product.count : 0) + 1 }
            : product
        )

        window.localStorage.setItem("cart", JSON.stringify(items))
        return items
      }

      const newItem = [...prev, { ...item, count: 1 }]
      window.localStorage.setItem("cart", JSON.stringify(newItem))
      return newItem
    })
  }

  const handleRemoveItem = (item: Product) => {
    setCart((prev) => {
      const foundItem = prev.find((product) => product.id === item.id)
      if (foundItem) {
        if (foundItem.count === 1) {
          const newArray = prev.filter((i) => i.id !== item.id)

          window.localStorage.setItem("cart", JSON.stringify(newArray))
          return newArray
        } else {
          const itemsDelete = prev.map((i) =>
            i.id === item.id ? { ...i, count: (i.count ? i.count : 1) - 1 } : i
          )

          window.localStorage.setItem("cart", JSON.stringify(itemsDelete))
          return itemsDelete
        }
      } else {
        return prev
      }
    })
  }

  return (
    <>
      <Container maxWidth="100vw" paddingTop={6}>
        <Stack width="100%">
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
              CART ({getTotalItems})
            </Button>
          </Stack>
          <Stack as="header" marginBottom="100px !important">
            <Box paddingBottom={5} margin="auto" maxWidth={1376}>
              <Image
                src={"/header.svg"}
                width={1376}
                height={360}
                alt="Header"
              />
            </Box>

            <Box
              position="absolute"
              width={144}
              top="28.5%"
              left="17%"
              zIndex={1}
              display={["none", "none", "none", "block"]}
            >
              <Image
                src={"/asterisk-left.svg"}
                width={144}
                height={144}
                alt="Basement asterisk left"
              />
            </Box>

            <Box
              position="absolute"
              width={144}
              top="23%"
              left="76%"
              zIndex={1}
              display={["none", "none", "none", "block"]}
            >
              <Image
                src={"/asterisk-right.svg"}
                width={144}
                height={144}
                alt="Basement asterisk right"
              />
            </Box>

            <Marquee />
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
                onClick={() => handleAddItem(product)}
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
      </Container>
      <CartModal
        cart={cart}
        totalPrice={getTotalPrice}
        isOpen={isOpen}
        closeModal={closeModal}
        removeProduct={handleRemoveItem}
        addProduct={handleAddItem}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, any> = async () => {
  try {
    const host = process.env["HOST"]
    const apiURL = "/api/products/getProductList"
    const res = await fetch(`${host}${apiURL}`)

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
