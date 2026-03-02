"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function addRevealRef(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <Image src="/logo.png" alt="A&E Vineyard Development" width={44} height={44} />
          </a>
          <a
            href="#quote"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("quote");
            }}
          >
            Get a Quote
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <Image
          src="/logo.png"
          alt="A&E Vineyard Development"
          width={200}
          height={200}
          className="hero-logo-mark"
          priority
        />
        <h1>
          Vineyard land work,
          <br />
          <em>done right.</em>
        </h1>
        <p className="hero-sub">
          Professional discing, ripping, and tearout for vineyards across
          Northern California.
        </p>
        <a
          href="#quote"
          className="hero-cta"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("quote");
          }}
        >
          Request a Free Quote
        </a>
        <div className="hero-tags">
          <span>Discing</span>
          <span>Ripping</span>
          <span>Tearout</span>
          <span>NorCal</span>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <h2 ref={addRevealRef} className="reveal">
          What We Do
        </h2>
        <div className="services-grid">
          <div ref={addRevealRef} className="svc reveal reveal-delay-1">
            <div className="svc-label">Service</div>
            <h3>Vineyard Discing</h3>
            <p>
              Breaking up soil, controlling weeds, and preparing the vineyard
              floor for planting or seasonal maintenance. Even, thorough
              coverage across your full acreage.
            </p>
          </div>
          <div ref={addRevealRef} className="svc reveal reveal-delay-2">
            <div className="svc-label">Service</div>
            <h3>Vineyard Ripping</h3>
            <p>
              Deep ripping to break through hardpan and compacted layers.
              Improves drainage and root penetration — critical for new
              plantings and vineyard renovation.
            </p>
          </div>
          <div ref={addRevealRef} className="svc reveal reveal-delay-3">
            <div className="svc-label">Service</div>
            <h3>Vineyard Tearout</h3>
            <p>
              Complete removal of old or dead vines, including root extraction
              and full land clearing. Your acreage cleaned out and ready for
              replanting.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust">
        <div ref={addRevealRef} className="trust-inner reveal">
          <div className="trust-item">
            <h4>Heavy Iron</h4>
            <p>D6 dozers &amp; industrial implements</p>
          </div>
          <div className="trust-item">
            <h4>Vineyard Only</h4>
            <p>This is all we do</p>
          </div>
          <div className="trust-item">
            <h4>On Time</h4>
            <p>We show up &amp; deliver</p>
          </div>
          <div className="trust-item">
            <h4>Wine Country</h4>
            <p>Napa, Sonoma, Solano &amp; beyond</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={addRevealRef} className="about reveal">
        <h2>Built for Vineyard Work</h2>
        <p>
          We&apos;re not a general contractor with a tractor. A&amp;E Vineyard
          Development is purpose-built for vineyard land preparation. We know
          the soil, the terrain, and the timelines that matter in wine country.
        </p>
        <p>
          Our equipment is sized for the job and our crew knows how to run it.
          From small blocks to large-scale replants, we get your ground ready
          so you can focus on growing.
        </p>
      </section>

      {/* Quote Form */}
      <section className="form-section" id="quote">
        <div ref={addRevealRef} className="form-card reveal">
          <h2>Get a Free Quote</h2>
          <p className="form-sub">
            Tell us about your project. We respond within 24 hours.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(707) 555-1234"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Property Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="City or county"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Vineyard Discing">Vineyard Discing</option>
                  <option value="Vineyard Ripping">Vineyard Ripping</option>
                  <option value="Vineyard Tearout">Vineyard Tearout</option>
                  <option value="Multiple Services">Multiple Services</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="acreage">Estimated Acreage</label>
                <select id="acreage" name="acreage" defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  <option value="Under 5 acres">Under 5 acres</option>
                  <option value="5-20 acres">5 - 20 acres</option>
                  <option value="20-50 acres">20 - 50 acres</option>
                  <option value="50+ acres">50+ acres</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="details">
                  Project Details{" "}
                  <span style={{ fontWeight: 400, color: "#bbb3a6" }}>
                    (optional)
                  </span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" className="form-submit">
                Submit Quote Request
              </button>
              <p className="form-note">Your information is kept private.</p>
            </form>
          ) : (
            <div style={{ padding: "36px 0", textAlign: "center" }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8922a"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ marginBottom: 14 }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 style={{ marginBottom: 8 }}>Quote Request Received</h3>
              <p style={{ color: "#777", fontSize: 15 }}>
                We&apos;ll review your project and get back to you within 24
                hours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Image
          src="/logo.png"
          alt="A&E"
          width={56}
          height={56}
          className="footer-logo"
        />
        <p>&copy; 2026 A&amp;E Vineyard Development</p>
        <p>
          Serving Napa, Sonoma, Solano, Lake County &amp; surrounding wine
          regions.
        </p>
      </footer>
    </>
  );
}
