import axios, { AxiosResponse } from "axios";

type Token = string | false | null | undefined;


interface PostDataResponse {
  [key: string]: any;
}

interface DownloadFileData {
  fileName: string;
}

const postdata = async <T>(url: string = "", data: any, token: Token = false): Promise<T> => {
  let tokendata = "";

  if (token) {
    tokendata = "Bearer " + token;
  }

  const response: AxiosResponse<T> = await axios.post(url, data, {
    headers: { Authorization: tokendata },
  });

  return response.data;
};

const getData = async <T>(url: string = "", token: Token = false): Promise<T> => {
  if (token) {
    token = "Bearer " + token;
  }
  const response: AxiosResponse<T> = await axios.get(url, { headers: { Authorization: token } });

  return response.data;
};

const deleteData = async <T>(url: string = "", token: Token = false): Promise<T> => {
  if (token) {
    token = "Bearer " + token;
  }
  const response: AxiosResponse<T> = await axios.delete(url, { headers: { Authorization: token } });

  return response.data;
};

const putData = async <T>(url: string = "", data: any, token: Token = false): Promise<T> => {
  if (token) {
    token = "Bearer " + token;
  }
  const response: AxiosResponse<T> = await axios.put(url, data, {
    headers: { Authorization: token },
  });

  return response.data;
};

const postDataContent = async <T>(url: string = "", data: any, token: Token = false, contentType: string | undefined): Promise<T | undefined> => {
  try {
    let tokenData = "";
    if (token) {
      tokenData = "Bearer " + token;
    }

    const response: AxiosResponse<T> = await axios.post(url, data, {
      headers: { Authorization: tokenData, "Content-Type": contentType },
    });

    return response.data;
  } catch (error) {

    console.error(error);
  }
};

// export async function downloadFile(fileUrl: string, data: DownloadFileData, token: Token = false): Promise<void> {
//   if (token) {
//     token = "Bearer " + token;
//   }
//   try {
//     const response: AxiosResponse<Blob> = await axios.post(fileUrl, data, {
//       responseType: "blob",
//       headers: { Authorization: token },
//     });

//     const type = response.headers["content-type"];
//     const blob = new Blob([response.data], { type, encoding: "UTF-8" });
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = data.fileName;
//     link.click();
//   } catch (error) {
//     console.error('Error downloading file:', error);
//   }
// }

// Exporting all functions
export { postdata, getData, deleteData, putData, postDataContent };
