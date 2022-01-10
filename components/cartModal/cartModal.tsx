import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  Stack,
  Text,
  StackDivider,
  Flex,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react"
import Image from "next/image"
import { Product } from "../../types"

interface CartModalProps {
  cart: Product[]
  totalPrice: number
  isOpen: boolean
  closeModal(): void
  addProduct(item: Product): void
  removeProduct(item: Product): void
}

const fontTextSizes = ["11px", "12px", "21px", "21px", "21px", "21px"]
const fontSizeName = ["14px", "14px", "35px", "35px", "35px", "35px"]
const fontSizeFooter = ["20px", "20px", "20px", "35px", "35px", "35px"]
const fontSizeQuantity = ["11px", "14px", "21px", "21px", "21px", "21px"]
const justifyContentRes = [
  "space-between",
  "space-between",
  "flex-start",
  "flex-start",
  "flex-start",
  "flex-start",
]

const CartModal = ({
  cart,
  totalPrice,
  isOpen,
  closeModal,
  addProduct,
  removeProduct,
}: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} scrollBehavior={"inside"}>
      <ModalOverlay onClick={closeModal} />
      <ModalContent
        top={0}
        right={0}
        position="fixed"
        marginTop={0}
        width="100%"
        maxWidth={824}
      >
        <ModalBody
          padding={0}
          height="auto"
          borderColor="white"
          borderBottomWidth={2}
        >
          <Stack
            bg="black"
            borderWidth={2}
            borderTopWidth={0}
            borderColor="white"
            width="100%"
            maxWidth={824}
          >
            <Button
              variant="none"
              marginLeft="auto"
              onClick={closeModal}
              cursor="pointer"
              padding={5}
              marginBottom={4}
            >
              <Image
                src={"/closeIcon.svg"}
                width={126}
                height={19}
                alt="Close Modal"
              />
            </Button>

            <Image
              src={"/your-cart-desktop.svg"}
              width={760}
              height={89}
              alt="Your Cart"
            />
            <Box minHeight={100}>
              {cart?.map((product) => (
                <Stack
                  direction="row"
                  key={product.id}
                  alignItems="center"
                  fontSize="xl"
                  borderWidth={2}
                  borderColor="white"
                  margin={7}
                  maxHeight={[172, 264, 264, 264, 264]}
                  maxWidth={[343, 700, 700, 760, 760]}
                >
                  <Box
                    margin={[2, 2, 4, 4, 4]}
                    bgGradient="linear(to-b, black, #1D1D1D)"
                    minWidth={[98, 98, 231, 231, 231]}
                  >
                    <Image
                      src={product.image}
                      width={226}
                      height={218}
                      alt="Basement product image"
                    />
                  </Box>
                  <Stack
                    direction="column"
                    width="100%"
                    minHeight={[110, 110, 110, 234, 234, 234]}
                    justifyContent="space-between"
                  >
                    <Text
                      textTransform="uppercase"
                      fontSize={fontSizeName}
                      margin={0}
                    >
                      {product.name}
                    </Text>
                    <Text color="#999999" margin="0px" fontSize={fontTextSizes}>
                      {product.description}
                    </Text>

                    <Stack direction="row" paddingTop={[0, 0, 0, 14, 14, 14]}>
                      <Text
                        marginRight={3}
                        alignSelf="center"
                        fontSize={fontSizeQuantity}
                      >
                        QUANTITY:{" "}
                      </Text>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={100}
                        borderColor="white"
                        borderWidth={2}
                        maxWidth={[81, 81, 92, 92, 92, 92]}
                        maxHeight={35}
                        width="auto"
                        paddingX={1}
                      >
                        <Button
                          width="auto"
                          variant="none"
                          fontSize={fontTextSizes}
                          onClick={() => {
                            removeProduct(product)
                          }}
                          paddingLeft="9px !important"
                        >
                          -
                        </Button>
                        <Text margin="0px !important" fontSize={fontTextSizes}>
                          {product.count || 0}
                        </Text>
                        <Button
                          variant="none"
                          width="auto"
                          marginLeft="0px !important"
                          onClick={() => {
                            addProduct(product)
                          }}
                          paddingRight="9px !important"
                          fontSize={fontTextSizes}
                        >
                          +
                        </Button>
                      </Stack>
                    </Stack>
                    <Stack
                      direction={["column", "column", "row", "row", "row"]}
                      justifyContent="space-between"
                      alignItems={[
                        "baseline",
                        "baseline",
                        "center",
                        "center",
                        "center",
                      ]}
                      paddingRight={3}
                    >
                      <Flex flexDirection="row">
                        <Text fontSize={fontTextSizes} marginRight={3}>
                          SIZE:{" "}
                        </Text>
                        <Text
                          fontSize={fontTextSizes}
                          paddingX={2}
                          borderColor="white"
                          borderWidth={1}
                          borderRadius={99999}
                        >
                          S
                        </Text>
                        <Text fontSize={fontTextSizes} paddingX={2}>
                          M
                        </Text>
                        <Text fontSize={fontTextSizes} paddingX={2}>
                          L
                        </Text>
                        <Text fontSize={fontTextSizes} paddingX={2}>
                          XL
                        </Text>
                      </Flex>

                      <Text fontSize={fontSizeName}>$ {product.price}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Box>

            <Stack
              direction={["column", "column", "row", "row", "row"]}
              paddingLeft={7}
              paddingRight={3}
              borderTopWidth={[0, 0, 2, 2, 2]}
              borderTopColor="white"
              justifyContent="space-between"
              alignItems="center"
              divider={<StackDivider borderColor="white" />}
              height={[null, null, "88px", "88px", "88px", "88px"]}
            >
              <Flex
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent={justifyContentRes}
              >
                <Text fontSize={fontSizeFooter} paddingRight={2}>
                  TOTAL:
                </Text>
                <Text fontSize={fontSizeFooter}>$ {totalPrice}</Text>
              </Flex>
              <Box paddingX={5}>
                <Image
                  src="/checkout.svg"
                  width={235}
                  height={42}
                  alt="Basement checkout"
                />
              </Box>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CartModal
