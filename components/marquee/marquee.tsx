import React from "react"
import { motion } from "framer-motion"
import { Box, BoxProps } from "@chakra-ui/react"

import styles from "./marqueeStyles.module.css"

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 5,
        ease: "linear",
      },
    },
  },
}

const Marquee = () => {
  const MotionBox = motion<BoxProps>(Box)
  return (
    <Box
      borderBottomWidth={2}
      borderColor="white"
      borderTopWidth={2}
      className={styles.marquee}
      fontSize={["20px", "20px", "20px", "35px", "35px"]}
      minHeight={["44px", "44px", "44px", "72px", "72px", "72px"]}
    >
      <MotionBox
        variants={marqueeVariants}
        animate="animate"
        className={styles.track}
      >
        <h1>
          {" "}
          {
            "A man can't have enough basement swag - A man can't have enough basement swag"
          }
        </h1>
      </MotionBox>
    </Box>
  )
}

export default Marquee
