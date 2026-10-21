import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, API_BASE } from "../context/AuthContext";
import AnimatedText from "../components/AnimatedText";
import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";
import "./History.css";

function getUploadType(upload) {
  if (upload.media_type === "qr" || /qr/i.test(upload.filename)) return "QR Code";
  if (upload.media_type) return upload.media_type.charAt(0).toUpperCase() + upload.media_type.slice(1);

  const extension = upload.filename.toLowerCase().split(".").pop();
  if (["mp4", "mov", "avi", "webm"].includes(extension)) return "Video";
  if (["mp3", "wav", "m4a", "aac", "ogg", "flac"].includes(extension)) return "Audio";
  return "Image";
}

function History() {
  const { token } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Could not load upload history");
        setUploads(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  const formatDate = (isoString) => {
    const utcString = isoString.endsWith("Z") ? isoString : isoString + "Z";
    return new Date(utcString).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <div className="history-page">
      <section className="history-intro">
        <AnimatedText as="span" className="eyebrow">YOUR ACTIVITY</AnimatedText>
        <AnimatedText as="h1" delay={0.1}>Upload <span className="text-gradient">history</span></AnimatedText>
        <AnimatedText delay={0.2}>
          <p className="history-lead">
            Your saved image, video, audio and QR image uploads appear here. URL input is a web address rather than a file upload, so it does not appear in file history.
          </p>
        </AnimatedText>
      </section>
      <section className="history-body">
        {loading && <p className="history-status">Loading your upload history...</p>}
        {error && <p className="history-status history-error">{error}</p>}
        {!loading && !error && uploads.length === 0 && (
          <AnimatedText>
            <GlassCard className="history-empty-card">
              <p>You haven't uploaded any files yet.</p>
              <Link className="history-empty-link" to="/detect">Choose a detector</Link>
            </GlassCard>
          </AnimatedText>
        )}
        {!loading && !error && uploads.length > 0 && (
          <div className="history-grid">
            {uploads.map((upload, i) => (
              <AnimatedText key={upload.id} delay={i * 0.05}>
                <motion.div className="history-card glass-card">
                  <div className="history-card-top">
                    <span className="history-badge history-type">{getUploadType(upload)}</span>
                    <span className="history-confidence">Saved</span>
                  </div>
                  <p className="history-filename">{upload.filename}</p>
                  <p className="history-date">{formatDate(upload.created_at)}</p>
                </motion.div>
              </AnimatedText>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default History;
