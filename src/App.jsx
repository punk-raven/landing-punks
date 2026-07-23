import React, { useEffect, useRef } from "react";
import { Button, Card } from "@heroui/react";

const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const marqueeContent = Array(4).fill(
    "abcd · efgh · ijklm · nopq · rstuv · wxyzab · "
  );

  return (
    <div className="min-h-screen bg-paper font-body selection:bg-ink selection:text-white">

      {/* 1. NAV */}
      <nav className="sticky top-0 z-50 bg-paper border-b border-border flex justify-between items-center px-6 py-4">
        <div className="font-display text-[24px] tracking-wide">NyayaSetu</div>
        <div className="hidden md:flex gap-8 text-[14px] text-muted">
          <a href="#product" className="hover:text-ink transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">How It Works</a>
          <a href="#about" className="hover:text-ink transition-colors">About</a>
        </div>
        <Button variant="primary" className="rounded-none">Request Access</Button>
      </nav>

      {/* 2. HERO */}
      <section className="bg-ink text-white pt-24 pb-12 overflow-hidden flex flex-col justify-between min-h-[85vh]">
        <div className="px-6 max-w-5xl mx-auto w-full mt-12">
          <span className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-8">
            Legal Intelligence Platform
          </span>
          <h1 className="font-display text-[80px] md:text-[96px] leading-[0.9] tracking-tight mb-8">
            <span className="block">Lorem ipsum</span>
            <span className="block italic hero-stroke">dolor sit amet</span>
            <span className="block">dolor sit.</span>
          </h1>
          <p className="font-body text-[18px] text-white/65 leading-[1.7] max-w-[560px] mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className="flex gap-4">
            <Button variant="primary" className="rounded-none px-6 py-3">Get Started</Button>
            <Button variant="secondary" className="rounded-none px-6 py-3 border border-white/20 bg-transparent hover:bg-white/5">
              Read the Manifesto
            </Button>
          </div>
        </div>

        <div className="mt-24 border-t border-white/15 pt-6 overflow-hidden flex whitespace-nowrap opacity-40 uppercase text-[11px] tracking-widest text-white">
          <div className="animate-marquee">
            {marqueeContent.map((text, i) => (
              <span key={i} className="pr-4">{text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section id="product" className="bg-paper text-ink py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-6">
              The Problem
            </span>
            <h2 className="font-display text-[48px] md:text-[64px] leading-[1.1] max-w-[800px] mb-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
            {[
              {
                title: "Prob 1",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
              },
              {
                title: "Prob2",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
              },
              {
                title: "Prob3",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
              },
            ].map((item, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                className={`p-8 pl-0 md:pl-8 ${idx !== 2 ? "md:border-r md:border-border" : ""}`}
              >
                <span className="font-display italic text-[13px] text-muted block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="font-body font-bold text-[15px] mb-3">{item.title}</h3>
                <p className="text-muted text-[15px] leading-[1.7]">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section className="bg-ink text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-6">
              Enter NyayaSetu
            </span>
            <h2 className="font-display text-[48px] leading-[1.1] mb-6">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="text-white/65 text-[16px] leading-[1.7]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor
              id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis
              euismod semper. Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="border border-white/20 bg-ink p-8 rounded-none font-mono text-[13px] text-white/80 leading-[1.8] shadow-none">
              <div className="mb-6 flex gap-3">
                <span className="text-white/40">{">"}</span>
                <span>Lorem ipsum dolor sit amet, consectetur elit</span>
              </div>
              <div className="flex gap-3 text-white/60">
                <span className="text-white/40">{"<"}</span>
                <span className="pl-4 border-l border-white/20 block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit fermentum.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="bg-paper text-ink py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-6 text-center">
              How It Works
            </span>
            <h2 className="font-display text-[48px] md:text-[64px] text-center mb-20">
              Lorem ipsum dolor sit amet output.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "abcdefg",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis.",
              },
              {
                title: "fxcg vhb",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare.",
              },
              {
                title: "fcgvhb",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit.",
              },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150} className="border-t border-border pt-6 mt-4">
                <span className="font-display italic text-[60px] text-border leading-none block mb-6">
                  0{idx + 1}
                </span>
                <h3 className="font-body font-bold text-[15px] mb-3">{step.title}</h3>
                <p className="text-muted text-[15px] leading-[1.7]">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURES */}
      <section className="bg-ink text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-12">
              Platform Modules
            </span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {[
              {
                title: "cfgvhb",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius.",
              },
              {
                title: "tfgvhbj",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis.",
              },
              {
                title: "gfcvhbj",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula.",
              },
              {
                title: "cgfvhbj",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed.",
              },
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <Card.Root className="bg-ink border-none rounded-none shadow-none hover:bg-white/5 transition-colors duration-200 h-full p-8">
                  <Card.Header className="p-0 pb-4 flex flex-col items-start gap-4">
                    <span className="font-display italic text-[13px] text-muted">0{idx + 1}</span>
                    <Card.Title className="text-[15px] font-bold text-white tracking-wide">
                      {feature.title}
                    </Card.Title>
                  </Card.Header>
                  <Card.Content className="p-0">
                    <p className="text-white/50 text-[15px] leading-[1.7]">{feature.desc}</p>
                  </Card.Content>
                </Card.Root>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-ink text-white py-32 border-t border-white/10 px-6">
        <Reveal className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-display text-[64px] md:text-[80px] leading-[1] mb-10">
            <span className="block">Lorem ipsum dolor</span>
            <span className="block italic hero-stroke">sit amet today?</span>
          </h2>
          <Button variant="primary" className="rounded-none px-8 py-4 text-[15px]">
            Request Access Today
          </Button>
        </Reveal>
      </section>

      {/* 8. FOOTER */}
      <footer id="about" className="bg-paper text-ink border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-[18px]">NyayaSetu</div>
          <div className="flex gap-6 text-[13px] text-muted">
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">System Status</a>
          </div>
          <div className="text-[13px] text-muted">
            © {new Date().getFullYear()} NyayaSetu Inc.
          </div>
        </div>
      </footer>

    </div>
  );
}