// "use server";

import { getXataClient } from "@/lib/xata";
import { CloudinaryResponse } from "./upload";

const xata = getXataClient();

export async function UpdateXATAImageDatabase(data: CloudinaryResponse | null) {
  if (!data) {
    return;
  }

  const {
    asset_id,
    public_id,
    signature,
    width,
    height,
    format,
    bytes,
    secure_url,
    original_filename,
    original_extension,
  } = data;

  try {
    const res = await xata.db.images.create({
      asset_id,
      public_id,
      signature,
      width,
      height,
      format,
      bytes,
      url: secure_url,
      extension: original_extension,
      filename: original_filename,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Error updating XATA image database");
  }
}
