import React from "react";
import useFbConnect from "../hooks/useFbConnect";

const AgentScreen = () => {
  async function fetchConversations() {
    const latestApiVersion = "v12.0"; // Replace with the latest API version
    const pageId = "YOUR_PAGE_ID"; // Replace with your Facebook Page ID
    const platform = "PLATFORM"; // Replace with the platform you're accessing the API from
    const accessToken = "authResponse.accessToken"; // Replace with your Page Access Token

    const url = `https://graph.facebook.com/${latestApiVersion}/${pageId}/conversations?platform=${platform}&access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return null;
    }
  }

  return <div>AgentScreen</div>;
};

export default AgentScreen;
