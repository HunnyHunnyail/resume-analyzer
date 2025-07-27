import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants/index";
import { usePuterStore } from "~/lib/puter";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";



export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

export default function Home() {
    const { auth } = usePuterStore();

    const location = useLocation();
    const next = location.search.split("=")[1];
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/')
    }, [auth.isAuthenticated])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className={"main-section"}>
                <div className="page-heading py-16">
                    <h1>Track Your Applications & Resume Ratings</h1>
                    <h2>Review Submissions And Check AI-powered Feedback.</h2>
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
