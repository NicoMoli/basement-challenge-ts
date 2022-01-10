import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../chakra/theme"
import Fonts from "../chakra/fonts"
import { NextSeo } from "next-seo"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title="Basement FrontEnd Challenge"
        titleTemplate="Basement FrontEnd Challenge"
        defaultTitle="Basement FrontEnd Challenge"
        description="A front end challenge built on NextJs, react, typescript and Chakra UI"
        canonical="https://basement-challenge-2022.vercel.app/"
        openGraph={{
          url: "https://basement-challenge-2022.vercel.app/",
          title: "Basemente Studio Challenge",
          description:
            "A front end challenge built on NextJs, react, typescript and Chakra UI",
          images: [
            {
              url: "/basement-studio.png",
              width: 800,
              height: 420,
              alt: "Basemente Studio",
            },
          ],
        }}
      />
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
