import { Box } from "@chakra-ui/react";
import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <Box
      textAlign={"center"}
      p="5"
      color={"gray.600"}
      borderTop={"1px"}
      borderColor={"gray.100"}
      marginTop={"1rem"}
    >
      {currentYear} (c) Realestate App
    </Box>
  );
};

export default Footer;
