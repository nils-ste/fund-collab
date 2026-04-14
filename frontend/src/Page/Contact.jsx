import { Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-secondary)">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Let's <span className="text-accent">connect</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-pretty">
            I'm Nils Steinmetz — a fullstack junior developer with a background
            in film and cultural production. I'm open to work and happy to chat
            about fund-collab or anything else.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-(--color-font-primary) bg-(--color-primary)">
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">

          {/* Email */}
          <a
            href="mailto:nils_steinmetz@web.de"
            className="flex items-center gap-6 p-6 rounded-xl border hover:bg-(--color-button-hover) hover:text-(--color-button-font) transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-(--color-button) group-hover:text-(--color-button-font)" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold mb-1">Email</h3>
              <p className="text-(--color-font-secondary) group-hover:text-(--color-button-font) truncate">
                nils_steinmetz@web.de
              </p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-(--color-button) group-hover:text-(--color-button-font)" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nils-steinmetz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-6 p-6 rounded-xl border hover:bg-(--color-button-hover) hover:text-(--color-button-font) transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-(--color-button) group-hover:text-(--color-button-font)"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54v14H.22V8zm7.56 0h4.35v1.92h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.48 3.05 5.48 7.02V22h-4.54v-6.77c0-1.62-.03-3.7-2.25-3.7-2.25 0-2.6 1.76-2.6 3.58V22H7.78V8z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold mb-1">LinkedIn</h3>
              <p className="text-(--color-font-secondary) group-hover:text-(--color-button-font) truncate">
                linkedin.com/in/nils-steinmetz
              </p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-(--color-button) group-hover:text-(--color-button-font)" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/nils-ste"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-6 p-6 rounded-xl border hover:bg-(--color-button-hover) hover:text-(--color-button-font) transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-(--color-button) group-hover:text-(--color-button-font)"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold mb-1">GitHub</h3>
              <p className="text-(--color-font-secondary) group-hover:text-(--color-button-font) truncate">
                github.com/nils-ste
              </p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-(--color-button) group-hover:text-(--color-button-font)" />
          </a>

        </div>
      </section>
    </>
  );
}