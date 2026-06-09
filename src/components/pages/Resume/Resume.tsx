import "./Resume.css";
import { useState } from "react";

const experience = [
  {
    role: "Sr Associate IT Software Developer",
    company: "SAS — Engage Catalog",
    location: "Pune, India",
    period: "Jan 2025 – Present",
    bullets: [
      "Engineered pre/post-deployment n8n automation stages within the Viya deployment workflow, triggering solution-specific GitHub Actions workflows for any custom configuration.",
      "Built a n8n workflow for just-in-time Azure RBAC management that dynamically assigns roles to a Service Principal, validates propagation, and revokes access post-execution, enforcing least-privilege across all Viya environment builds.",
      "Developed a Python script automating the full solution setup process, replacing a manual multi-step process covering GitHub repository creation and user provisioning, Service Principal federated credential configuration, and n8n workflow and project provisioning, used across 10+ solutions to date.",
      "Built a GitHub Actions workflow that runs as part of the Viya post-deployment process, provisioning a Redis cache on Azure and configuring it with Viya using Azure CLI and Viya APIs.",
    ],
  },
  {
    role: "Senior Cloud Engineer",
    company: "Brillio — BMS CloudOps",
    location: "Pune, India",
    period: "Apr 2023 – Jan 2025",
    bullets: [
      "Built a centralised CloudOps dashboard from scratch covering resource inventory, deprecated resources and security issues, giving the client’s SRE team a unified view of their AWS resources across accounts where no such visibility existed before.",
      "Developed RESTful APIs in Node.js deployed on Lambda behind API Gateway with authentication, provisioned via CloudFormation and serving Athena queried S3 data to the dashboard frontend.",
      "Built a scheduled CodeBuild job that pulled cloud resource data daily from Wiz and stored it in partitioned S3, making it queryable via Athena for the dashboard, with automated email alerts to the support team on job failure.",
      "Optimised Athena queries and implemented Query Result Reuse, reducing execution time from up to 5 minutes to 10ms on heavy queries and cutting repeated scan costs across the dashboard.",
      "Built a personalised column preference feature using DynamoDB, allowing SRE users to save and persist their table view column selections across sessions.",
    ],
  },
  {
    role: "Cloud Engineer",
    company: "Brillio — BMS Cloud Engineering",
    location: "Pune, India",
    period: "Mar 2021 – Mar 2023",
    bullets: [
      "Built an event-driven AWS Health automation using EventBridge, Lambda, SQS, and SNS that identified resource owners via tags across shared AWS accounts and emailed targeted health alerts directly to affected teams, removing the need for manual owner lookup and notification.",
      "Resolved a Lambda memory failure caused by oversized SES email attachments by replacing full in-memory parsing with a Node.js streaming approach, processing attachments in chunks and piping parsed content directly to S3 without increasing Lambda memory allocation.",
      "Built an email notification service for alerting users about deprecated Lambda runtime and RDS engine versions.",
      "Used CloudFormation for IaC to provision and manage all automation infrastructure across environments.",
    ],
  },
];

const skills: Record<string, string[]> = {
  "Languages": ["JavaScript", "Node.js", "Python"],
  "AWS": ["Lambda", "S3", "DynamoDB", "Athena", "API Gateway", "EventBridge", "SNS", "SQS", "CloudFormation", "CodeBuild", "Step Functions", "IAM", "CloudWatch"],
  "Azure": ["Azure Functions", "Blob Storage", "Service Principal"],
  "Tools": ["GitHub Actions", "n8n", "Kubernetes", "AWS SDK", "CI/CD", "GitHub Copilot CLI"],
};

const certifications = [
  { name: "AWS Certified Developer – Associate", code: "DVA-C01" },
  { name: "GitHub Actions", code: "GH-200" },
];

const awards = [
  { title: "Authentic Spotlight Recognition", org: "SAS", date: "Nov 2025" },
  { title: "Brillian of the Quarter", org: "Brillio", date: "Sep 2024, Jan 2024, Jun 2023, Apr 2022" },
];

const Resume = () => {
  const [focusMode, setFocusMode] = useState(false);
  return (
    <main className="resume">
      <div className="resume__inner">

        {/* Action bar */}
        <div className="resume__actionbar">
          <button
            className="resume__focus-btn"
            onClick={() => setFocusMode(!focusMode)}
          >
            {focusMode ? "Exit Focus Mode" : "Focus Mode"}
          </button>
          <a className="resume__download" href="/Sagar_Sawant_Software_Engineer_Resume.pdf" download>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download PDF
          </a>
        </div>

        {/* Two-column body */}
        <div
          className={`resume__body ${focusMode ? "resume__body--focus" : ""
            }`}
        >

          {/* LEFT sidebar */}
          <aside className="resume__sidebar">

            <section className="resume__block">
              <h2 className="resume__block-title">Skills</h2>
              {Object.entries(skills).map(([cat, items]) => (
                <div className="resume__skill-group" key={cat}>
                  <span className="resume__skill-cat">{cat}</span>
                  <div className="resume__tags">
                    {items.map(item => (
                      <span className="resume__tag" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="resume__block">
              <h2 className="resume__block-title">Certifications</h2>
              <ul className="resume__cert-list">
                {certifications.map(c => (
                  <li key={c.code}>
                    <span className="resume__cert-name">{c.name}</span>
                    <span className="resume__cert-code">{c.code}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume__block">
              <h2 className="resume__block-title">Education</h2>
              <p className="resume__edu-degree">BE — Computer Engineering</p>
              <p className="resume__edu-school">Mumbai University</p>
              <p className="resume__edu-year">2016 – 2020</p>
            </section>

            <section className="resume__block">
              <h2 className="resume__block-title">Awards</h2>
              <ul className="resume__award-list">
                {awards.map(a => (
                  <li key={a.title}>
                    <span className="resume__award-title">{a.title}</span>
                    <span className="resume__award-meta">{a.org} · {a.date}</span>
                  </li>
                ))}
              </ul>
            </section>

          </aside>

          {/* RIGHT experience */}
          <div className="resume__main">
            <section className="resume__block">
              <h2 className="resume__block-title">Work Experience</h2>
              <div className="resume__timeline">
                {experience.map((job, i) => (
                  <div className="resume__job" key={i}>
                    <div className="resume__job-meta">
                      <span className="resume__job-period">{job.period}</span>
                      <span className="resume__job-location">{job.location}</span>
                    </div>
                    <h3 className="resume__job-role">{job.role}</h3>
                    <p className="resume__job-company">{job.company}</p>
                    <ul className="resume__bullets">
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Resume;