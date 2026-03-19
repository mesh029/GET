"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GetChallenge } from "@/components/get-challenge";
import { useDriverTour } from "@/components/driver-tour";
import {
  Leaf,
  Sparkles,
  Play,
  Globe,
  CreditCard,
  Hospital,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Chrome,
  Github,
  Lock,
  Scale,
  Telescope,
  Shirt,
  Brain,
  Briefcase,
  Lightbulb,
  Clock,
  Flame,
  GraduationCap,
  BookOpenCheck,
  School,
  Mail,
  Radio,
  Vote,
  Thermometer,
  TreePine,
  Wind,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Cpu,
  Network,
  Award,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import insightsData from "@/data/insights.json";
import { RandomInsight } from "@/components/random-insight";

type ChallengeContext = "social-login" | "banking" | "hospital";

const categoryIcons: Record<string, React.ElementType> = {
  ShieldCheck,
  Leaf,
  Scale,
  Telescope,
  Shirt,
  Brain,
  Briefcase,
};

// ── Climate impact calculator formula ────────────────────────────────────────
function calcClimateImpact(dailyUsers: number) {
  const dailyLessons = Math.round(dailyUsers * 0.15);
  const monthlyLessons = dailyLessons * 30;
  const annualLessons = dailyLessons * 365;
  const certifiedUsers = Math.round(annualLessons * 0.84);
  return { dailyLessons, monthlyLessons, annualLessons, certifiedUsers };
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

export default function HomePage() {
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeContext, setChallengeContext] =
    useState<ChallengeContext>("social-login");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );
  const [dailyUsers, setDailyUsers] = useState(100000);

  const periodInsights = useMemo(
    () => insightsData.periodInsights.slice(0, 3),
    []
  );
  const trending = useMemo(
    () => insightsData.trendingTopics.slice(0, 4),
    []
  );

  const impact = useMemo(() => calcClimateImpact(dailyUsers), [dailyUsers]);
  const annualCount = useCountUp(impact.annualLessons, 1200);

  function openChallenge(ctx: ChallengeContext) {
    setChallengeContext(ctx);
    setChallengeOpen(true);
  }

  function handleSuccess() {
    setCompletedSections((prev) => new Set(prev).add(challengeContext));
    setChallengeOpen(false);
  }

  const { startTour } = useDriverTour({
    onTriggerChallenge: openChallenge,
    onTourEnd: () => {},
  });

  return (
    <main>
      {/* ── CLIMATE HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Atmospheric layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/8 via-background to-emerald-800/6" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial atmospheric glow */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            {/* Climate urgency pill */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
              <Thermometer className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs font-semibold text-destructive tracking-wide">
                1.5°C crossed — 2024 confirmed by WMO
              </span>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Green Environment Technology
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-tight">
              Every verification.
              <br />
              <span className="text-primary">A missed lesson.</span>
            </h1>

            <p className="mb-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">2.8 billion times today</strong>, the internet will verify
              that you&apos;re human — then immediately forget you are. It will
              teach exactly <strong className="text-foreground">zero</strong> of those people anything
              about climate change, their civic rights, the cybersecurity risks
              they face, or the laws that protect them.
            </p>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
              GET converts the internet&apos;s most wasted resource — idle human
              attention at verification moments — into verified knowledge across
              every domain that shapes modern life.{" "}
              <span className="text-foreground font-medium">
                Climate. Civic rights. Cybersecurity. Law. Space. Business.
              </span>{" "}
              Starting with the planet&apos;s most urgent problem.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={startTour} className="gap-2 font-semibold">
                <Play className="h-4 w-4" />
                Start Experience
              </Button>
              <Link
                href="/learn"
                className={buttonVariants({ size: "lg", variant: "outline" }) + " gap-2"}
              >
                <BookOpen className="h-4 w-4" />
                Knowledge Hub
              </Link>
              <Link
                href="/learn/m16"
                className={buttonVariants({ size: "lg", variant: "ghost" }) + " gap-2"}
              >
                <Leaf className="h-4 w-4 text-primary" />
                Climate Deep Dive
              </Link>
            </div>
          </div>

          {/* Climate stat cards */}
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                value: "2.8B+",
                label: "Daily verification moments",
                sub: "Wasted on friction",
                icon: Users,
                color: "text-muted-foreground",
              },
              {
                value: "1.5°C",
                label: "Paris threshold breached",
                sub: "First time ever · 2024",
                icon: Thermometer,
                color: "text-destructive",
              },
              {
                  value: "10",
                  label: "Knowledge domains",
                  sub: "Climate · Cyber · Law · Civic + more",
                  icon: Globe,
                  color: "text-primary",
                },
              {
                value: "10B+",
                label: "Annual climate lessons",
                sub: "If GET replaces 1% of CAPTCHAs",
                icon: Leaf,
                color: "text-primary",
              },
            ].map(({ value, label, sub, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card/80 backdrop-blur-sm px-5 py-4"
              >
                <Icon className={`h-4 w-4 mb-2 ${color}`} />
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs font-medium text-foreground mt-0.5">
                  {label}
                </div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIMATE MECHANISM ────────────────────────────────────────────── */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-emerald-900/5">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-5">
              <TreePine className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                The Climate Mechanism
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How GET becomes
              <span className="text-primary"> knowledge infrastructure</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every crisis — climate, civic, cybersecurity, legal — is an
              awareness problem before it is anything else. People cannot act on
              what they do not understand. GET embeds verified knowledge into the
              fabric of the internet itself, at the exact moments humans are
              already paying attention.
            </p>
          </div>

          {/* 5-step mechanism */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {[
                {
                  step: "01",
                  icon: Network,
                  title: "Intercept",
                  desc: "A user reaches a verification moment — login, payment, portal access. Instead of a CAPTCHA bot-check, GET fires.",
                  color: "bg-primary/10 text-primary border-primary/20",
                },
                {
                  step: "02",
                  icon: Leaf,
                  title: "Challenge",
                  desc: "A real awareness question is served — climate tipping points, electoral rights, data privacy laws, or cyber threats. Context-matched.",
                  color: "bg-emerald-100/60 text-emerald-700 border-emerald-200",
                },
                {
                  step: "03",
                  icon: Award,
                  title: "Certify",
                  desc: "A compliance certificate is generated — a timestamped proof that this human demonstrated climate awareness.",
                  color: "bg-primary/10 text-primary border-primary/20",
                },
                {
                  step: "04",
                  icon: BarChart3,
                  title: "Map Gaps",
                  desc: "Anonymous signals aggregate into a real-time knowledge gap index — by region, domain, and demographics — across all 10 categories.",
                  color: "bg-emerald-100/60 text-emerald-700 border-emerald-200",
                },
                {
                  step: "05",
                  icon: Wind,
                  title: "Inform Change",
                  desc: "The data flows to governments, NGOs, educators, and compliance teams — targeting awareness gaps exactly where they are most critical.",
                  color: "bg-primary/10 text-primary border-primary/20",
                },
              ].map(({ step, icon: Icon, title, desc, color }) => (
                <div key={step} className="flex flex-col items-start gap-3">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${color} relative`}
                  >
                    <Icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-bold text-base">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Domain pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground mr-2 font-medium">Works across:</span>
            {[
              { label: "🌱 Climate", href: "/learn/m16" },
              { label: "🔐 Cybersecurity", href: "/learn/m1" },
              { label: "⚖️ Law & Rights", href: "/learn/m3" },
              { label: "🗳️ Civic & Democracy", href: "/learn/m13" },
              { label: "🌌 Space & Science", href: "/learn/m8" },
              { label: "💼 Business", href: "/learn/m6" },
              { label: "🤖 AI & Tech", href: "/learn/m14" },
              { label: "♟️ Chess & Strategy", href: "/learn/m15" },
              { label: "👗 Fashion & Culture", href: "/learn/m9" },
              { label: "🧠 Life Skills", href: "/learn/m11" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Before / After */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-bold text-destructive">
                  The world without GET
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "2.8B daily human moments teach nothing",
                  "CAPTCHA friction frustrates users, creates no value",
                  "Climate knowledge gaps grow while attention is wasted",
                  "Corporations have no way to demonstrate awareness impact",
                  "Governments cannot measure civic or climate knowledge at scale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="h-4 w-4 shrink-0 rounded-full border border-destructive/30 flex items-center justify-center mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive/50" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">
                  The world with GET
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Every verification = a verified awareness moment across all 10 domains",
                  "Climate: tipping points, Congo Basin, 1.5°C — explained and remembered",
                  "Civic: electoral rights, democracy, Kenya 2027 — understood before the ballot",
                  "Cyber: data privacy, phishing, breach risks — verified before login",
                  "Compliance certificates satisfy regulatory awareness requirements",
                  "Knowledge gap maps guide campaigns exactly where awareness is lowest",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIMATE IMPACT CALCULATOR ────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Calculator */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-6">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Impact Calculator
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                What would your platform
                <span className="text-primary"> teach?</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Move the slider to your platform&apos;s daily active users.
                See how many climate lessons GET would deliver annually.
              </p>

              {/* Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily active users</span>
                  <span className="text-sm font-bold text-primary">
                    {dailyUsers >= 1000000
                      ? `${(dailyUsers / 1000000).toFixed(1)}M`
                      : dailyUsers >= 1000
                      ? `${(dailyUsers / 1000).toFixed(0)}K`
                      : dailyUsers.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000000}
                  step={1000}
                  value={dailyUsers}
                  onChange={(e) => setDailyUsers(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-primary/20"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1K</span>
                  <span>100K</span>
                  <span>1M</span>
                  <span>10M</span>
                </div>
              </div>

              {/* Comparison examples */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { label: "Small app", value: 10000 },
                  { label: "NHIF Kenya", value: 500000 },
                  { label: "M-Pesa scale", value: 5000000 },
                  { label: "Twitter-scale", value: 8000000 },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => setDailyUsers(value)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      dailyUsers === value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-emerald-900/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">
                    Annual climate lessons
                  </span>
                </div>
                <div className="text-5xl font-bold text-primary mb-1">
                  {annualCount >= 1000000
                    ? `${(annualCount / 1000000).toFixed(1)}M`
                    : annualCount >= 1000
                    ? `${(annualCount / 1000).toFixed(0)}K`
                    : annualCount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Climate awareness moments per year from your platform alone
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: impact.dailyLessons >= 1000
                      ? `${(impact.dailyLessons / 1000).toFixed(1)}K`
                      : impact.dailyLessons.toLocaleString(),
                    label: "Daily",
                    sub: "lessons",
                    icon: Clock,
                  },
                  {
                    value: impact.monthlyLessons >= 1000000
                      ? `${(impact.monthlyLessons / 1000000).toFixed(1)}M`
                      : impact.monthlyLessons >= 1000
                      ? `${(impact.monthlyLessons / 1000).toFixed(0)}K`
                      : impact.monthlyLessons.toLocaleString(),
                    label: "Monthly",
                    sub: "lessons",
                    icon: TrendingUp,
                  },
                  {
                    value: impact.certifiedUsers >= 1000000
                      ? `${(impact.certifiedUsers / 1000000).toFixed(1)}M`
                      : impact.certifiedUsers >= 1000
                      ? `${(impact.certifiedUsers / 1000).toFixed(0)}K`
                      : impact.certifiedUsers.toLocaleString(),
                    label: "Certified",
                    sub: "users/year",
                    icon: Award,
                  },
                ].map(({ value, label, sub, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-center"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-foreground">{value}</div>
                    <div className="text-[10px] font-semibold text-foreground">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 flex items-start gap-3">
                <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">The green multiplier:</strong>{" "}
                  Awareness precedes action. Every climate lesson delivered is a
                  potential behavior shift — diet, vote, purchase, advocacy. At
                  scale, this is the missing link between knowing and acting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIMATE CHALLENGE SPOTLIGHT ──────────────────────────────────── */}
      <section className="border-b border-border bg-gradient-to-br from-emerald-950/5 via-background to-green-900/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Left */}
            <div className="flex-1 max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-5">
                <Thermometer className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Climate Challenge
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Knowledge that actually
                <span className="text-primary"> changes things</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Each GET challenge is backed by a full article — sourced from
                IPCC reports, constitutional law, cybersecurity research, and
                civic records. Not trivia. Verified awareness that shapes how
                people vote, spend, protect themselves, and act. Three domains,
                one platform.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "🌱 Why 1.5°C is catastrophically different from 2°C",
                  "⚖️ What the Kenya Data Protection Act actually gives you",
                  "🗳️ Why Kenya's 2027 election threshold matters to you",
                  "🔐 How phishing bypasses even security-conscious users",
                  "🌌 What dark matter actually is — and why it matters",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setChallengeContext("social-login");
                    setChallengeOpen(true);
                  }}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Take a Challenge
                </Button>
                <Link
                  href="/learn"
                  className={buttonVariants({ variant: "outline" }) + " gap-2"}
                >
                  Browse all topics <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: sample challenge cards */}
            <div className="flex-1 max-w-md space-y-3">
              {[
                {
                  q: "The permafrost feedback loop is dangerous because:",
                  preview: "Thawing releases methane stored for thousands of years — a self-reinforcing climate spiral.",
                  cat: "🌱 Climate",
                  miss: 79,
                  href: "/learn/m16",
                },
                {
                  q: "Under Kenya's Data Protection Act, you have the right to:",
                  preview: "Access, correct, and delete your personal data — rights that apply every time you click 'I Agree'.",
                  cat: "⚖️ Law & Rights",
                  miss: 68,
                  href: "/learn/m3",
                },
                {
                  q: "In Kenya's 2027 election, what threshold must a presidential candidate meet?",
                  preview: "50%+1 of all valid votes cast — understanding this is the difference between an informed vote and a wasted one.",
                  cat: "🗳️ Civic",
                  miss: 74,
                  href: "/learn/m13",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card px-5 py-4 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all group"
                  onClick={() => {
                    setChallengeContext("social-login");
                    setChallengeOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-primary/8 text-primary border-primary/20"
                    >
                      {card.cat}
                    </Badge>
                    <span className="text-[10px] text-destructive font-medium">
                      {card.miss}% miss this
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1.5">{card.q}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {card.preview}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      Answer this <ArrowRight className="h-3 w-3" />
                    </span>
                    <Link
                      href={card.href}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THIS WEEK'S AWARENESS ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              What You Should Know Right Now
            </span>
            <Badge variant="secondary" className="text-xs ml-1">
              Live Updates
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {periodInsights.map((insight) => (
              <div
                key={insight.id}
                className="rounded-xl border border-border bg-card px-5 py-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-xs bg-primary/8 text-primary border-primary/20"
                  >
                    {insight.period}
                  </Badge>
                  <span className="text-xs text-muted-foreground capitalize">
                    {insight.category}
                  </span>
                </div>
                <p className="font-semibold text-sm text-foreground leading-snug">
                  {insight.headline}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {insight.body}
                </p>
                <Link
                  href="/learn"
                  className="mt-auto text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  Learn more <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULATED INTEGRATIONS ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Live Simulations
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            GET works everywhere humans verify
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Click any action below to experience GET Challenge in context.
            Notice the compliance certificate generated on a correct answer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SimCard
            id="section-social"
            icon={Globe}
            title="Social Login"
            description="OAuth flows, social sign-in, identity verification"
            completed={completedSections.has("social-login")}
          >
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                Sign in to continue — one quick awareness check.
              </p>
              <Button
                id="btn-social-login"
                variant="outline"
                size="sm"
                className="w-full gap-2 justify-start"
                onClick={() => openChallenge("social-login")}
              >
                <Chrome className="h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 justify-start"
                onClick={() => openChallenge("social-login")}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>
          </SimCard>

          <SimCard
            id="section-banking"
            icon={CreditCard}
            title="Banking Action"
            description="Payment confirmation, fraud prevention, transaction auth"
            completed={completedSections.has("banking")}
          >
            <div className="rounded-lg border border-border bg-muted/40 p-3 mb-3">
              <div className="text-xs text-muted-foreground">Transfer to</div>
              <div className="font-semibold text-sm">James K. ••• 4521</div>
              <div className="text-xs text-muted-foreground mt-1">Amount</div>
              <div className="text-lg font-bold text-primary">KES 15,000</div>
            </div>
            <Button
              id="btn-banking"
              size="sm"
              className="w-full gap-2"
              onClick={() => openChallenge("banking")}
            >
              <Lock className="h-3.5 w-3.5" />
              Confirm Transfer
            </Button>
          </SimCard>

          <SimCard
            id="section-hospital"
            icon={Hospital}
            title="Hospital / EMR"
            description="Clinical access, patient data handling, staff authentication"
            completed={completedSections.has("hospital")}
          >
            <div className="rounded-lg border border-border bg-muted/40 p-3 mb-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Patient Record
              </div>
              <div className="font-semibold text-sm mt-1">Sarah M. — Room 3B</div>
              <div className="text-xs text-muted-foreground">Restricted access</div>
            </div>
            <Button
              id="btn-hospital"
              size="sm"
              className="w-full gap-2"
              variant="secondary"
              onClick={() => openChallenge("hospital")}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Access Patient Record
            </Button>
          </SimCard>
        </div>
      </section>

      {/* ── EXPLORE WHAT GET CAN TEACH ────────────────────────────────────── */}
      <section className="border-y border-border bg-gradient-to-br from-secondary/20 to-accent/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-4">
              Knowledge Domains
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Explore what GET can teach
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              From climate science to civic rights — GET&apos;s challenge engine
              spans every domain where human awareness creates real-world impact.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {Object.entries(insightsData.categoryMeta).map(([key, meta]) => {
              const Icon = categoryIcons[meta.icon] ?? Leaf;
              return (
                <Link href="/learn" key={key}>
                  <div className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground leading-tight hidden md:block">
                      {meta.stat}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRENDING TOPICS ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                Trending Knowledge
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Topics gaining relevance right now — GET surfaces them first.
            </p>
          </div>
          <Link
            href="/learn"
            className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5"}
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {trending.map((topic) => (
            <div
              key={topic.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-foreground leading-snug">
                    {topic.title}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      topic.urgency === "high"
                        ? "shrink-0 text-xs bg-destructive/8 text-destructive border-destructive/20"
                        : "shrink-0 text-xs text-muted-foreground"
                    }
                  >
                    {topic.urgency === "high" ? "High relevance" : "Watch"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {topic.summary}
                </p>
                <span className="mt-2 inline-block text-xs font-medium text-primary capitalize">
                  {topic.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT SECTION ────────────────────────────────────────────────── */}
      <section
        id="section-impact"
        className="border-y border-border bg-gradient-to-br from-secondary/20 to-accent/10"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                The Opportunity
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Infrastructure for
                <br />
                <span className="text-primary">collective knowledge</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every crisis — climate, civic, cyber, legal — is an awareness
                problem first. GET sits at the exact intersection where attention
                is already given, and redirects it toward understanding. Not a
                learning app you have to visit. Infrastructure embedded into
                every interaction that already happens.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Climate is our most urgent domain — and our anchor story.
                But the same mechanism that teaches about tipping points teaches
                electoral rights, data privacy, and the laws that protect you.
                One platform. Every gap.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/dashboard" className={buttonVariants() + " gap-2"}>
                  View Dashboard
                  <TrendingUp className="h-4 w-4" />
                </Link>
                <Link href="/learn" className={buttonVariants({ variant: "outline" }) + " gap-2"}>
                  <BookOpen className="h-4 w-4" />
                  Knowledge Hub
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  metric: "2.8B",
                  label: "Daily CAPTCHA impressions",
                  sub: "Wasted on friction today",
                },
                {
                  icon: Zap,
                  metric: "< 12s",
                  label: "Average GET challenge",
                  sub: "No added friction",
                },
                {
                  icon: TrendingUp,
                  metric: "84%",
                  label: "Correct answer rate",
                  sub: "Learning is happening",
                },
                {
                  icon: Cpu,
                  metric: "10 domains",
                  label: "Knowledge categories",
                  sub: "Climate at the centre",
                },
              ].map(({ icon: Icon, metric, label, sub }) => (
                <Card key={label} className="border-border">
                  <CardContent className="p-4">
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {metric}
                    </div>
                    <div className="text-xs font-medium text-foreground mt-0.5">
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING IN YOUR WORLD ────────────────────────────────────────── */}
      <TrendingFeed />

      {/* ── FOR SCHOOLS & INSTITUTIONS ───────────────────────────────────── */}
      <section className="border-y border-border bg-gradient-to-br from-amber-50/60 via-background to-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-1.5 mb-4">
                <GraduationCap className="h-3.5 w-3.5 text-amber-700" />
                <span className="text-xs font-semibold text-amber-800 tracking-wide uppercase">
                  For Schools &amp; Institutions
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                Knowledge embedded in every
                <br />
                <span className="text-primary">student interaction</span>
              </h2>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Schools, universities, and training programmes use GET to embed
                curriculum-aligned awareness challenges — including deep climate
                science — directly into digital workflows.
              </p>
            </div>
            <a
              href="mailto:schools@get.earth?subject=GET for Schools — Demo Request"
              className={
                buttonVariants({ size: "lg" }) +
                " gap-2 shrink-0 bg-amber-600 hover:bg-amber-700 text-white"
              }
            >
              <Mail className="h-4 w-4" />
              Request a Demo
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                icon: Thermometer,
                module: "Climate Crisis",
                id: "m16",
                tag: "Geography · Science",
                desc: "1.5°C, Africa's emissions paradox, tipping points, Congo Basin, and Kenya's renewable energy story.",
                color: "from-green-50 to-emerald-50 border-green-200",
                iconBg: "bg-green-100",
                iconColor: "text-green-700",
              },
              {
                icon: Telescope,
                module: "Space & Science",
                id: "m8",
                tag: "STEM",
                desc: "Black holes, exoplanets, dark matter, and orbital mechanics — tied to real challenge questions.",
                color: "from-violet-50 to-indigo-50 border-violet-200",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-700",
              },
              {
                icon: Vote,
                module: "Civic & Democracy",
                id: "m13",
                tag: "Social Studies · Civic",
                desc: "Electoral systems, constitutional rights, Kenya 2027, and why democracy requires informed voters.",
                color: "from-blue-50 to-sky-50 border-blue-200",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-700",
              },
              {
                icon: Brain,
                module: "Mind & Critical Thinking",
                id: "m11",
                tag: "PSHE · Wellbeing",
                desc: "Stress physiology, sleep science, media literacy and mental health — evidence-based content.",
                color: "from-rose-50 to-pink-50 border-rose-200",
                iconBg: "bg-rose-100",
                iconColor: "text-rose-700",
              },
            ].map(({ icon: Icon, module, id, tag, desc, color, iconBg, iconColor }) => (
              <Link key={id} href={`/learn/${id}`}>
                <div
                  className={`group flex flex-col h-full rounded-2xl border bg-gradient-to-br p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${color}`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {tag}
                  </div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">
                    {module}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                    {desc}
                  </p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    View article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "4", label: "Curriculum-aligned modules", icon: BookOpenCheck },
              { value: "20+", label: "Challenge questions across modules", icon: Sparkles },
              { value: "10", label: "Knowledge domains covered", icon: Globe },
              { value: "Free", label: "Access for educators", icon: School },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-amber-200/60 bg-white/60 px-5 py-4 text-center">
                <Icon className="h-4 w-4 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-200/60 bg-white/50 px-8 py-7 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <GraduationCap className="h-6 w-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground leading-relaxed italic mb-2">
                &ldquo;GET reframes how students interact with digital systems. The Climate Crisis
                and Civic modules alone cover significant KCSE Geography and Social Studies content
                in a format students actually engage with. Every login becomes a lesson.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                — Secondary School Head of Science · GET Pilot Programme Participant
              </p>
            </div>
            <a
              href="mailto:schools@get.earth?subject=GET for Schools — Demo Request"
              className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5 shrink-0 border-amber-300 hover:bg-amber-50"}
            >
              <Mail className="h-3.5 w-3.5" />
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* ── MICRO-INSIGHT STRIP ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-primary/5 py-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Quick insight: </span>
              <RandomInsight category="environment" />
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-emerald-900/5" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/15 mx-auto mb-6">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Every verification.
            <br />
            <span className="text-primary">A better-informed world.</span>
          </h2>
          <p className="text-muted-foreground mb-2 max-w-lg mx-auto leading-relaxed">
            Every login. Every payment. Every portal access. A verified awareness
            moment — climate, civic, legal, or cyber. A world that knows more,
            acts more, changes more.
          </p>
          <p className="text-xs text-muted-foreground mb-8 max-w-sm mx-auto">
            Starting with the most urgent problem: the planet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={startTour} className="gap-2">
              <Play className="h-4 w-4" />
              Start Experience
            </Button>
            <Link
              href="/learn"
              className={buttonVariants({ size: "lg", variant: "outline" }) + " gap-2"}
            >
              <BookOpen className="h-4 w-4" />
              Knowledge Hub
            </Link>
            <Link
              href="/embed"
              className={buttonVariants({ size: "lg", variant: "outline" }) + " gap-2"}
            >
              Embed GET <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <GetChallenge
        open={challengeOpen}
        onClose={() => setChallengeOpen(false)}
        context={challengeContext}
        onSuccess={handleSuccess}
      />
    </main>
  );
}

// ── Trending Feed ──────────────────────────────────────────────────────────────

const regionTabs = [
  { key: "kenya", label: "Kenya", flag: "🇰🇪" },
  { key: "global", label: "Global", flag: "🌍" },
  { key: "ai", label: "AI Trends", flag: "🤖" },
  { key: "climate", label: "Climate", flag: "🌱" },
];

const categoryColors: Record<string, string> = {
  civic: "bg-blue-100 text-blue-800",
  environment: "bg-green-100 text-green-800",
  law: "bg-violet-100 text-violet-800",
  ai: "bg-orange-100 text-orange-800",
  cyber: "bg-red-100 text-red-800",
  space: "bg-indigo-100 text-indigo-800",
  strategy: "bg-amber-100 text-amber-800",
};

const urgencyDot: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-amber-500",
  low: "bg-primary",
};

function TrendingFeed() {
  const [activeRegion, setActiveRegion] = useState("kenya");
  const trends = insightsData.countryTrends.filter(
    (t) => t.region === activeRegion
  );

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Radio className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                Trending in Your World
              </h2>
              <Badge variant="secondary" className="text-xs gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Live Feed
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Local, regional, and global topics shaping what people need to
              know right now.
            </p>
          </div>
          <Link
            href="/learn"
            className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-1.5 shrink-0"}
          >
            Explore Knowledge Hub <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {regionTabs.map(({ key, label, flag }) => (
            <button
              key={key}
              onClick={() => setActiveRegion(key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
                activeRegion === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{flag}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => (
            <Link
              key={trend.id}
              href={trend.moduleId ? `/learn/${trend.moduleId}` : "/learn"}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
                    categoryColors[trend.category] ?? "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {trend.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${urgencyDot[trend.urgency]}`}
                  />
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {trend.tag}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">
                {trend.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                {trend.summary}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-[10px] text-muted-foreground">
                  {trend.flag} {trend.country} · {trend.date}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                  Learn <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SimCard ────────────────────────────────────────────────────────────────────

function SimCard({
  id,
  icon: Icon,
  title,
  description,
  children,
  completed,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  completed: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card
      id={id}
      className={`relative border transition-all ${
        completed ? "border-primary/40 bg-primary/5" : "border-border"
      }`}
    >
      {completed && (
        <div className="absolute right-3 top-3">
          <Badge className="text-xs bg-primary/15 text-primary border-primary/20">
            ✓ Completed
          </Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
