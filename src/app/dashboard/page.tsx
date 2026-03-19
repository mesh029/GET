"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  ShieldCheck,
  Leaf,
  CreditCard,
  Hospital,
  Globe,
  Award,
  Flame,
  Lightbulb,
  Scale,
  Telescope,
  Shirt,
  Brain,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Code2,
  Vote,
} from "lucide-react";
import Link from "next/link";
import questionsData from "@/data/questions.json";
import modulesData from "@/data/modules.json";
import insightsData from "@/data/insights.json";

// ── Computed analytics from JSON ─────────────────────────────────────────────

function computeStats() {
  const byCategory = Object.fromEntries(
    ["cyber", "environment", "law", "space", "fashion", "life-skills", "business", "civic", "ai", "strategy"].map(
      (cat) => {
        const qs = questionsData.filter((q) => q.category === cat);
        const avgMiss = qs.length
          ? qs.reduce((s, q) => s + q.missRate, 0) / qs.length
          : 0;
        return [cat, { count: qs.length, avgMiss: Math.round(avgMiss) }];
      }
    )
  );

  const topMissed = [...questionsData]
    .sort((a, b) => b.missRate - a.missRate)
    .slice(0, 5);

  const contexts = {
    "social-login": questionsData.filter((q) => q.context === "social-login").length,
    banking: questionsData.filter((q) => q.context === "banking").length,
    hospital: questionsData.filter((q) => q.context === "hospital").length,
    general: questionsData.filter((q) => q.context === "general").length,
  };

  const byDifficulty = {
    beginner: questionsData.filter((q) => q.difficulty === "beginner").length,
    intermediate: questionsData.filter((q) => q.difficulty === "intermediate").length,
    advanced: questionsData.filter((q) => q.difficulty === "advanced").length,
  };

  // Simulated
  const sim = {
    totalInteractions: 14832,
    correctRate: 84,
    avgResponseTime: 11.2,
    cyberCorrect: 81,
    envCorrect: 89,
    lawCorrect: 72,
    spaceCorrect: 76,
    fashionCorrect: 68,
    lifeSkillsCorrect: 85,
    businessCorrect: 78,
    socialCorrect: 86,
    bankingCorrect: 79,
    hospitalCorrect: 88,
    weeklyGrowth: 12,
  };

  return { byCategory, topMissed, contexts, byDifficulty, sim };
}

const catIcons: Record<string, React.ElementType> = {
  cyber: ShieldCheck,
  environment: Leaf,
  law: Scale,
  space: Telescope,
  fashion: Shirt,
  "life-skills": Brain,
  business: Briefcase,
  civic: Vote,
  ai: Code2,
  strategy: Brain,
};

const catScores: Record<string, number> = {
  cyber: 81,
  environment: 89,
  law: 72,
  space: 76,
  fashion: 68,
  "life-skills": 85,
  business: 78,
  civic: 63,
  ai: 71,
  strategy: 74,
};

const catLabels: Record<string, string> = {
  cyber: "Cybersecurity",
  environment: "Environment",
  law: "Law & Rights",
  space: "Space & Science",
  fashion: "Fashion & Culture",
  "life-skills": "Life Skills",
  business: "Business",
  civic: "Civic & Democracy",
  ai: "AI & Technology",
  strategy: "Chess & Strategy",
};

// ── Regional Knowledge Gap Data (simulated) ───────────────────────────────────
const regionalData: Record<
  string,
  { label: string; flag: string; domains: { name: string; score: number; gap: boolean }[] }
> = {
  nairobi: {
    label: "Nairobi",
    flag: "🏙️",
    domains: [
      { name: "Cybersecurity", score: 77, gap: false },
      { name: "Law & Rights", score: 59, gap: true },
      { name: "Civic & Democracy", score: 54, gap: true },
      { name: "Environment", score: 82, gap: false },
      { name: "AI & Technology", score: 74, gap: false },
      { name: "Business", score: 71, gap: false },
    ],
  },
  mombasa: {
    label: "Mombasa",
    flag: "🌊",
    domains: [
      { name: "Cybersecurity", score: 71, gap: false },
      { name: "Law & Rights", score: 62, gap: true },
      { name: "Civic & Democracy", score: 58, gap: true },
      { name: "Environment", score: 91, gap: false },
      { name: "AI & Technology", score: 63, gap: true },
      { name: "Business", score: 68, gap: false },
    ],
  },
  kisumu: {
    label: "Kisumu",
    flag: "🌿",
    domains: [
      { name: "Cybersecurity", score: 68, gap: true },
      { name: "Law & Rights", score: 55, gap: true },
      { name: "Civic & Democracy", score: 67, gap: false },
      { name: "Environment", score: 88, gap: false },
      { name: "AI & Technology", score: 57, gap: true },
      { name: "Business", score: 73, gap: false },
    ],
  },
  national: {
    label: "National Average",
    flag: "🇰🇪",
    domains: [
      { name: "Cybersecurity", score: 81, gap: false },
      { name: "Law & Rights", score: 72, gap: false },
      { name: "Civic & Democracy", score: 63, gap: true },
      { name: "Environment", score: 89, gap: false },
      { name: "AI & Technology", score: 71, gap: false },
      { name: "Business", score: 78, gap: false },
    ],
  },
};

export default function DashboardPage() {
  const { topMissed, byCategory, sim } = computeStats();
  const [selectedRegion, setSelectedRegion] = useState<string>("national");

  const sortedCategories = Object.entries(byCategory).sort(
    ([a], [b]) => (catScores[b] ?? 0) - (catScores[a] ?? 0)
  );

  const weeklyInsight = insightsData.periodInsights[0];
  const trendingTopics = insightsData.trendingTopics.slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-4">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            Impact Dashboard
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Measurable behavior change
        </h1>
        <p className="text-muted-foreground max-w-xl">
          GET tracks every challenge, every answer, every learning moment —
          building a real-time picture of collective awareness.
        </p>
      </div>

      {/* ── Top-level KPIs ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        <StatCard
          icon={Users}
          label="Total Interactions"
          value={sim.totalInteractions.toLocaleString()}
          sub={`+${sim.weeklyGrowth}% this week`}
          highlight
        />
        <StatCard
          icon={Zap}
          label="Correct Answer Rate"
          value={`${sim.correctRate}%`}
          sub="Awareness benchmark"
          highlight
        />
        <StatCard
          icon={BookOpen}
          label="Knowledge Questions"
          value={questionsData.length.toString()}
          sub={`${modulesData.length} modules · 7 domains`}
        />
        <StatCard
          icon={Award}
          label="Avg Response Time"
          value={`${sim.avgResponseTime}s`}
          sub="Below 12s target"
        />
      </div>

      {/* ── Period Insight Banner ──────────────────────────────── */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 px-4 sm:px-6 py-4 flex items-start gap-3 sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className="text-xs bg-primary/8 text-primary border-primary/20"
            >
              {weeklyInsight.period}
            </Badge>
            <span className="text-xs text-muted-foreground capitalize">
              {weeklyInsight.category}
            </span>
          </div>
          <p className="font-semibold text-sm text-foreground">
            {weeklyInsight.headline}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {weeklyInsight.body}
          </p>
        </div>
        <Link
          href="/learn"
          className="shrink-0 text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          Explore <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* ── Top Learning Areas ──────────────────────────────── */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Top Learning Areas</h2>
              <Badge variant="secondary" className="text-xs">
                All domains
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-3">
            {sortedCategories.map(([cat, data]) => {
              const Icon = catIcons[cat] ?? BookOpen;
              const score = catScores[cat] ?? 75;
              const label = catLabels[cat] ?? cat;
              const isWeakest = score < 75;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        {data.count}Q
                      </span>
                      {isWeakest && (
                        <Badge
                          variant="outline"
                          className="text-[10px] text-destructive border-destructive/30 bg-destructive/8"
                        >
                          Low awareness
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        score >= 85
                          ? "text-primary"
                          : score >= 75
                          ? "text-foreground"
                          : "text-destructive"
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                  <Progress value={score} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* ── Trending Knowledge ─────────────────────────────── */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm">Trending Knowledge</h2>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-4">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    {topic.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {topic.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {topic.category}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        topic.urgency === "high"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      · {topic.urgency === "high" ? "High relevance" : "Watch"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Most Missed Questions ──────────────────────────── */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h2 className="font-semibold text-sm">Most Missed Questions</h2>
              </div>
              <Badge
                variant="outline"
                className="text-xs text-destructive border-destructive/30 bg-destructive/8"
              >
                Biggest knowledge gaps
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-3">
            {topMissed.map((q, i) => (
              <div
                key={q.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/30 transition-colors"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-xs font-bold text-destructive">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground line-clamp-1">
                    {q.question}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {q.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {q.difficulty}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-destructive"
                          style={{ width: `${q.missRate}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-destructive">
                        {q.missRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Integration Context ────────────────────────────── */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <h2 className="font-semibold text-sm">Integration Context</h2>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-4">
            {[
              {
                label: "Social Login",
                icon: Globe,
                score: sim.socialCorrect,
                interactions: 6210,
              },
              {
                label: "Banking",
                icon: CreditCard,
                score: sim.bankingCorrect,
                interactions: 4890,
              },
              {
                label: "Hospital / EMR",
                icon: Hospital,
                score: sim.hospitalCorrect,
                interactions: 3732,
              },
            ].map((ctx) => (
              <div
                key={ctx.label}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <ctx.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{ctx.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {ctx.interactions.toLocaleString()} interactions
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-sm font-bold ${
                      ctx.score >= 85
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {ctx.score}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Knowledge Gap Index ────────────────────────────── */}
        <Card className="border-border lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-sm">Knowledge Gap Index</h2>
                <Badge
                  variant="outline"
                  className="text-xs bg-primary/8 text-primary border-primary/20"
                >
                  Live · Kenya
                </Badge>
              </div>
              <Tabs
                value={selectedRegion}
                onValueChange={setSelectedRegion}
              >
                <div className="overflow-x-auto -mx-1 px-1">
                  <TabsList className="h-7 w-max">
                    {Object.entries(regionalData).map(([key, r]) => (
                      <TabsTrigger key={key} value={key} className="text-[11px] px-2.5 h-6 whitespace-nowrap">
                        {r.flag} {r.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {(regionalData[selectedRegion]?.domains ?? []).map((d) => (
                <div
                  key={d.name}
                  className={`rounded-lg border p-3 ${
                    d.gap
                      ? "border-destructive/20 bg-destructive/5"
                      : "border-border bg-muted/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold">{d.name}</span>
                    {d.gap && (
                      <Badge
                        variant="outline"
                        className="text-[9px] text-destructive border-destructive/30 bg-destructive/8"
                      >
                        Gap detected
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={d.score}
                      className={`h-1.5 flex-1 ${d.gap ? "[&>div]:bg-destructive" : ""}`}
                    />
                    <span
                      className={`text-xs font-bold w-8 text-right ${
                        d.gap ? "text-destructive" : "text-primary"
                      }`}
                    >
                      {d.score}%
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    {d.gap
                      ? `Critical gap — ${100 - d.score}% of users lack awareness in this domain`
                      : `Above benchmark — ${d.score}% awareness rate`}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What this data means:</strong>{" "}
                GET aggregates anonymous awareness signals from every challenge interaction
                to build a real-time picture of knowledge gaps by region and domain.
                This is the data product — sold to governments, NGOs, and researchers to
                target civic education where it is most needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Climate Impact Tracker ─────────────────────────── */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/8 via-primary/5 to-emerald-900/5 lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-sm">Climate Impact Tracker</h2>
                <Badge className="text-[10px] bg-primary/15 text-primary border-primary/20">
                  Green Technology Core
                </Badge>
              </div>
              <Link
                href="/learn/m16"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                Climate module <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="grid gap-4 md:grid-cols-4 mb-4">
              {[
                {
                  value: "12,459",
                  label: "Climate awareness moments",
                  sub: "Delivered this month",
                  icon: Leaf,
                },
                {
                  value: "81%",
                  label: "Climate question pass rate",
                  sub: "Above global average",
                  icon: TrendingUp,
                },
                {
                  value: "6",
                  label: "Climate certificates issued",
                  sub: "Per 100 verifications",
                  icon: Award,
                },
                {
                  value: "#1",
                  label: "Most challenged domain",
                  sub: "Environment leads all categories",
                  icon: Globe,
                },
              ].map(({ value, label, sub, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-primary/15 bg-background/60 px-4 py-3">
                  <Icon className="h-4 w-4 text-primary mb-1.5" />
                  <div className="text-xl font-bold text-primary">{value}</div>
                  <div className="text-xs font-medium text-foreground">{label}</div>
                  <div className="text-[10px] text-muted-foreground">{sub}</div>
                </div>
              ))}
            </div>

            {/* Climate knowledge gaps */}
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <p className="text-xs font-semibold mb-3 flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                Climate topic breakdown — awareness scores
              </p>
              <div className="space-y-2.5">
                {[
                  { topic: "1.5°C threshold and Paris Agreement", score: 71, urgent: false },
                  { topic: "Africa's emissions vs. climate impact paradox", score: 44, urgent: true },
                  { topic: "Permafrost feedback loops", score: 28, urgent: true },
                  { topic: "Kenya's 90% renewable electricity", score: 34, urgent: true },
                  { topic: "Congo Basin as global carbon sink", score: 37, urgent: true },
                  { topic: "Loss and Damage fund (COP27)", score: 25, urgent: true },
                ].map(({ topic, score, urgent }) => (
                  <div key={topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground truncate mr-4 max-w-xs">{topic}</span>
                      <span className={`text-xs font-bold shrink-0 ${urgent ? "text-destructive" : "text-primary"}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${urgent ? "bg-destructive/70" : "bg-primary"}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                <strong className="text-foreground">Critical gap:</strong> Loss and Damage, permafrost, and Congo Basin score below 40% — 
                these are GET&apos;s highest-value climate topics. Where awareness is lowest, impact is greatest.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Impact Summary ─────────────────────────────────── */}
        <Card className="border-primary/20 bg-primary/5 lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm">Impact Summary</h2>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  metric: `${Math.round(sim.totalInteractions * (sim.correctRate / 100)).toLocaleString()}`,
                  label: "Correct responses",
                  sub: "Verified aware users",
                },
                {
                  metric: `${Math.round(sim.totalInteractions * ((100 - sim.correctRate) / 100)).toLocaleString()}`,
                  label: "Learning interventions",
                  sub: "Wrong answers = insight",
                },
                {
                  metric: `${Math.round(sim.totalInteractions * 0.23).toLocaleString()}`,
                  label: "Repeat engagements",
                  sub: "Users returning to learn",
                },
                {
                  metric: "10",
                  label: "Knowledge domains",
                  sub: `${questionsData.length} questions · ${modulesData.length} modules`,
                },
              ].map(({ metric, label, sub }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-primary">{metric}</div>
                  <div className="text-xs font-medium text-foreground mt-0.5">
                    {label}
                  </div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Key insight:</strong> Fashion
              and Law score lowest — these are GET&apos;s highest-value
              categories because they represent the widest knowledge gap in
              everyday life. Wrong answers don&apos;t mean failure; they mark
              the exact opportunity where GET creates maximum impact.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// ── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={`border ${
        highlight ? "border-primary/20 bg-primary/5" : "border-border"
      }`}
    >
      <CardContent className="p-4">
        <Icon
          className={`h-4 w-4 mb-2 ${
            highlight ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <div
          className={`text-2xl font-bold ${
            highlight ? "text-primary" : "text-foreground"
          }`}
        >
          {value}
        </div>
        <div className="text-xs font-medium text-foreground mt-0.5">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}
