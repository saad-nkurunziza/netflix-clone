import Input from "@/components/Input";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
const AuthPage = () => {
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    await axios.post("/api/register", {
      username,
      email,
      password,
    });
    const loginCredentials = { email, password };
    login(loginCredentials);
  };

  const credentialsSchema = yup.object().shape({
    username: yup.string(),
    email: yup.string(),
    password: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: variant === "login" ? login : register,
    validationSchema: credentialsSchema,
  });

  return (
    <div className="relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black lg:bg-opacity-50 w-full min-h-full ">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" width={100} height={200} />
        </nav>
        <div className="flex justify-center">
          <form
            className="bg-black bg-opacity-70 px-16 py-16 mb-4 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {/* onClick={variant === "login" ? login : register} */}
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
