
"use client";

import { useEffect, useRef, useState } from "react";


const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore everything MindSpace offers and discover opportunities that match your ambitions.",
    points: [
      "Explore possibilities",
      "Discover services",
      "Find inspiration",
    ],
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Share your goals and connect with the right people to understand your next steps.",
    points: [
      "Understand your needs",
      "Personalised guidance",
      "Expert support",
    ],
  },
  {
    number: "03",
    title: "Explore Solutions",
    description:
      "Discover the right services, resources and opportunities for your individual journey.",
    points: [
      "Explore solutions",
      "Compare opportunities",
      "Choose your direction",
    ],
  },
  {
    number: "04",
    title: "Take Action",
    description:
      "Move from ideas to action with the right resources and guidance along the way.",
    points: [
      "Create your plan",
      "Make progress",
      "Achieve milestones",
    ],
  },
  {
    number: "05",
    title: "Grow Forward",
    description:
      "Keep moving forward with continued support, new opportunities and meaningful progress.",
    points: [
      "Ongoing support",
      "New opportunities",
      "Future growth",
    ],
  },
];


export default function JourneyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const distance = section.offsetHeight - window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(0.9999, -section.getBoundingClientRect().top / distance)
        );

        const next = Math.min(
          steps.length - 1,
          Math.floor(progress * steps.length)
        );

        setActive((current) => current === next ? current : next);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = steps[active];

  return (
    <section ref={sectionRef} className="journey-section">
      <style>{`
        .journey-section {
          height: 500svh;
          background: #050608;
          color: white;
        }

        .journey-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          padding: 30px 22px;
        }

        .journey-header {
          text-align: center;
        }

        .journey-header small {
          color: #A9C7FF;
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .journey-header h2 {
          margin-top: 10px;
          font-size: clamp(34px, 4vw, 55px);
          font-weight: 500;
          letter-spacing: -.06em;
        }

        .journey-progress {
          display: flex;
          width: min(560px, 85vw);
          gap: 10px;
          margin: 23px auto 0;
        }

        .journey-progress span {
          flex: 1;
          height: 5px;
          border-radius: 20px;
          background: #41444B;
          transition: background .3s ease;
        }

        .journey-progress span.active {
          background: #2F7BFF;
        }

        .journey-frame {
          position: relative;
          display: flex;
          flex: 1;
          width: min(100%, 1050px);
          min-height: 0;
          flex-direction: column;
          margin: 42px auto 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 12px;
          background: #F5F7FB;
        }

        .journey-topbar {
          display: flex;
          height: 48px;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          background: #08090D;
          color: white;
          font-size: 11px;
        }

        .journey-brand {
          font-weight: 700;
          letter-spacing: .08em;
        }

        .journey-brand span {
          margin-right: 9px;
          color: #2F7BFF;
        }

        .journey-screen {
          display: grid;
          flex: 1;
          min-height: 0;
          grid-template-columns: 190px 1fr;
          color: #172033;
        }

        .journey-sidebar {
          padding: 26px 18px;
          background: #F8FAFC;
          border-right: 1px solid #E5E7EB;
        }

        .journey-sidebar small {
          color: #8993A5;
          font-size: 10px;
          letter-spacing: .13em;
        }

        .journey-nav {
          margin-top: 24px;
        }

        .journey-nav div {
          padding: 12px;
          margin-bottom: 7px;
          border-radius: 6px;
          color: #697386;
          font-size: 12px;
        }

        .journey-nav div.selected {
          background: #E8F0FF;
          color: #245FE4;
          font-weight: 700;
        }

        .journey-main {
          padding: clamp(22px, 4vw, 48px);
          background: #F2F5FA;
        }

        .journey-main small {
          color: #2F7BFF;
          font-size: 10px;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .journey-main h3 {
          margin-top: 12px;
          font-size: clamp(23px, 3vw, 34px);
          letter-spacing: -.05em;
        }

        .journey-main p {
          margin-top: 8px;
          color: #667085;
          font-size: 13px;
        }

        .journey-task-list {
          max-width: 530px;
          margin-top: 28px;
          padding: 8px 20px;
          border: 1px solid #E1E6EF;
          border-radius: 10px;
          background: white;
        }

        .journey-task {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 17px 0;
          border-bottom: 1px solid #EDF0F4;
          color: #344054;
          font-size: 13px;
        }

        .journey-task:last-child {
          border: 0;
        }

        .journey-task span {
          display: grid;
          width: 23px;
          height: 23px;
          place-items: center;
          border-radius: 6px;
          background: #EAF1FF;
          color: #2F7BFF;
          font-size: 11px;
        }

        .journey-overlay {
          position: absolute;
          inset: 48px 0 0;
          background: rgba(12,18,37,.68);
        }

        .journey-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(490px, calc(100% - 32px));
          padding: clamp(24px, 3vw, 35px);
          border: 1px solid #2F7BFF;
          border-radius: 11px;
          background: white;
          color: #111827;
          box-shadow: 0 0 38px rgba(47,123,255,.5);
          transform: translate(-50%, -50%);
          animation: journey-enter .4s ease both;
        }

        .journey-card small {
          color: #2F7BFF;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .journey-card h3 {
          margin-top: 14px;
          color: #245FE4;
          font-size: clamp(29px, 3vw, 38px);
          font-weight: 500;
          letter-spacing: -.05em;
          line-height: 1.2;
        }

        .journey-card p {
          margin-top: 14px;
          color: #475467;
          font-size: 14px;
          line-height: 1.7;
        }

        .journey-count {
          position: absolute;
          right: 20px;
          bottom: 17px;
          color: white;
          font-size: 11px;
          letter-spacing: .12em;
        }

        @keyframes journey-enter {
          from {
            opacity: 0;
            transform: translate(-50%, -46%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @media(max-width: 650px) {
          .journey-sticky {
            min-height: 540px;
            padding: 25px 12px;
          }

          .journey-frame {
            margin-top: 28px;
          }

          .journey-screen {
            grid-template-columns: 90px 1fr;
          }

          .journey-sidebar {
            padding: 18px 8px;
          }

          .journey-nav div {
            padding: 9px 6px;
            font-size: 9px;
          }

          .journey-main {
            padding: 18px 12px;
          }

          .journey-task-list {
            padding: 5px 12px;
          }

          .journey-task {
            font-size: 11px;
            padding: 14px 0;
          }

          .journey-card h3 {
            font-size: 29px;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .journey-card {
            animation: none;
          }
        }
      `}</style>

      <div className="journey-sticky">
        <header className="journey-header">
          <small>THE MINDSPACE JOURNEY</small>
          <h2>Every step moves you forward..</h2>

          <div className="journey-progress">
            {steps.map((item, index) => (
              <span
                key={item.number}
                className={index <= active ? "active" : ""}
              />
            ))}
          </div>
        </header>

        <div className="journey-frame">
          <div className="journey-topbar">
            <div className="journey-brand">
              <span>◈</span> MINDSPACE
            </div>
            <span>STUDENT JOURNEY</span>
          </div>

          <div className="journey-screen">
            <aside className="journey-sidebar">
              <small>YOUR JOURNEY</small>
              <div className="journey-nav">
                {steps.map((item, index) => (
                  <div
                    key={item.number}
                    className={index === active ? "selected" : ""}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </aside>

            <main className="journey-main">
              <small>STEP {step.number} / 05</small>
              <h3>{step.title}</h3>
              <p>{step.description}</p>

              <div className="journey-task-list">
                {step.points.map((point, index) => (
                  <div className="journey-task" key={point}>
                    <span>✓</span>
                    {point}
                  </div>
                ))}
              </div>
            </main>
          </div>

          <div className="journey-overlay" />

          <article key={active} className="journey-card">
            <small>STEP {step.number} — {step.title}</small>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>

          <span className="journey-count">
            {step.number} / 05
          </span>
        </div>
      </div>
    </section>
  );
}
