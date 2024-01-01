/*
Cloudinary response example:
{
  "asset_id": "814a935a8ecaaccc6f06ed27c6fdd29a",
  "public_id": "image_uploads/8fb97dec724d750d2085173816712ffc_xcqp3m",
  "version": 1704124348,
  "version_id": "59a88e9a2a2b8ecd8e0808b6dbb53987",
  "signature": "66771f1e9e6ac27be3ffb814626b3ada0d94d0b9",
  "width": 1600,
  "height": 1600,
  "format": "webp",
  "resource_type": "image",
  "created_at": "2024-01-01T15:52:28Z",
  "tags": [],
  "pages": 1,
  "bytes": 13548,
  "type": "upload",
  "etag": "2b4a685c0df697a44924f84e3c126f12",
  "placeholder": false,
  "url": "http://res.cloudinary.com/di9pwtpmy/image/upload/v1704124348/image_uploads/8fb97dec724d750d2085173816712ffc_xcqp3m.webp",
  "secure_url": "https://res.cloudinary.com/di9pwtpmy/image/upload/v1704124348/image_uploads/8fb97dec724d750d2085173816712ffc_xcqp3m.webp",
  "folder": "image_uploads",
  "access_mode": "public",
  "existing": false,
  "original_filename": "8fb97dec724d750d2085173816712ffc",
  "original_extension": "png"
}
*/

import { UpdateXATAImageDatabase } from "./updateXATA";

export type CloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
  original_extension: string;
};

type UpdateResponseType = {
  id: string;
  data: CloudinaryResponse | null;
  progress: number;
};

export default function upload(
  files: FileList,
  onUpdate: (
    data: UpdateResponseType[],
    status: "idle" | "pending" | "success" | "error",
    uploaded: number,
    toBeUploaded: number
  ) => void
) {
  if (!files.length) {
    return;
  }

  let status: "idle" | "pending" | "success" | "error" = "pending";
  let toBeUploaded = files.length;
  let uploaded = 0;
  let data: UpdateResponseType[] = Array.from(files).map((file) => ({
    id: file.name,
    data: null,
    progress: 0,
  }));

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload/`;
  const timestamp = new Date().getTime();

  const formData = new FormData();
  formData.append("timestamp", timestamp.toString());
  formData.append("upload_preset", "upload");

  for (let i = 0; i < files.length; i++) {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      const progress = Math.round((e.loaded * 100.0) / e.total);
      data = data.map((item) => {
        if (item.id === files[i].name) {
          item.progress = progress;
        }
        return item;
      });
      onUpdate(data, status, uploaded, toBeUploaded);
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        data = data.map((item) => {
          if (item.id === files[i].name) {
            item.data = response;
            item.progress = 100;
          }
          return item;
        });
        uploaded++;

        // Update XATA database
        UpdateXATAImageDatabase(response);

        if (data.every((item) => item.progress === 100)) {
          status = "success";
        } else {
          status = "error";
        }
        onUpdate(data, status, uploaded, toBeUploaded);
      }
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    formData.set("file", files[i]);
    xhr.send(formData);
  }
}
