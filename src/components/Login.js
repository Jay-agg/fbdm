import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailValue, setEmailValue] = useState("testingaccount01@gmail.com");
  const [passwordValue, setPasswordValue] = useState("Testingaccount@123");

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
    if (message) return;

    //logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(errorMessage);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
          // ..
        });
    } else {
      //signin
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen object-cover absolute bg-blue-900 ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute bg-white w-5/6 md:w-2/6 p-12 my-36  mx-auto right-0 left-0 rounded-xl z-20 text-black"
        >
          <h1 className="font-semibold text-xl flex justify-center py-6">
            {isSignInForm ? "Login to your account" : "Create Account"}
          </h1>
          {!isSignInForm && (
            <div>
              <p className="pt-3">Name</p>
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 my-2 w-full rounded-md  bg-white border border-stone-600"
              />
            </div>
          )}
          <p className="pt-3">Email</p>
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="p-4 my-2 w-full rounded-md  bg-white border border-stone-600"
            value={emailValue}
            onChange={handleEmailChange}
          />
          <p className="pt-3">Password</p>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full rounded-md  bg-white border border-stone-600"
            value={passwordValue}
            onChange={handlePasswordChange}
          />
          <div className="flex items-center my-2">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <button
            className="p-4 my-2 bg-blue-900 w-full rounded-lg text-white transition-colors ease-in-out hover:bg-blue-700 hover:text-white"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Login" : "Sign Up"}
          </button>

          <p
            className="my-4 cursor-pointer transition-colors ease-in-out flex justify-center"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? (
              <span className="text-black">Already have an account? </span>
            ) : (
              <span className="text-black">New to MyApp? </span>
            )}
            <span className="text-blue-500">
              {isSignInForm ? " Sign Up" : " Login"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
