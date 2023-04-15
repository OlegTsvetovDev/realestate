import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { baseUrl, fetchApi } from "../../services/fetchApi";
import Property from "../../components/Property";

export const Banner = ({
  purpose = "",
  imageUrl = "/",
  title1 = "",
  title2 = "",
  desc1 = "",
  desc2 = "",
  buttonText = "",
  linkName = "",
}) => (
  <Flex
    flexWrap={"wrap"}
    justifyContent={"center"}
    alignItems={"center"}
    m={"10"}
  >
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p={"5"}>
      <Text color={"gray.500"} fontWeight={"medium"} fontSize={"sm"}>
        {purpose}
      </Text>
      <Text fontWeight={"bold"} fontSize={"3xl"}>
        {title1}
        <br />
        {title2}
      </Text>
      <Text
        color={"gray.700"}
        fontSize={"lg"}
        fontWeight={"medium"}
        paddingTop={3}
        paddingBottom={3}
      >
        {desc1}
        <br />
        {desc2}
      </Text>
      <Link href={linkName}>
        <Button
          fontSize={"xl"}
          p=".75rem 2rem"
          colorScheme="blue"
          cursor={"pointer"}
        >
          {buttonText}
        </Button>
      </Link>
    </Box>
  </Flex>
);

export default function Home({ propertyForSale, propertyForRent }) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartaments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?porpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
        {propertyForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy and Own Your"
        title2="Dream Home"
        desc1="Explore Apartaments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?porpose=for-buy"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
        {propertyForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    },
  };
}
