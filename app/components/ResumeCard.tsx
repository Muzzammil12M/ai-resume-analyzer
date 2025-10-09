import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
function ResumeCard({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) {
  //  return {resumes.map((resume) => (
  //     <div>
  //       <h1>{resume.jobTitle}</h1>
  //     </div>
  //   ))}
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in duration-1000 fade-in"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="h-full w-full">
          <img
            src={imagePath}
            alt="resume"
            loading="lazy"
            onError={(e) => {
              // fallback to a bundled placeholder if the specified image is missing
              (e.currentTarget as HTMLImageElement).src = "/images/pdf.png";
            }}
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}
export default ResumeCard;
