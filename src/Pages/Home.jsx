import React from "react";
import "../index.css";

export default function Home() {
    return (
        <div className="rf-container">
            {/* NAV */}
            <nav className="rf-nav">
                <div className="rf-logo">RenderFlow<span>+</span></div>
                <button className="rf-btn">Get Started</button>
            </nav>

            {/* HERO */}
            <section className="rf-hero">
                <h1>Build. Create. Execute.</h1>
                <p>
                    RenderFlow+ helps you test code, generate UI components, and run
                    interactive workflows — all inside your browser.
                </p>

                <button className="rf-btn big">Try Demo</button>
            </section>

            {/* FEATURES */}
            <section className="rf-features">
                <div className="rf-feature-card">
                    <h3>Instant Preview</h3>
                    <p>See changes live as you type. No setup required.</p>
                </div>

                <div className="rf-feature-card">
                    <h3>Smart Editor</h3>
                    <p>Code faster with our lightweight, modern editor.</p>
                </div>

                <div className="rf-feature-card">
                    <h3>Shareable Links</h3>
                    <p>Send your work instantly with secure share links.</p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="rf-footer">
                <p>© 2025 RenderFlow+. All rights reserved.</p>
            </footer>
        </div>
    );
}
