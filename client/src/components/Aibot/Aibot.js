import React, { useEffect } from 'react';

const WatsonAssistantChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "6c7568b4-f0b7-4d1d-9150-edac4a7826f9", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "562ad7e4-eecb-4175-815e-fb3dc89bb84e", // The ID of your service instance.
      onLoad: async (instance) => { await instance.render(); }
    };

    const loadWatsonAssistantChat = () => {
      const script = document.createElement('script');
      script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    };

    // Delay the loading of the script
    const timeout = setTimeout(loadWatsonAssistantChat);

    // Clean up function
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default WatsonAssistantChat;
