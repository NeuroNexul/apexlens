"use client";

import React from "react";
import style from "./image_upload_preset.module.scss";
import { cn } from "@/lib/utils";
import FileUpload from "@/components/file-upload-icon";
import { toast } from "sonner";
import uploadImages from "./upload";

type Props = {
  children: React.ReactNode;
  className?: string;
  refresh?: () => void;
};

export default function ImageUploadPreset({
  children,
  refresh,
  className,
}: Props) {
  const [uploadState, setUploadState] = React.useState({
    status: "idle",
    error: null,
    to_be_uploaded: 0,
    uploaded: 0,
    progress: 0, // 0 - 100% | current upload progress
  });

  function upload(files: FileList | null) {
    if (!files) return;

    setUploadState((state) => ({
      status: "pending",
      error: null,
      to_be_uploaded: files.length,
      uploaded: 0,
      progress: 0,
    }));
    toast.success("Uploading files to cloudinary...");

    try {
      uploadImages(files, (data, status, uploaded, toBeUploaded) => {
        // Calculate progress
        const progress_to_be_done = data.length * 100;
        const total_progress_done = data
          .map((d) => d.progress)
          .reduce((a, b) => a + b, 0);
        const progress = Math.round(
          (total_progress_done / progress_to_be_done) * 100
        );
        // Update state
        setUploadState((state) => ({
          ...state,
          progress,
          uploaded,
          to_be_uploaded: toBeUploaded,
        }));

        if (status === "success") {
          setUploadState((state) => ({ ...state, status: "success" }));
          toast.success("Upload complete!");
          refresh?.();
        } else if (status === "error") {
          setUploadState((state) => ({ ...state, status: "error" }));
          toast.error("Upload failed!", {
            description: data.map((d) => d.error || "").join("\n"),
          });
          refresh?.();
        }
      });
    } catch (error: any) {
      console.error(error);
      setUploadState((state) => ({
        ...state,
        status: "error",
        error: error.message,
      }));
      toast.error("Upload failed!", {
        description: error.message,
      });
      refresh?.();
    }
  }

  return (
    <div
      className={cn(
        style.container,
        "w-full h-full z-[1] pointer-events-auto",
        className
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
        upload(e.dataTransfer.files);
      }}
    >
      <div className={style.overlay}>
        <div className={style.holder}>
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
              upload(e.target.files);
            }}
          />
          <div className={style.uploadTitle}>
            Drop your Files here or, <span>browse</span>
          </div>
          <p className="text-sm text-muted-foreground px-8 text-center mt-4">
            Max Image Size: <span>10MB</span>; Max Video Size:{" "}
            <span>100MB</span>; Max Raw Size: <span>100MB</span>
          </p>
        </div>
      </div>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
