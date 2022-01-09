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
interface Props {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  const MotionBox = motion<BoxProps>(Box)
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclosure()
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const itemsSaved = window.localStorage.getItem("cart")
      if(itemsSaved) {
        const items = JSON.parse(itemsSaved)
        setCart(items)
      }
    }
  }, [])

  const getTotalItems = useMemo(() => {
    return cart.reduce((acum, product) => acum + (product.count ? product.count : 1), 0)
  }, [cart])

  const getTotalPrice = useMemo(() => {
    return cart.reduce((acum, product) => acum + ((product.price) * (product.count ? product.count : 1)), 0)
  }, [cart])

  const handleAddItem = (item : Product) => {
    setCart((prev) => {
      const isItemInTheCart = prev.find((i) => i.id === item.id)
      if (isItemInTheCart) {
        const items =  prev.map((product) =>
         product.id === item.id ? { ...product, count: (product.count ? product.count : 0) + 1 } : product
        )
        
        window.localStorage.setItem("cart", JSON.stringify(items))
        return items
      }

      const newItem = [...prev, { ...item, count: 1 }]
      window.localStorage.setItem("cart", JSON.stringify(newItem))
      return newItem; 
    })
  }

  const handleRemoveItem = (item : Product) => {
    setCart((prev) => {
      const foundItem = prev.find((product) => product.id === item.id);
      if (foundItem) {
        if (foundItem.count === 1) {
          const newArray = prev.filter((i) => i.id !== item.id);

          window.localStorage.setItem("cart", JSON.stringify(newArray))
          return newArray;
        } else {
          const itemsDelete = prev.map((i) =>
            i.id === item.id ? { ...i, count: (i.count ? i.count : 1) - 1 } : i)

          window.localStorage.setItem("cart", JSON.stringify(itemsDelete))
          return itemsDelete
        }
      } else {
        return prev;
      }
    })
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
            CART ({getTotalItems})
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
      <CartModal
        cart={cart}
        totalPrice={getTotalPrice}
        isOpen={isOpen}
        closeModal={closeModal}
        removeProduct={handleRemoveItem}
        addProduct={handleAddItem}
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
