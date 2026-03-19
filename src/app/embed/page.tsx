"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Code2,
  Copy,
  CheckCheck,
  ShieldCheck,
  Leaf,
  CreditCard,
  Hospital,
  Globe,
  ArrowRight,
  Zap,
  Lock,
  Package,
  FileJson,
  PlayCircle,
} from "lucide-react";
import { GetChallenge } from "@/components/get-challenge";
import Link from "next/link";

const snippets = {
  react: `import { GetChallenge } from '@get-verify/react'

export default function LoginPage() {
  return (
    <div>
      <h1>Login to your account</h1>

      {/* Replace CAPTCHA with awareness */}
      <GetChallenge
        domain="cybersecurity"
        context="social-login"
        onVerify={(certificate) => {
          // certificate.id — verifiable proof
          // certificate.domain — what they learned
          // certificate.timestamp — when it happened
          loginUser(certificate)
        }}
      />
    </div>
  )
}`,

  html: `<!-- Drop the script tag once -->
<script src="https://cdn.get-verify.io/v1/get.min.js"></script>

<!-- Place where your CAPTCHA used to be -->
<div
  data-get-challenge
  data-domain="environment"
  data-context="general"
  data-on-verify="window.handleVerified"
  data-locale="en-KE"
></div>

<script>
  window.handleVerified = function(certificate) {
    console.log('Verified:', certificate.id)
    // proceed with form submission
  }
</script>`,

  api: `# 1. Request a challenge
POST https://api.get-verify.io/v1/challenge
Authorization: Bearer GET_YOUR_KEY_AT_CONSOLE
Content-Type: application/json

{
  "domain": "law",
  "context": "banking",
  "difficulty": "beginner",
  "locale": "en-KE"
}

# → Response
{
  "challenge_id": "ch_8x2k9...",
  "question": "Under Kenya's Data Protection Act...",
  "options": [...],
  "expires_at": "2025-03-20T14:30:00Z"
}

# 2. Verify the response
POST https://api.get-verify.io/v1/verify
{
  "challenge_id": "ch_8x2k9...",
  "answer_index": 1
}

# → Certificate
{
  "certificate_id": "cert_7a1f...",
  "verified": true,
  "domain": "law",
  "timestamp": "2025-03-20T14:29:43Z",
  "awareness_score": 1.0
}`,
};

const integrations = [
  {
    icon: Globe,
    label: "Social Login",
    description: "Replace CAPTCHA on any login or signup form",
    domain: "cyber",
    tag: "Most common",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CreditCard,
    label: "Banking & Finance",
    description: "Verify financial literacy before high-risk transactions",
    domain: "business",
    tag: "Compliance",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Hospital,
    label: "Healthcare / EMR",
    description: "Confirm data handling awareness before record access",
    domain: "law",
    tag: "HIPAA-ready",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Lock,
    label: "Government Portals",
    description: "Civic awareness at every citizen digital interaction",
    domain: "civic",
    tag: "eCitizen",
    color: "bg-primary/10 text-primary",
  },
];

export default function EmbedPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoContext, setDemoContext] = useState<
    "social-login" | "banking" | "hospital" | "general"
  >("general");

  function handleCopy(key: string) {
    navigator.clipboard.writeText(snippets[key as keyof typeof snippets]);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <div className="mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-5">
          <Code2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            Embed GET
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
          GET is infrastructure.
          <br />
          <span className="text-primary">Three lines of code.</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Replace CAPTCHA on any website with a verified learning moment.
          Works with React, plain HTML, or any backend via REST API. Every
          interaction generates a compliance certificate and contributes to
          the world&apos;s first real-time knowledge gap index.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <Button onClick={() => setDemoOpen(true)} className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Try Live Demo
          </Button>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View impact data <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 mb-10 sm:mb-14">
        {[
          { value: "3 lines", label: "to integrate" },
          { value: "< 200ms", label: "avg challenge load" },
          { value: "99.9%", label: "uptime SLA" },
          { value: "GDPR", label: "ready · zero PII stored" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-muted/30 px-5 py-4"
          >
            <div className="text-xl font-bold text-primary">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2 mb-10 sm:mb-14">
        {/* Code snippets */}
        <div>
          <h2 className="text-xl font-bold mb-1">Drop-in integration</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Works everywhere. Pick your stack.
          </p>

          <Tabs defaultValue="react">
            <TabsList className="mb-0 rounded-b-none border-b-0 w-full justify-start">
              <TabsTrigger value="react" className="gap-1.5 text-xs">
                <Package className="h-3.5 w-3.5" />
                React / Next.js
              </TabsTrigger>
              <TabsTrigger value="html" className="gap-1.5 text-xs">
                <Code2 className="h-3.5 w-3.5" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-1.5 text-xs">
                <FileJson className="h-3.5 w-3.5" />
                REST API
              </TabsTrigger>
            </TabsList>

            {(["react", "html", "api"] as const).map((key) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="relative rounded-t-none rounded-b-xl border border-border bg-muted/60">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-destructive/40" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/40" />
                      <div className="h-3 w-3 rounded-full bg-primary/40" />
                    </div>
                    <button
                      onClick={() => handleCopy(key)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied === key ? (
                        <>
                          <CheckCheck className="h-3.5 w-3.5 text-primary" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/80 font-mono">
                    <code>{snippets[key]}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Live demo panel */}
        <div>
          <h2 className="text-xl font-bold mb-1">Live preview</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Tap any integration to fire a real GET Challenge.
          </p>

          <div className="space-y-3">
            {integrations.map((integration) => (
              <button
                key={integration.label}
                onClick={() => {
                  const ctx =
                    integration.label === "Social Login"
                      ? "social-login"
                      : integration.label === "Banking & Finance"
                      ? "banking"
                      : integration.label === "Healthcare / EMR"
                      ? "hospital"
                      : "general";
                  setDemoContext(ctx);
                  setDemoOpen(true);
                }}
                className="w-full flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 hover:border-primary/40 hover:bg-primary/3 transition-all text-left group"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${integration.color}`}
                >
                  <integration.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{integration.label}</p>
                    <Badge variant="secondary" className="text-[10px]">
                      {integration.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {integration.description}
                  </p>
                </div>
                <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Zero PII stored.</strong>{" "}
              GET never stores names, emails, or identifiers. Each challenge
              returns a signed, timestamped certificate you control. Fully
              GDPR, POPIA, and Kenya DPA compliant.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate preview */}
      <div className="mb-14">
        <h2 className="text-xl font-bold mb-1">Every challenge generates a certificate</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Proof of awareness — verifiable, timestamped, downloadable. The compliance
          use case that no CAPTCHA can offer.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              id: "cert_7a1f2b9c",
              topic: "Data Privacy & Consent",
              domain: "Cybersecurity",
              context: "Banking login",
              score: "100%",
              date: "Mar 20, 2025 · 09:14 AM",
              icon: CreditCard,
            },
            {
              id: "cert_3d8e4a1f",
              topic: "Electoral Rights Awareness",
              domain: "Civic & Democracy",
              context: "Government portal",
              score: "100%",
              date: "Mar 20, 2025 · 11:32 AM",
              icon: Globe,
            },
            {
              id: "cert_9c5f7b2e",
              topic: "Climate Tipping Points",
              domain: "Environment",
              context: "Social login",
              score: "100%",
              date: "Mar 20, 2025 · 02:51 PM",
              icon: Leaf,
            },
          ].map((cert) => (
            <Card
              key={cert.id}
              className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10"
            >
              <CardHeader className="pb-2 flex-row items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      GET Certificate
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {cert.id}
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                  <cert.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-3 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Topic</p>
                  <p className="text-sm font-semibold">{cert.topic}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Domain</p>
                    <p className="text-xs font-medium">{cert.domain}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Context</p>
                    <p className="text-xs font-medium">{cert.context}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-xs font-bold text-primary">{cert.score}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-muted-foreground">{cert.date}</p>
                  <Badge className="text-[10px] bg-primary/15 text-primary border-primary/20">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="mb-14">
        <h2 className="text-xl font-bold mb-1">Simple pricing</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Start free. Scale with impact.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              tier: "Free",
              price: "$0",
              period: "forever",
              features: [
                "1,000 challenges / month",
                "All 10 knowledge domains",
                "Basic certificates",
                "Community support",
              ],
              cta: "Start building",
              highlight: false,
            },
            {
              tier: "Pro",
              price: "$49",
              period: "/ month",
              features: [
                "50,000 challenges / month",
                "Custom knowledge domains",
                "Signed compliance certificates",
                "Analytics dashboard access",
                "Priority support",
              ],
              cta: "Start free trial",
              highlight: true,
            },
            {
              tier: "Enterprise",
              price: "Custom",
              period: "",
              features: [
                "Unlimited challenges",
                "White-label SDK",
                "Knowledge gap reports",
                "SLA + dedicated onboarding",
                "Government & NGO pricing",
              ],
              cta: "Talk to us",
              highlight: false,
            },
          ].map((plan) => (
            <Card
              key={plan.tier}
              className={`border ${
                plan.highlight
                  ? "border-primary/40 bg-primary/5"
                  : "border-border"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{plan.tier}</span>
                  {plan.highlight && (
                    <Badge className="text-[10px] bg-primary text-primary-foreground">
                      Most popular
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-3">
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <Zap className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className="w-full mt-2"
                  size="sm"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 mb-4">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">
            GET is infrastructure
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-3">
          Ready to replace CAPTCHA with knowledge?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">
          Every verification becomes a learning moment. Every wrong answer
          becomes a teaching opportunity. Every interaction builds a richer
          picture of collective awareness.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setDemoOpen(true)} className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Try the challenge
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              View impact data <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <GetChallenge
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        context={demoContext}
      />
    </main>
  );
}
