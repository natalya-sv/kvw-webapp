import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SPONSORS_GET, SPONSORS_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");
