"use client";

import React from "react";
import FileUpload from "@/components/file-upload-icon";
import { cn } from "@/lib/utils";
import style from "./image_upload_modal.module.scss";
import { toast } from "sonner";
import upload from "./upload";
import { UpdateXATAImageDatabase } from "./updateXATA";

type Props = {
  close: () => void;
};

export default function ImageUploadModal({ close }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const [uploadState, setUploadState] = React.useState({
    status: "idle",
    error: null,
    to_be_uploaded: 0,
    uploaded: 0,
    progress: 0, // 0 - 100% | current file progress
  });

  async function onUpload(files: FileList | null) {
    if (!files) return;

    setUploadState((state) => ({
      ...state,
      status: "pending",
      to_be_uploaded: files.length,
    }));
    toast.success("Uploading files to cloudinary...");

    try {
      upload(files, (data, status, uploaded, toBeUploaded) => {
        const progress_to_be_done = data.length * 100;
        const total_progress_done = data
          .map((d) => d.progress)
          .reduce((a, b) => a + b, 0);
        const progress = Math.round(
          (total_progress_done / progress_to_be_done) * 100
        );
        setUploadState((state) => ({
          ...state,
          progress,
          uploaded,
          to_be_uploaded: toBeUploaded,
        }));

        if (status === "success") {
          setUploadState((state) => ({ ...state, status: "success" }));
          // for (const d of data) {
          //   UpdateXATAImageDatabase(d.data);
          // }
          toast.success("Upload complete!");
          if (typeof close === "function") close();
        }
      });
    } catch (error: any) {
      console.error(error);
      setUploadState((state) => ({
        ...state,
        status: "error",
        error: error.message,
      }));
      toast.error("Upload failed!");
      if (typeof close === "function") close();
    }
  }

  return (
    <div className="w-full h-full">
      <div className="top w-full border-b py-2 px-4">
        <h2 className="text-lg">Upload Image</h2>
      </div>

      <div className="bottom w-full py-2 px-4">
        <div
          className={cn(
            style.uploadDiv, // Base
            "h-72 w-full border-[3px] border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer", // Conatiner
            "transition-colors duration-200 ease-in-out" // Hover
          )}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add(style.dragged);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove(style.dragged);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove(style.dragged);
            onUpload(e.dataTransfer.files);
          }}
          onClick={(e) => {
            document.getElementById("uploadFileInput")?.click();
          }}
        >
          <div className={style.uploadIconsContainer}>
            <FileUpload className={style.uploadFileIcon} />
            <FileUpload className={style.uploadFileIcon} />
            <FileUpload className={style.uploadFileIcon} />
          </div>
          <input
            type="file"
            name="files"
            id="uploadFileInput"
            accept="image/*"
            style={{ display: "none" }}
            multiple
            onChange={(e) => {
              e.preventDefault();
              onUpload(e.target.files);
            }}
          />
          <div className={style.uploadTitle}>
            Drop your Files here or, <span>browse</span>
          </div>
          <p className="text-sm text-muted-foreground px-8 text-center mt-4">
            Max Image Size: <span>10MB</span>; Max Video Size:{" "}
            <span>100MB</span>; Max Raw Size: <span>100MB</span>
          </p>
          {uploadState.status !== "idle" && (
            <>
              <p className="text-sm text-muted-foreground px-8 text-center mt-2">
                Upload Status: ({uploadState.uploaded} /{" "}
                {uploadState.to_be_uploaded})
              </p>
              <div className="w-[calc(100%-40px)] h-2 border rounded-lg mt-2">
                <div
                  className="h-full bg-muted rounded-lg"
                  style={{ width: `${uploadState.progress}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
