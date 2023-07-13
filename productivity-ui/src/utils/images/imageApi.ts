import { apiEndpoint } from "../../config/config";

interface ImageUploadResponse {
  uploadUrl: string;
}

interface ImageModel {
  item: string;
}

export async function getHomepageImage(idToken: string): Promise<ImageModel> {
  console.log("Fetching images");
  const response = await fetch(`${apiEndpoint}/homepageImage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
  const result = await response.json();

  return result;
}

export async function createImage(
  idToken: string
): Promise<ImageUploadResponse> {
  const reply = await fetch(`${apiEndpoint}/homepageImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({}),
  });

  return await reply.json();
}

export async function updateImage(
  idToken: string
): Promise<ImageUploadResponse> {
  const reply = await fetch(`${apiEndpoint}/homepageImage`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({}),
  });

  return await reply.json();
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });
}
