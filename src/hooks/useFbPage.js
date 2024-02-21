import React, { useEffect, useState } from "react";

const useFbPage = (userId, accessToken) => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const getPage = async () => {
      try {
        if (!accessToken) {
          console.error("Access token is required to request this resource.");
          return;
        }

        const response = await fetch(
          `https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`
        );
        const data = await response.json();
        setPageData(data);
        console.log("Fetched page data:", data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    if (userId) {
      getPage();
    }
  }, [userId, accessToken]);
};

export default useFbPage;
