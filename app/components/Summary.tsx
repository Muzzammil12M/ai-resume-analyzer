import { title } from "process";
import ScoreGauge from "~/components/ScoreGauge";
const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-col gap-2 items-cnter justify-">
          <p className="text-2xl">{title}</p>
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};
const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col item-center gap-8 p-4">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold"> Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This Score is calculated base on the Variable listed below.
          </p>
        </div>
      </div>
      <Category title="Tone & style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.toneAndStyle.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="skilles" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
