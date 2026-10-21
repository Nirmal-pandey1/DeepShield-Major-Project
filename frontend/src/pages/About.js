import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";
import aboutMission from "../assets/images/about-mission.jpg";
import aboutTechnology from "../assets/images/about-technology.jpg";
import aboutTeam from "../assets/images/about-team.jpg";
import "./About.css";

const methodology = [
  "Choose image, video, audio, URL or QR code",
  "Preview the selected input and validate supported file types",
  "Authenticate the account before file upload",
  "Store uploaded files in the user's history",
  "Connect the matching detector service for analysis",
];

const techStack = [
  "React",
  "React Router",
  "FastAPI",
  "SQLAlchemy",
  "JWT Authentication",
  "MySQL",
];

const architecture = [
  "React Detection Studio",
  "JWT Authentication",
  "FastAPI Upload API",
  "User File History",
  "Detector Integrations",
];

function AboutImageBanner({ src, alt, withScanLine }) {
  return (
    <motion.div
      className="about-banner"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="about-banner-wrap">
        <img src={src} alt={alt} />
        {withScanLine && <div className="scan-line" />}
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <AnimatedText as="span" className="eyebrow">
          ABOUT THE PROJECT
        </AnimatedText>
        <AnimatedText as="h1" delay={0.1}>
          About <span className="text-gradient">DeepShield</span>
        </AnimatedText>
        <AnimatedText delay={0.2}>
          <p className="about-lead">
            An authenticated workspace for image, video, audio, website URL and QR
            code inputs. The frontend and API handle detector selection, file validation,
            protected uploads and account history, with analysis results supplied by each modality's detector integration once connected.
          </p>
        </AnimatedText>
      </section>

      <AboutImageBanner
        src={aboutMission}
        alt="A visual representation of multi-input media checks"
        withScanLine
      />

      {/* OBJECTIVE */}
      <section className="about-section">
        <AnimatedText>
          <GlassCard className="about-card">
            <h2>Project objective</h2>
            <p>
              DeepShield brings five input types into one consistent, accessible
              workflow. The frontend supports image, video, audio, URL and QR code
              submissions, while authentication and protected file uploads keep each
              user's file activity tied to their account.
            </p>
          </GlassCard>
        </AnimatedText>
      </section>

      {/* DETECTION WORKFLOW */}
      <section className="about-section">
        <AnimatedText as="h2" className="section-title">
          Detection workflow
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <GlassCard className="about-card">
            <p>
              Select one of five modes: image, video, audio, website URL or QR
              code image. File inputs can be previewed and checked against the accepted
              formats and size limit before they are sent to the authenticated upload
              endpoint.
            </p>
            <p>
              Uploaded files are associated with the signed-in account and appear
              in its upload history. Analysis results are shown when the detector
              service for that modality is connected.
            </p>
          </GlassCard>
        </AnimatedText>
      </section>

      <AboutImageBanner
        src={aboutTechnology}
        alt="Secure media input and account workflow"
      />

      {/* METHODOLOGY TIMELINE */}
      <section className="about-section methodology-section">
        <AnimatedText as="h2" className="section-title">
          Methodology
        </AnimatedText>
        <div className="timeline">
          {methodology.map((step, i) => (
            <AnimatedText key={step} delay={i * 0.1}>
              <div className="timeline-item">
                <div className="timeline-marker">{`0${i + 1}`}</div>
                <p>{step}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
        <AnimatedText delay={0.2}>
          <p className="methodology-note">
            File uploads are limited to 50 MB and support image, video and audio
            formats plus QR code images. Website links accept HTTP and HTTPS addresses.
          </p>
        </AnimatedText>
      </section>

      {/* TECH STACK */}
      <section className="about-section">
        <AnimatedText as="h2" className="section-title">
          Technology stack
        </AnimatedText>
        <div className="tech-badges">
          {techStack.map((tech, i) => (
            <AnimatedText key={tech} delay={i * 0.06}>
              <span className="tech-badge">{tech}</span>
            </AnimatedText>
          ))}
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE FLOW */}
      <section className="about-section">
        <AnimatedText as="h2" className="section-title">
          System architecture
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="architecture-intro">
            The application follows a modular full-stack architecture, keeping
            the interface, authenticated API, file storage and detector integrations separate.
          </p>
        </AnimatedText>
        <div className="architecture-flow">
          {architecture.map((node, i) => (
            <React.Fragment key={node}>
              <AnimatedText delay={i * 0.1}>
                <div className="flow-node">{node}</div>
              </AnimatedText>
              {i < architecture.length - 1 && <span className="flow-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <AboutImageBanner
        src={aboutTeam}
        alt="A connected set of digital media inputs"
      />

      {/* SOCIETAL IMPACT */}
      <section className="about-section">
        <AnimatedText as="h2" className="section-title">
          Societal impact
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <GlassCard className="about-card">
            <p>
              Images, videos, audio, website links and QR codes can enter through
              one consistent interface. The application keeps upload and account
              management separate from the analysis service, so each detector can be
              connected through its own integration.
            </p>
            <p>
              Detection output depends on the analysis service connected to each
              input type. The interface is designed to present those results alongside
              clear input and upload status.
            </p>
          </GlassCard>
        </AnimatedText>
      </section>

      <section className="about-cta">
        <AnimatedText as="h2" className="section-title">
          Ready to see it in action?
        </AnimatedText>
        <Link to="/detect">
          <motion.button className="primary-btn">Try DeepShield</motion.button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default About;