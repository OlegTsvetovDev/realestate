import React from "react";
import { Box, Flex, Select } from "@chakra-ui/react";
import { filterData, getFilterValues } from "../data/filterData";
import { useRouter } from "next/router";

const SearchFilters = () => {
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const { query, path } = router;
    const filters = getFilterValues(filterValues);
    console.log(filters);

    filters.forEach((filter) => {
      query[filter.name] = filter.value;
    });

    // todo: fast switching filters pass only 1 filter value to the query
    // need to gather all of them in 1 query and then make fetch
    router.push({ pathname: path, query });
  };

  return (
    <Flex bg={"gray.100"} p={4} justifyContent={"center"} flexWrap={"wrap"}>
      {filterData.map((filter) => (
        <Box key={filter.id}>
          <Select
            placeholder={filter.placeholder}
            w={"fit-content"}
            p={2}
            cursor={"pointer"}
            onChange={(e) =>
              searchProperties({
                [filter.queryName]: e.target.value,
              })
            }
          >
            {filter.items.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ cursor: "pointer" }}
              >
                {option.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
