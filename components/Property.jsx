import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { BsGridFill } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";

import DefaultImage from "../assets/images/house.jpg";
import millify from "millify";

const Property = ({
  property: {
    externalID,
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex
      flexWrap={"wrap"}
      width={"420px"}
      justifyContent={"center"}
      cursor={"pointer"}
    >
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          width={400}
          height={220}
          alt={`${title}-photo`}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box w="full" p={"0 15px"}>
        <Flex pt={2} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Box pr={3} color={"green.400"}>
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              AED {millify(price)}
              {rentFrequency ? ` / ${rentFrequency}` : ""}
            </Text>
          </Flex>
          <Box>
            <Avatar size={"sm"} src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems={"center"}
          p={1}
          justifyContent={"space-between"}
          w={250}
          color={"blue.500"}
        >
          {rooms}
          <FaBed />
          &nbsp;&nbsp;| {baths}
          <FaBath /> | {millify(area)}sqft <BsGridFill />
        </Flex>
        <Text fontSize={"lg"}>
          {title.length > 30 ? `${title.substring(0, 30)} ...` : title}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
