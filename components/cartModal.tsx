import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  StackDivider,
  Flex,
} from "@chakra-ui/react"
import Image from "next/image"
import { Product } from "../types"

interface CartModalProps {
  cart: Product[]
  totalPrice: number
  isOpen: boolean
  closeModal(): void
}

const CartModal = ({
  cart,
  totalPrice,
  isOpen,
  closeModal,
}: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay onClick={closeModal} />
      <Stack
        bg="black"
        borderWidth={2}
        borderColor="white"
        padding={4}
        position="fixed"
        top={0}
        right={0}
        width="100%"
        maxWidth={824}
        zIndex={10000}
      >
        <Button
          variant="link"
          marginLeft="auto"
          onClick={closeModal}
          cursor="pointer"
          fontSize="2xl"
          fontWeight="bold"
          padding={1}
        >
          CLOSE
        </Button>
        <Image
          src={"/your-cart-desktop.svg"}
          width={760}
          height={89}
          alt="Your Cart"
        />
        <Box paddingY={2} maxWidth={790} maxHeight={264}>
          {cart.map((product) => (
            <Stack
              direction="row"
              key={product.id}
              alignItems="center"
              fontSize="xl"
              borderWidth={2}
              borderColor="white"
              margin={3}
            >
              <Box margin={4} bgGradient="linear(to-b, black, #1D1D1D)">
                <Image
                  src={product.image}
                  width={226}
                  height={218}
                  alt="Basement product image"
                />
              </Box>
              <Stack direction="column" width="100%">
                <Text textTransform="uppercase" fontSize="4xl">
                  {product.name}
                </Text>
                <Text>{product.description}</Text>
                <Text>
                  QUANTITY: <Button>ADD</Button>
                </Text>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingRight={3}
                >
                  <Text>SIZE S M L XL</Text>
                  <Text>$ {product.price}</Text>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Box>

        <Stack
          direction="row"
          padding={4}
          borderTopWidth={2}
          borderTopColor="white"
          justifyContent="space-between"
          alignItems="center"
          divider={<StackDivider borderColor="white" />}
        >
          <Text flex={1} fontSize="3xl">
            TOTAL: $ {totalPrice}
          </Text>
          <Image
            src="/checkout.svg"
            width={235}
            height={42}
            alt="Basement checkout"
          />
        </Stack>
      </Stack>
    </Modal>
  )
}

export default CartModal
