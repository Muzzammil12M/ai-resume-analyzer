import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect } from "react";
import { usePuterStore } from "./lib/puter";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    // run only in browser
    if (typeof window === "undefined") return;

    // if puter already present, init immediately
    if ((window as any).puter) {
      init();
      return;
    }

    // avoid adding duplicate script tags
    const existing = document.querySelector(
      'script[data-puter="1"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      if (existing.hasAttribute("data-loaded")) {
        init();
      } else {
        const onLoad = () => init();
        existing.addEventListener("load", onLoad);
        return () => existing.removeEventListener("load", onLoad);
      }
      return;
    }

    const s = document.createElement("script");
    s.src = "https://js.puter.com/v2";
    s.async = true;
    s.setAttribute("data-puter", "1");
    s.onload = () => {
      s.setAttribute("data-loaded", "1");
      init();
    };
    s.onerror = () => {
      // you can surface an error state instead of console.error
      console.error("Failed to load Puter script");
    };
    document.head.appendChild(s);

    return () => {
      s.onload = null;
      s.onerror = null;
    };
  }, [init]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
/*import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "~/constant";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAI" },
    { name: "description", content: "Smart Feedback for dream job" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  // const location = useLocation();
  // const next = location.search.split("next=")[1] || "/";
  const navigation = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation("/auth?next=/");
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1> Track Your Application And Resuming Rating</h1>
          <h2>Review your submission and Check the AI powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
*/
