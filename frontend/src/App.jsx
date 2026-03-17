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
        "Editable text fields with formatting options. Structure your narrative, budget, and timeline exactly how funders want to see it.",
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
        "Never miss a submission. Visual timelines show urgency and help you prioritize which opportunities to pursue.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Invite producers, writers, and collaborators with custom permissions. Work together in real-time on proposals.",
    },
    {
      icon: Bell,
      title: "Funding Alerts",
      description:
        "Curated sidebar with relevant funding opportunities. Get notified about grants that match your project type.",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-secondary)">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Funding proposals made simple for{" "}
            <span className="text-accent">creatives</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Create compelling proposals, track deadlines, upload media, and
            collaborate with your team. All in one place designed for creative
            professionals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/authentication"
              className="w-full sm:w-auto text-(--color-button) hover:text-(--color-primary) hover:bg-(--color-button-hover) inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Start Your First Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="#how-it-works"
              className="w-full sm:w-auto text-(--color-button) hover:text-(--color-primary) hover:bg-(--color-button-hover) inline-flex items-center justify-center px-8 py-3 border text-foreground font-medium rounded-full hover:bg-secondary transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-(--color-primary)">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to win funding
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for filmmakers and artists who are serious
              about securing grants and funding for their creative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-background rounded-xl border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
