import { useParams } from "react-router-dom";
import { STARTUPS } from "@/data/mockData";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Pencil } from "lucide-react";

const ANCHORS = ["Overview", "Features", "Benefits", "FAQ", "Contact"];

const MarketingPage = () => {
  const { id } = useParams();
  const startup = STARTUPS.find((s) => s.id === id) || STARTUPS[0];
  const [mode, setMode] = useState<"preview" | "edit">("preview");

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-10">
      {/* Mode toggle */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-section-heading text-foreground">{startup.name} — Vitrine</h1>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "preview"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={() => setMode("edit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "edit"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>
      </div>

      {/* Section Anchors */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b mb-8 -mx-8 px-8">
        <div className="flex gap-6 py-3">
          {ANCHORS.map((anchor) => (
            <a
              key={anchor}
              href={`#${anchor.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {anchor}
            </a>
          ))}
        </div>
      </div>

      {mode === "preview" ? (
        <div className="space-y-16">
          {/* Hero */}
          <section id="overview" className="text-center py-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-display text-foreground mb-4"
            >
              {startup.tagline}
            </motion.h2>
            <p className="text-body text-muted-foreground mx-auto max-w-2xl mb-8">
              {startup.description}
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </section>

          {/* Features */}
          <section id="features">
            <h2 className="text-section-heading text-foreground mb-6 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {startup.features.map((f) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="surface-card p-6"
                >
                  <div className="w-3 h-3 rounded-full bg-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{f}</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade {f.toLowerCase()} designed for modern teams.
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="text-center">
            <h2 className="text-section-heading text-foreground mb-4">Why {startup.name}?</h2>
            <p className="text-body text-muted-foreground mx-auto">{startup.solution}</p>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-section-heading text-foreground mb-6 text-center">FAQ</h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {["How does it work?", "What's the pricing?", "Is there a free trial?"].map((q) => (
                <div key={q} className="surface-card p-5">
                  <p className="font-medium text-foreground">{q}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'd be happy to discuss this in detail. Contact us for more information.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="text-center py-12">
            <h2 className="text-section-heading text-foreground mb-3">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">Ready to transform your business?</p>
            <Button size="lg">Contact Us</Button>
          </section>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-6">
            <p className="text-label text-muted-foreground mb-2">Hero Title</p>
            <input
              defaultValue={startup.tagline}
              className="w-full text-xl font-bold bg-transparent border-b border-border pb-2 outline-none focus:border-primary text-foreground"
            />
          </div>
          <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-6">
            <p className="text-label text-muted-foreground mb-2">Description</p>
            <textarea
              defaultValue={startup.description}
              rows={3}
              className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-primary resize-y text-sm text-foreground"
            />
          </div>
          <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-6">
            <p className="text-label text-muted-foreground mb-3">Sections</p>
            <div className="space-y-2">
              {["Problem", "Solution", "Features", "Benefits"].map((section) => (
                <div
                  key={section}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg border cursor-grab active:cursor-grabbing"
                >
                  <span className="text-muted-foreground text-xs">⠿</span>
                  <span className="text-sm font-medium text-foreground">{section}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button>Save Changes</Button>
            <Button variant="outline" onClick={() => setMode("preview")}>
              Preview
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingPage;
