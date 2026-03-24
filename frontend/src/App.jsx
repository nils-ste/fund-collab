import {
  ArrowRight,
  FileText,
  Video,
  Upload,
  Clock,
  Users,
  Bell,
} from "lucide-react";
import { Link } from "react-router";

export default function App() {
  const features = [
    {
      icon: FileText,
      title: "Rich Proposal Editor",
      description:
        "Editable text fields that cover all necessities. Structure your narrative, treatments, and timeline exactly how funders want to see it.",
    },
    {
      icon: Video,
      title: "Video Link Integration",
      description:
        "Embed video links directly in your proposals. Showcase your previous work or pitch reels without leaving the platform.",
    },
    {
      icon: Upload,
      title: "File Uploads",
      description:
        "Attach scripts, budgets, lookbooks, and supporting documents. Keep everything organized in one place.",
    },
    {
      icon: Clock,
      title: "Deadline Tracking",
      description:
        "Never miss a submission. Visual reminders show urgency and help you prioritize which opportunities to pursue.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Invite producers, writers, and collaborators with custom permissions. Work together on proposals without the mess of using different plattforms.",
    },
    {
      icon: Bell,
      title: "Funding Alerts",
      description:
        "Editable sidebar to keep track of funding opportunities. Never miss a deadline again because of a lack of overview.",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-secondary)">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Funding proposals made simple for{" "}
            <span className="text-accent">creatives</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl  max-w-2xl mx-auto text-pretty">
            Create compelling proposals, track deadlines, upload media, and
            collaborate with your team. All in one place designed for creative
            professionals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/authentication"
              className="w-full sm:w-auto text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary font-medium rounded-full"
            >
              Start Your First Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="#how-it-works"
              className="w-full sm:w-auto text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) hover:border-transparent inline-flex items-center justify-center px-8 py-3 border font-medium rounded-full"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-primary)"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to win in funding
            </h2>
            <p className="mt-4 text-lg  max-w-2xl mx-auto">
              Built specifically for filmmakers and artists who are serious
              about securing grants and funding for their creative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
