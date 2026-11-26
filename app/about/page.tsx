import Link from "next/link";
import BandProgress from "@/components/BandProgress";
 
import Image from "next/image";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import SubPageMenu from "../components/SubPageMenu";
import SplitTitle from "../components/SplitTitle";
import Reveal from "./Reveal";

const experience = [
  { company: "Aspen Publishing", role: "Software Engineer II", period: "May 2025 to present", body: "Foundational services for internal teams and third party integrations on Azure and .NET. I review code across teams for standards, security and performance, lead design discussions, and enforce unit, acceptance and integration test coverage." },
  { company: "Aspen Publishing", role: "Software Engineer I", period: "Jun 2024 to May 2025", body: "Azure and ASP.NET Web API services, built to The Standard." },
  { company: "Upsert Labs", role: "Founder", period: "Jun 2026 to present", body: "My own company. EventHome, Upsert, Upsert Scout and client builds such as Jojo Express and Inkz ’N’ Paint." },
  { company: "Open source, The Standard", role: "Contributor", period: "Mar 2024 to present", body: "EventHighway, the RESTFulSense client rewrite, ADotNet and The Standard book, reviewed in public by the maintainers." },
  { company: "AXA Mansard", role: "Software Engineer", period: "Jan 2023 to Jul 2024", body: ".NET services and acceptance testing." },
  { company: "AIpidata", role: "Flutter Developer", period: "Nov 2022 to Apr 2023", body: "Designed and helped build PI-Pet, a pet tracking app for health vitals and location." },
  { company: "BUNKR Essentials", role: "Software Engineer", period: "May 2021 to Sep 2022", body: "" },
  { company: "SolversBay", role: "Web Developer", period: "Feb 2019 to Jun 2020", body: "" },
];

const links: [string, string, string, boolean][] = [
  ["LinkedIn", "https://www.linkedin.com/in/helloabdulsamad/", "Profile", true],
  ["GitHub", "https://github.com/helloabdulsamad", "Code", true],
  ["Upwork", "https://www.upwork.com/freelancers/~01b37892b37a65770a", "Hire me", true],
  ["Clutch", "https://clutch.co/profile/upsert-labs", "Upsert Labs", true],
  ["See the work", "/work", "Case studies", false],
  ["Services and FAQ", "/services", "What we build", false],
];

// One colour band per section, like the services page: the section name
// stays pinned on the left while its content scrolls on the right.
function Band({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="sv-band" aria-labelledby={`${id}-h`}>
      <div className="sv-in">
        <div className="sv-side">
          <p className="sv-num">{String(n).padStart(2, "0")} / 03</p>
          <h2 id={`${id}-h`} className="sv-name">{title}</h2>
          <span className="sv-bar" aria-hidden="true"><i /></span>
        </div>
        <div className="sv-detail">{children}</div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-dvh flex flex-col text-custom-gray-900 dark:text-app-text-dark">
      <header className="w-full">
        <div className="shell-wrap pt-[max(env(safe-area-inset-top),16px)] md:pt-4">
          <Header />
        </div>
      </header>

      <main className="flex-1 shell-wrap">
        <div className="ci ab">
          <div className="ab-hero">
            <div>
              <SplitTitle text="Systems that don't fall apart." className="ab-title" />
              <Reveal className="ab-intro">
                <p>
                  I&rsquo;m Abdulsamad, a Senior Software Engineer working with teams worldwide, and I run Upsert Labs, a software studio. I studied Applied Geophysics (BSc,
                  University of Ilorin, and MSc, University of Ibadan), and I&rsquo;ve built software since 2019.
                </p>
                <p>
                  The work I like best has real money and real people behind it. A buyer who must never be charged twice. A shop that must keep
                  selling when the network drops. A merchant whose store must stay up when another one falls over. I design for those failures
                  first, and I prove the guarantees with tests.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <div className="about-photo">
                <Image src="/headshot-600.webp" alt="Abdulsamad Osunlana in a black T-shirt, studio portrait" priority width={600} height={600} className="w-full h-auto" />
              </div>
            </Reveal>
          </div>

        <BandProgress />
          <div className="sv">
            <Band id="experience" n={1} title="Experience">
              <ol className="ab-exp">
                {experience.map((e) => (
                  <li key={e.company + e.role}>
                    <div className="ab-exp-top">
                      <b>{e.company}</b>
                      <span>{e.period}</span>
                    </div>
                    <p className="ab-role">{e.role}</p>
                    {e.body && <p className="ab-body">{e.body}</p>}
                  </li>
                ))}
              </ol>
            </Band>

            <Band id="stack" n={2} title="Stack">
              <p className="sv-promise ab-stack">
                C# and .NET, ASP.NET Core, EF Core, PostgreSQL, Azure. TypeScript, Next.js and React. Paystack, webhooks and ledgers. Docker and
                Coolify. Flutter for mobile. Tested with xUnit, Vitest and Playwright.
              </p>
            </Band>

            <Band id="contact" n={3} title="Contact">
              <p className="sv-promise">Tell me what you are building.</p>
              <p className="ab-mail">
                <a href="mailto:osunlanaabdulsamad@gmail.com">osunlanaabdulsamad@gmail.com</a>
              </p>
              <p className="ab-call">
                or call <a href="tel:+2348166814024">+234 816 681 4024</a>
              </p>
              <ul className="sv-work ab-links">
                {links.map(([label, href, note, ext]) => (
                  <li key={label}>
                    {ext ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"><b>{label}</b><span>{note}</span></a>
                    ) : (
                      <Link href={href}><b>{label}</b><span>{note}</span></Link>
                    )}
                  </li>
                ))}
              </ul>
            </Band>
          </div>
        </div>
      </main>

      <footer className="w-full pt-[120px] md:pt-20">
        <div className="mx-auto w-full max-w-[600px] px-4 pb-[max(env(safe-area-inset-bottom),16px)] md:pb-4">
          <div className="mb-[16px]">
            <SubPageMenu />
          </div>
          <Footer />
        </div>
      </footer>
    </div>
  );
}
