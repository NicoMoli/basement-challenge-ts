import {
  Box,
  BoxProps,
  Button,
  Container,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react"
import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Product } from "../types"
import { motion } from "framer-motion"

interface Props {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  const MotionBox = motion<BoxProps>(Box)

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
          <Button variant="outline">CART (0)</Button>
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
            <Box key={product.id} marginLeft={5} marginTop={7}>
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

//VER tema imagenes en next
