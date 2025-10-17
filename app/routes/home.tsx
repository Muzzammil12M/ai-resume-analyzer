import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAI" },
    { name: "description", content: "Smart Feedback for dream job" },
  ];
}

export default function Home() {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumeURL, setResumeURL] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState(false);
  // const location = useLocation();
  // const next = location.search.split("next=")[1] || "/";
  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResume(true);
      const items = (await kv.list("resume:*", true)) as KVItem[];
      const parsed = items.map((item) => {
        try {
          return JSON.parse(item.value) as Resume;
        } catch {
          return null;
        }
      }).filter(Boolean) as Resume[];
      setResumes(parsed || []);
      setLoadingResume(false);
    };
    loadResumes();
  }, []);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);
  // Optional: load a preview from the first resume if you want a hero image.
  // Currently each card handles its own image loading.
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1> Track Your Application And Resuming Rating</h1>
          <h2>Review your submission and Check the AI powered feedback</h2>
        </div>

        {!loadingResume && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resumeItem) => (
              <ResumeCard key={resumeItem.id} resume={resumeItem} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
