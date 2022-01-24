/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"
import theme from "../chakra/theme"
import CartModal from "../components/cartModal/cartModal"
import { Product } from "../types"
import cartProductsMock from "../__mocks__/cartProductsMock.json"

describe("Cart", () => {
  it("render cart with products selected", () => {
    const handleClose = jest.fn()
    const addProduct = jest.fn()
    const removeProduct = jest.fn()

    render(
      <ThemeProvider theme={theme}>
        <CartModal
          cart={cartProductsMock as Product[]}
          totalPrice={0}
          isOpen={true}
          closeModal={handleClose}
          addProduct={addProduct}
          removeProduct={removeProduct}
        />
      </ThemeProvider>
    )

    const modalContainer = screen.queryByTestId("modal-container")
    const cartCloseButton = screen.queryByTestId("modal-close-btn")
    const yourCartImg = screen.getByRole("img", {
      name: /Your Cart/i,
    })
    const basementCheckout = screen.getByRole("img", {
      name: /Basement checkout/i,
    })
    const totalPriceLabel = screen.getByText("TOTAL:")

    expect(screen.queryAllByTestId("products-on-cart")).toHaveLength(
      cartProductsMock.length
    )

    expect(modalContainer).toBeInTheDocument()
    expect(cartCloseButton).toBeInTheDocument()
    expect(yourCartImg).toBeInTheDocument()
    expect(totalPriceLabel).toBeInTheDocument()
    expect(basementCheckout).toBeInTheDocument()
  })
})
