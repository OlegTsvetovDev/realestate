import axios from "axios";

export const baseUrl = `https://bayut.p.rapidapi.com`;

const options = {
  headers: {
    "X-RapidAPI-Key": "15dda18599msh1fcdea5364ec4aep194886jsn88bf55a95f78",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
};

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, options);

  return data;
};
