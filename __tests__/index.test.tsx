/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"
import theme from "../chakra/theme"
import Home from "../pages/index"
import { Product } from "../types"
import productsMocks from "../__mocks__/productsMocks.json"

describe("Home", () => {
  it("render home with products", () => {
    render(
      <ThemeProvider theme={theme}>
        <Home products={productsMocks as Product[]} />
      </ThemeProvider>
    )

    const cartButton = screen.getByRole("button", {
      name: /CART/i,
    })

    const logoBasementHeader = screen.getByRole("img", {
      name: /Basement Logo/i,
    })

    const mainHeader = screen.getByRole("img", {
      name: /Header/i,
    })

    const footer = screen.getByRole("img", {
      name: /Footer Basement/i,
    })

    expect(screen.queryAllByTestId("product-container")).toHaveLength(
      productsMocks.length
    )

    expect(cartButton).toBeInTheDocument()
    expect(logoBasementHeader).toBeInTheDocument()
    expect(mainHeader).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })
})
