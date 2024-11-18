import React, { useState } from "react";
import "./index.scss";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
type FileType = {
  fileObj: File;
  url: string;
};

const DashUploader = ({
  text,
  visible,
  file,
  setFile,
}: {
  text: string;
  visible: boolean;
  file: FileType | null;
  setFile: (file: FileType | null) => void;
}) => {
  //   const [file, setFile] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState({
    msg: "No file uploaded",
    success: true,
  });

  const handleFileUpload = (files: FileList | null) => {
    const uploadedFile = files?.[0];
    if (uploadedFile) {
      if (acceptedFileTypes.includes(uploadedFile.type)) {
        setFile({
          fileObj: uploadedFile,
          url: URL.createObjectURL(uploadedFile),
        });
        setUploadStatus({
          msg:
            uploadedFile.name.substring(0, 15) +
            "..." +
            uploadedFile.name.substring(uploadedFile.name.length - 6),
          success: true,
        });
      } else {
        setFile(null);
        setUploadStatus({
          msg: "Please upload a PNG / JPEG / JPG file",
          success: false,
        });
      }
    }
  };

  return (
    <div
      className={`dashUploader dashUploader-${visible ? "visible" : "hidden"}`}
    >
      <label
        // className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        className="foreUploader"
        htmlFor="idUpload"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        {file ? "Re" : ""}
        {text}
      </label>
      <input
        className="backUploader"
        id="idUpload"
        type="file"
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <div
        className={`uploaderInfo uploaderInfo-${
          file ? "withFile" : "withoutFile"
        }`}
      >
        <img src={file?.url} alt="uploadedFile" />
        <p>{uploadStatus?.msg}</p>
      </div>
    </div>
  );
};

export default DashUploader;
