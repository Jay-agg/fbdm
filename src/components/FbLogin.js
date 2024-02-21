import React, { useState, useEffect } from "react";
import useFbConnect from "../hooks/useFbConnect";
import { Link } from "react-router-dom";
import useFbPage from "../hooks/useFbPage";
import { useDispatch } from "react-redux";
import { addData } from "../utils/fbSlice";

const FbLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);
  const [integrationId, setIntegrationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();

  useFbConnect();

  useEffect(() => {
    // Call the pageInfo function when loginResponse changes
    if (loginResponse) {
      pageInfo();
      dispatch(addData(loginResponse));
    }
  }, [loginResponse]);

  const handleLogoutClick = () => {
    if (!window.FB) return;
    window.FB.logout(function (response) {
      setIsLoggedIn(false);
      setLoginResponse(null);
      setIntegrationId(null);
    });
  };

  const pageInfo = () => {
    const { authResponse } = loginResponse;
    const { userID, accessToken } = authResponse;
    setUserId(userID);
    setAccessToken(accessToken);
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
              <Link to={"/client/Agent/user"}>
                <button
                  className="p-4 my-2 bg-blue-500 w-full rounded-lg text-white transition-colors ease-in-out hover:bg-blue-700 hover:text-white"
                  onClick={handleReplyClick}
                >
                  Reply to Messages
                </button>
              </Link>
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
      {}

      {console.log(loginResponse)}
      {useFbPage(userId, accessToken)}
    </div>
  );
};

export default FbLogin;
