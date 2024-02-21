import React from "react";

const useFbPage = (userId, accessToken) => {
  const getPage = async () => {
    const data = await fetch(
      "https://graph.facebook.com/" + userId + "/accounts"
    );
    const json = await data.json();

    const filterData = json.results;
    return <div>useFbPage</div>;
  };
};

export default useFbPage;
