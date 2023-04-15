import React, { useContext } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} mr={3}>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => {
          scrollPrev();
        }}
        fontSize={"2xl"}
        cursor={"pointer"}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} ml={3}>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => {
          scrollNext();
        }}
        fontSize={"2xl"}
        cursor={"pointer"}
      />
    </Flex>
  );
};

const ImageScrollbar = ({ images }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {images.map((image) => (
        <Box
          key={image.id}
          w={"910px"}
          itemID={image.id}
          overflow={"hidden"}
          p={1}
        >
          <Image
            placeholder={"blur"}
            blurDataURL={image.url}
            src={image.url}
            width={1000}
            height={500}
            alt={`property-${image.id}`}
            sizes="(max-width:500px) 100px, (max-width:1024px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
