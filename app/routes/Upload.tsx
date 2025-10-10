import React, { useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    setStatusText("Starting upload...");

    // try {
    //   // Example: read form data (add inputs as needed)
    //   const form = event.currentTarget;
    //   const data = new FormData(form);

    //   // TODO: replace with your actual upload/processing call
    //   // Example placeholder delay to simulate work:
    //   await new Promise((r) => setTimeout(r, 900));

    //   setStatusText("Upload complete");
    // } catch (err) {
    //   console.error(err);
    //   setStatusText("Upload failed");
    // } finally {
    //   setIsProcessing(false);
    // }
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
