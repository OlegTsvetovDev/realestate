import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { FaBath, FaBed } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

import { baseUrl, fetchApi } from "../../../services/fetchApi";
import ImageScrollbar from "../../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    amenities,
    photos,
    furnishingStatus,
  },
}) => {
  if (!price || !photos)
    return <div>Something went wrong. Try again later.</div>;

  return (
    <Box maxWidth={"1000px"} margin={"auto"} p={4}>
      {photos && <ImageScrollbar images={photos} />}
      <Box w={"full"} p={6}>
        <Flex mt={"1rem"} direction={"column"} w={"100%"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Box paddingRight={3} color={"green.400"}>
                {isVerified && <GoVerified />}
              </Box>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                AED {millify(price)}
              </Text>
            </Flex>
            <Box>
              <Avatar size={"sm"} src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex alignItems={"center"} p={1} direction={"row"}>
            <Text marginRight={2}>{rooms}</Text>
            <FaBed />
            <Text marginRight={5} marginLeft={5}>
              |
            </Text>
            <Text marginRight={2}>{baths}</Text>
            <FaBath />
            <Text marginRight={5} marginLeft={5}>
              |
            </Text>
            <Text marginRight={2}>{millify(area)} sqft</Text>
            <BsGridFill />
          </Flex>
          <Flex direction={"column"} mt={"3rem"}>
            <Text
              size={"lg"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              mb={3}
            >
              {title}
            </Text>
            <Text lineHeight={2} color={"gray.600"}>
              {description}
            </Text>
          </Flex>
          <Flex
            flexWrap={"wrap"}
            textTransform={"uppercase"}
            mt={"1rem"}
            justifyContent={"space-between"}
          >
            <Flex
              justifyContent={"space-between"}
              w={"49%"}
              borderBottom={"1px"}
              borderColor={"gray.100"}
              p={3}
            >
              <Text>Type</Text>
              <Text fontWeight={"bold"}>{type}</Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              w={"49%"}
              borderBottom={"1px"}
              borderColor={"gray.100"}
              p={3}
            >
              <Text>Purpose</Text>
              <Text fontWeight={"bold"}>{purpose}</Text>
            </Flex>
            {furnishingStatus && (
              <Flex
                justifyContent={"space-between"}
                w={"49%"}
                borderBottom={"1px"}
                borderColor={"gray.100"}
                p={3}
              >
                <Text>Furnishing Status</Text>
                <Text fontWeight={"bold"}>{furnishingStatus}</Text>
              </Flex>
            )}
          </Flex>
          <Box mt={"3rem"}>
            {amenities && (
              <>
                <Text fontSize={"2xl"} fontWeight={"black"}>
                  Amenities
                </Text>
                <Flex justifyContent={"flex-start"} wrap={"wrap"}>
                  {amenities.map((item) => {
                    return item.amenities.map((amenity) => {
                      // console.log(amenity);
                      return (
                        <Text
                          w={"auto"}
                          key={amenity.text}
                          fontWeight={"bold"}
                          color={"blue.400"}
                          fontSize={".75rem"}
                          p={2}
                          bg={"gray.200"}
                          m={1}
                          borderRadius={5}
                        >
                          {amenity.text}
                        </Text>
                      );
                    });
                  })}
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const url = `${baseUrl}/properties/detail?externalID=${id}`;
  const data = await fetchApi(url);

  if (data === undefined) {
    console.log("Data returned from serverSideProps is undefined: ", url);
    return {
      props: {
        propertyDetails: {},
      },
    };
  }

  return {
    props: {
      propertyDetails: data,
    },
  };
}
