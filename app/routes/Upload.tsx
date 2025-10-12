import React, { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";
import { useNavigate } from "react-router";
import { formatSize } from "~/lib/format";
import { generateUUID } from "~/lib/format";
const Upload = () => {
  const { fs, auth, isLoading, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("uploading of File...");
    const upLoadedFile = await fs.upload([file]);
    if (!upLoadedFile) return setStatusText("Error:Falied to Upload file");
    setStatusText("converting To Image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: faiiled to convert PDF to image");
    setStatusText("uploading of File...");
    const upLoadedImage = await fs.upload(imageFile.file);
    if (!upLoadedImage) return setStatusText("Error:Falied to Upload image");
    setStatusText("Preparing Data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: upLoadedFile.path,
      imagePath: upLoadedImage,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing....");
    const feedback = await ai.feedback(
      upLoadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    setStatusText("Starting upload...");
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Get AI-powered feedback on your resume</h1>
          {isProcessing ? (
            <h2 className="text-base">Processing... {statusText}</h2>
          ) : (
            <h2>drop your resume here for AIS score and Improvemet tips </h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="company-name">Job title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-tile"
                  placeholder="Job title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="company-name">Job Description</label>
                <textarea
                  rows={5}
                  id="job-Description"
                  name="job-description"
                  placeholder="Job description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="company-name">Upload Resume</label>
                {/* @ts-ignore */}
                <FileUploader onFileSelect={handleFileSelect} />
                <button className="primary-button" type="submit">
                  Analyze Resume
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
