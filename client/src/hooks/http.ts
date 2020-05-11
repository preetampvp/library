import { useState } from "react";
import axios from "axios";
import { HttpMethod } from "../common/constants";
// import { IApiResponse } from "../common/interfaces";

const DoHttp = (method: HttpMethod): any[] => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const doPost = async (url: string, payload: any) => {
    setIsProcessing(true);
    try {
      let response = await axios({
        url,
        method: "post",
        data: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse({ data: response.data, isErr: false });
    } catch (err) {
      setResponse({ data: err.response.data, isErr: true });
    } finally {
      setIsProcessing(false);
    }
  };

  const doGet = async (url: string) => {
    setIsProcessing(true);

    try {
      let response = await axios.get(url);
      setResponse({ data: response.data, isErr: false });
    } catch (err) {
      setResponse({ data: err.response.data, isErr: true });
    } finally {
      setIsProcessing(false);
    }
  };

  switch (method) {
    case HttpMethod.Post:
      return [isProcessing, response, doPost];
    case HttpMethod.Get:
      return [isProcessing, response, doGet];
    default:
      return [];
  }
};

export default DoHttp;
