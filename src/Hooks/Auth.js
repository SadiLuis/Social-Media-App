import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
  import { auth, db } from "../Firebase/Firebase"
  import { useEffect, useState } from "react";
  import { HOME, LOGIN } from "../Routes/Routes"
  import { useToast } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import { setDoc, doc, getDoc } from "firebase/firestore";
  import isUsernameExists from "../Utils/ExistsUser";
 

export function useAuth(){
    const [authUser, isLoading, error] = useAuthState(auth);

    return {user: null, isLoading, error}
}

export function useLogin () {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function login ({ email, password, redirectTo = HOME }){
        setLoading(true);

       try {
        await signInWithEmailAndPassword(auth, email, password)
        toast({
            title: " You are connected! ",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });
        navigate(redirectTo);
       } catch (error) {
        toast({
            title: "You have a problem when connecting",
            description: error.message,
            status: "error",
            isClosable: true,
            duration: 6000,
        }); 
        return false; //If login failed so return false       
       }
        setLoading(false);
        return true; // If login succes so return true
    }

    return {login, isLoading};

}

export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = HOME,
    }) {
      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
  
      if (usernameExists) {
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            avatar: "",
            date: Date.now(),
          });
  
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
  
          navigate(redirectTo);
        } catch (error) {
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
      }
    }
  
    return { register, isLoading };
  }
  
  export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function logout() {
      if (await signOut()) {
        toast({
          title: "Successfully logged out",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(LOGIN);
      } 
    }
  
    return { logout, isLoading };
  }