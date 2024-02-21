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

  return (
    <div className="flex h-screen">
      {/* Left column: Conversations list */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        {/* Conversations list goes here */}
        {/* Example conversation item */}
        <div className="border-b border-gray-300 pb-4">
          <div className="font-semibold">Conversation 1</div>
          <div>Last message preview</div>
        </div>
        <div className="border-b border-gray-300 pb-4">
          <div className="font-semibold">Conversation 2</div>
          <div>Last message preview</div>
        </div>
        {/* More conversation items */}
      </div>

      {/* Center: Conversation thread */}
      <div className="w-1/2 border-l border-r border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Conversation Thread</h2>
        {/* Conversation thread goes here */}
        {/* Example message */}
        <div className="mb-2">
          <div className="font-semibold">Sender Name</div>
          <div>Message content</div>
        </div>
        {/* More messages */}
      </div>

      {/* Right column: Customer's profile */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Customer's Profile</h2>
        {/* Customer's profile details go here */}
        {/* Example profile details */}
        <div className="mb-2">
          <div className="font-semibold">Customer Name</div>
          <div>Email: customer@example.com</div>
          <div>Phone: +1234567890</div>
          {/* Additional profile details */}
        </div>
      </div>
    </div>
  );
};

export default AgentScreen;
