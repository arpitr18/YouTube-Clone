import axios from "axios";

export const fetchTrendingVideos = async (params) => {
  const options = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/v2/trending",
    params:{geo:'IN', type:'now' , lang:'en' , ...params},
    headers: {
      'x-rapidapi-key': 'b7ddcbcf46msh6c84a54e38c5611p1e9eadjsne015c4cc8607',
      "x-rapidapi-host": "youtube138.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.list
  } catch (error) {
    console.error(error);
  }r
};
