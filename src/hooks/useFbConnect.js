const useFbConnect = () => {
  if (window.FB === undefined) {
    console.log("FB undefined -> provide callback");
    window.fbAsyncInit = function () {
      initialize();
    };
  } else {
    console.log("FB defined -> call init right away");
    initialize();
  }

  function initialize() {
    window.FB.init({
      appId: "434177738955192",
      cookie: true,
      xfbml: true,
      version: "v19.0",
    });
  }
};

export default useFbConnect;
