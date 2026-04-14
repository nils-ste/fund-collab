import { Heart, Lightbulb, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Built for Creatives",
      description:
        "I built fund-collab because I know how fragmented the funding process can be. Scattered documents, missed deadlines, and endless back-and-forth — I wanted to fix that.",
    },
    {
      icon: Lightbulb,
      title: "Simplicity First",
      description:
        "Every feature is designed to get out of your way. Less time managing tools means more time developing the projects that matter to you.",
    },
    {
      icon: Users,
      title: "Collaboration at the Core",
      description:
        "Great creative work is rarely solo. fund-collab is built around teams — giving everyone the right access to contribute without the chaos.",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-secondary)">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Built by a <span className="text-accent">creative</span>, for
            creatives
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-pretty">
            The tools available for managing creative funding proposals are
            either too generic or too inaccessible. I set out to build something
            better, with the needs of small creative teams in mind.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/authentication"
              className="w-full sm:w-auto text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary font-medium rounded-full"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-primary)">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            The story
          </h2>
          <div className="space-y-6 text-lg max-w-2xl mx-auto">
            <p>
              fund-collab is a portfolio project built to explore what a modern,
              focused tool for creative funding could look like. It grew out of a
              simple question — what if managing proposals, deadlines, and
              collaborators actually felt intuitive?
            </p>
            <p>
              I built it with React (JavaScript), Flask (Python), PostgreSQL, and Supabase, and it covers
              real-world concerns like authentication, file storage, team
              permissions, and deadline tracking — all within a clean,
              purpose-built interface.
            </p>
            <p>
              While fund-collab is not a commercial product, every feature is
              built to production standards with real users in mind. Feel free
              to explore, create a project, and see how it works.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-secondary)">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">What drives it</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              I believe that the best creative projects deserve the best shot at
              funding. These are the principles behind every decision I made.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-xl border">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}