import React, { useState, useEffect } from "react";

const FbLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);
  const [integrationId, setIntegrationId] = useState(null);

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "434177738955192",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          setIsLoggedIn(true);
          setLoginResponse(response);
          setIntegrationId(response.authResponse.graphDomain);
        }
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogoutClick = () => {
    if (!window.FB) return;
    window.FB.logout(function (response) {
      setIsLoggedIn(false);
      setLoginResponse(null);
      setIntegrationId(null);
    });
  };

  const handleReplyClick = () => {
    // Functionality for replying to messages
    console.log("Reply to messages clicked");
  };

  return (
    <div>
      <div className="h-screen w-screen object-cover absolute bg-blue-900 ">
        <form
          className="absolute bg-white w-5/6 md:w-2/6 p-12 my-36  mx-auto right-0 left-0 rounded-xl z-20 text-black"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="flex justify-center pb-5 text-xl">
            Facebook Page Integration
          </h1>
          {isLoggedIn && (
            <p className="flex justify-center pb-5 font-semibold">
              Integrated Page: {integrationId}
            </p>
          )}
          {isLoggedIn ? (
            <div>
              <button
                className="p-4 my-2 bg-red-500 w-full rounded-lg text-white transition-colors ease-in-out hover:bg-red-700 hover:text-white"
                onClick={handleLogoutClick}
              >
                Delete Integration
              </button>
              <button
                className="p-4 my-2 bg-blue-500 w-full rounded-lg text-white transition-colors ease-in-out hover:bg-blue-700 hover:text-white"
                onClick={handleReplyClick}
              >
                Reply to Messages
              </button>
            </div>
          ) : (
            <button
              className="p-4 my-2 bg-blue-900 w-full rounded-lg text-white transition-colors ease-in-out hover:bg-blue-700 hover:text-white"
              onClick={() => {
                window.FB &&
                  window.FB.login((response) => {
                    if (response.authResponse) {
                      setIsLoggedIn(true);
                      setLoginResponse(response);
                      setIntegrationId(response.authResponse.graphDomain);
                    }
                  });
              }}
            >
              Login with Facebook
            </button>
          )}
        </form>
      </div>
      {/* Display login response */}
      {loginResponse && (
        <div>
          <h2>Login Response:</h2>
          <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FbLogin;
