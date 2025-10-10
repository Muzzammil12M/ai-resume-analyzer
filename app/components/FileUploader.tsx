import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface fileUploaderProps {
  onFileSelect?: (file: File) => void;
}
const FileUploader: React.FC = () => {
  const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pionter">
          <div className="mx-auto flex w-16 h-16 items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>
          {file ? (
            <div></div>
          ) : (
            <div className="text-center">
              <p className="text-lgtext-gray-500">
                <span className="font-semibold">click to Upload</span>
                Drag & drop your files here
              </p>
              <p className="text-lg text-gray-500 ">PDF(max 20MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
