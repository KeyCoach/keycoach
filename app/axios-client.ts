"use client";
import axios from "axios";

const client = axios.create({});

client.interceptors.response.use((response) => {
  if (response.status === 401) {
    window.location.href = "/login";
  }
  return response;
});

export default client;
