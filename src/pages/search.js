import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "../../components/SearchFilters";
import Property from "../../components/Property";
import Noresult from "../../assets/images/noresult.svg";
import { baseUrl, fetchApi } from "../../services/fetchApi";

const Search = ({ properties }) => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Box>
      <Flex
        bg={"gray.100"}
        borderBottom={"1px"}
        borderColor={"gray.200"}
        p={2}
        fontWeight={"black"}
        fontSize={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text>Search Property By Filters</Text>
        <Icon
          cursor={"pointer"}
          pl={2}
          w={7}
          as={BsFilter}
          onClick={() => setShowFilters(!showFilters)}
        />
      </Flex>
      {showFilters && <SearchFilters />}
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        Properties {router.query.purpose?.split("-")?.join(" ")}
      </Text>
      <Flex flexWrap={"wrap"}>
        {properties?.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      {properties?.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          mt={5}
          mb={5}
        >
          <Image alt="no result" src={Noresult} />
          No Properties Found
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  //   console.log(query);

  let data;
  try {
    const purpose = query.purpose || "for-rent";
    const rentFrequency = query.rentFrequency || "monthly";
    const priceMin = query.minPrice || "0";
    const priceMax = query.maxPrice || "1000000";
    const roomsMin = query.roomsMin || "0";
    const bathsMin = query.bathsMin || "0";
    const sort = query.sort || "price-desc";
    const areaMax = query.areaMax || "35000";
    const locationExternalIDs = query.locationExternalIDs || "5002";
    const categoryExternalIDs = query.categoryExternalIDs || "4";
    const url =
      `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}` +
      `&purpose=${purpose}&categoryExternalIDs=${categoryExternalIDs}&bathsMin=${bathsMin}` +
      `&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}` +
      `&roomsMin=${roomsMin}&areaMax=${areaMax}&sort=${sort}`;

    data = await fetchApi(url);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      properties: data?.hits,
    },
  };
}
