import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Realestate App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </Box>
      <footer>Footer</footer>
    </>
  );
};

export default Layout;