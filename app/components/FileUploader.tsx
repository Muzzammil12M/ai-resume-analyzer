import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/format";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
interface fileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}
const FileUploader: React.FC<fileUploaderProps> = ({ onFileSelect }) => {
  // const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: MAX_FILE_SIZE,
    });
  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="text-center flex space-x-3">
                <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
                <div>
                  <p className="font-medium text-sm text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
                aria-label="Remove file"
              >
                <img src="/icons/cross.svg" alt="removed" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex w-16 h-16 items-center justify-center">
                <img src="/icons/info.svg" alt="upload" className="w-10 h-10" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">click to Upload</span>
                Or Drag & drop your files here
              </p>
              <p className="text-lg text-gray-500 ">
                PDF (max {formatSize(MAX_FILE_SIZE)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
