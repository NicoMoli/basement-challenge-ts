import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "black",
        color: "white",
        lineHeight: "tall",
      },
    },
  },
  fonts: {
    heading: "Basement Grotesque",
    body: "Basement Grotesque",
  },
  components: {
    Button: {
      variants: {
        outline: {
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 56,
        },
      },
    },
  },
})

export default theme
