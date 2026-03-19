"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetChallenge } from "@/components/get-challenge";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  GraduationCap,
  Lightbulb,
  AlertTriangle,
  Info,
  Zap,
  ChevronRight,
} from "lucide-react";
import modulesData from "@/data/modules.json";
import articlesData from "@/data/articles.json";
import questionsData from "@/data/questions.json";
import { cn } from "@/lib/utils";

type SectionType =
  | { type: "h2"; text: string }
  | { type: "p"; content: string }
  | { type: "callout"; variant: "warning" | "info" | "tip" | "danger"; title: string; content: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "quote"; text: string; source: string }
  | { type: "stat"; value: string; label: string; context: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "challenge"; questionId: string; prompt: string };

type ArticleData = {
  heroImage: string;
  heroAlt: string;
  readTime: string;
  forSchools?: boolean;
  schoolsNote?: string;
  intro: string;
  sections: SectionType[];
  keyTakeaways: string[];
  challengeQuestionIds: string[];
};

const calloutStyles = {
  warning: {
    bg: "bg-amber-50 border-amber-200",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
  },
  info: {
    bg: "bg-primary/5 border-primary/20",
    icon: Info,
    iconColor: "text-primary",
    titleColor: "text-foreground",
  },
  tip: {
    bg: "bg-secondary border-secondary",
    icon: Lightbulb,
    iconColor: "text-primary",
    titleColor: "text-foreground",
  },
  danger: {
    bg: "bg-destructive/8 border-destructive/20",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    titleColor: "text-destructive",
  },
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);

  const module = modulesData.find((m) => m.id === moduleId);
  const article = (articlesData as Record<string, ArticleData>)[moduleId];

  if (!module) return notFound();

  const [challengeOpen, setChallengeOpen] = useState(false);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [practiced, setPracticed] = useState<Set<string>>(new Set());

  function openChallenge(qId: string) {
    setActiveChallengeId(qId);
    setChallengeOpen(true);
  }

  function handleClose() {
    if (activeChallengeId) {
      setPracticed((prev) => new Set(prev).add(activeChallengeId));
    }
    setChallengeOpen(false);
    setActiveChallengeId(null);
  }

  // Peer modules in same category
  const relatedModules = modulesData
    .filter((m) => m.category === module.category && m.id !== moduleId)
    .slice(0, 2);

  const hasArticle = !!article;

  return (
    <main className="min-h-screen bg-background">
      {/* ── Breadcrumb nav ─────────────────────────────── */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/learn" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Knowledge Hub
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-40" />
          <span className="capitalize text-muted-foreground">{module.category}</span>
          <ChevronRight className="h-3.5 w-3.5 opacity-40" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{module.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10">
        {/* ── Hero image ────────────────────────────────── */}
        {hasArticle && (
          <div className="relative mb-8 overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] sm:aspect-[21/9] bg-muted">
            <Image
              src={article.heroImage}
              alt={article.heroAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Badges over hero */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <Badge className="bg-primary/90 text-primary-foreground text-xs capitalize">
                {module.category}
              </Badge>
              {article.forSchools && (
                <Badge className="bg-amber-500/90 text-white text-xs gap-1">
                  <GraduationCap className="h-3 w-3" />
                  For Schools & Institutions
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* ── Title + meta ──────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3 leading-tight">
            {module.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {hasArticle ? article.readTime : "Article coming soon"}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {module.questionIds.length} practice challenges
            </span>
            {article?.forSchools && (
              <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                <GraduationCap className="h-3.5 w-3.5" />
                Curriculum-ready
              </span>
            )}
          </div>

          {/* Schools endorsement note */}
          {article?.forSchools && article.schoolsNote && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <GraduationCap className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Endorsed for Educational Use</p>
                <p className="text-xs text-amber-700 mt-0.5">{article.schoolsNote}</p>
              </div>
              <Link
                href="mailto:schools@get.earth"
                className="ml-auto shrink-0 text-xs font-medium text-amber-700 hover:underline whitespace-nowrap"
              >
                Contact us →
              </Link>
            </div>
          )}
        </div>

        {/* ── No article yet: show module info ─────────── */}
        {!hasArticle && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-muted/30 px-6 py-8 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3 opacity-60" />
              <p className="font-semibold text-foreground mb-1">Full article coming soon</p>
              <p className="text-sm text-muted-foreground mb-4">
                This module is being enriched with in-depth written content, real-world examples, and embedded challenges.
              </p>
              <Link href="/learn" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Back to Knowledge Hub
              </Link>
            </div>

            {/* Module lessons as preview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-3">Key Insights</h2>
                <ul className="space-y-2">
                  {module.lessons.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {l}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Practice challenges */}
            <ChallengeSection
              questionIds={module.questionIds}
              practiced={practiced}
              onChallenge={openChallenge}
            />
          </div>
        )}

        {/* ── Full article ──────────────────────────────── */}
        {hasArticle && (
          <div className="space-y-0">
            {/* Intro */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-5 italic">
              {article.intro}
            </p>

            {/* Sections */}
            {article.sections.map((section, i) => (
              <ArticleSection
                key={i}
                section={section}
                practiced={practiced}
                onChallenge={openChallenge}
              />
            ))}

            <Separator className="my-10" />

            {/* Key Takeaways */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-base">Key Takeaways</h2>
              </div>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge section */}
            <ChallengeSection
              questionIds={article.challengeQuestionIds}
              practiced={practiced}
              onChallenge={openChallenge}
            />
          </div>
        )}

        {/* ── Related modules ───────────────────────────── */}
        {relatedModules.length > 0 && (
          <div className="mt-10">
            <h2 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
              Continue learning
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedModules.map((mod) => {
                const modArticle = (articlesData as Record<string, ArticleData>)[mod.id];
                return (
                  <Link key={mod.id} href={`/learn/${mod.id}`}>
                    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all">
                      {modArticle?.heroImage && (
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={modArticle.heroImage}
                            alt={mod.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {mod.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {modArticle?.readTime ?? "Coming soon"} · {mod.questionIds.length} challenges
                        </p>
                      </div>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-auto" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Challenge modal */}
      {activeChallengeId && (
        <GetChallenge
          open={challengeOpen}
          onClose={handleClose}
          questionId={activeChallengeId}
          context="general"
        />
      )}
    </main>
  );
}

// ── Article Section Renderer ─────────────────────────────────────────────────

function ArticleSection({
  section,
  practiced,
  onChallenge,
}: {
  section: SectionType;
  practiced: Set<string>;
  onChallenge: (qId: string) => void;
}) {
  if (section.type === "h2") {
    return (
      <h2 className="text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
        {section.text}
      </h2>
    );
  }

  if (section.type === "p") {
    return (
      <p className="text-base text-muted-foreground leading-relaxed mb-4">
        {section.content}
      </p>
    );
  }

  if (section.type === "callout") {
    const style = calloutStyles[section.variant];
    const Icon = style.icon;
    return (
      <div className={cn("my-6 rounded-xl border p-5", style.bg)}>
        <div className="flex items-start gap-3">
          <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", style.iconColor)} />
          <div>
            <p className={cn("font-semibold text-sm mb-1", style.titleColor)}>
              {section.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (section.type === "list") {
    return (
      <div className="my-5">
        {section.title && (
          <p className="text-sm font-semibold text-foreground mb-2">{section.title}</p>
        )}
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.type === "quote") {
    return (
      <blockquote className="my-8 border-l-4 border-primary/40 pl-6 py-1">
        <p className="text-lg italic text-foreground/80 leading-relaxed mb-2">
          &ldquo;{section.text}&rdquo;
        </p>
        <cite className="text-xs text-muted-foreground not-italic">— {section.source}</cite>
      </blockquote>
    );
  }

  if (section.type === "stat") {
    return (
      <div className="my-8 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-6 text-center">
        <div className="text-5xl font-black text-primary mb-2">{section.value}</div>
        <div className="text-base font-semibold text-foreground mb-1">{section.label}</div>
        <div className="text-xs text-muted-foreground">{section.context}</div>
      </div>
    );
  }

  if (section.type === "image") {
    return (
      <figure className="my-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
          <Image
            src={section.src}
            alt={section.alt}
            fill
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
          {section.caption}
        </figcaption>
      </figure>
    );
  }

  if (section.type === "challenge") {
    const q = questionsData.find((q) => q.id === section.questionId);
    if (!q) return null;
    const done = practiced.has(section.questionId);
    return (
      <div className="my-8 rounded-xl border border-border bg-secondary/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            {done ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <Play className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              GET Challenge — Test Your Understanding
            </p>
            <p className="text-sm text-foreground line-clamp-2">{q.question}</p>
          </div>
          <Button
            size="sm"
            variant={done ? "secondary" : "default"}
            onClick={() => onChallenge(section.questionId)}
            className="shrink-0"
          >
            {done ? "Revisit" : "Answer"}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

// ── Challenge Section ────────────────────────────────────────────────────────

function ChallengeSection({
  questionIds,
  practiced,
  onChallenge,
}: {
  questionIds: string[];
  practiced: Set<string>;
  onChallenge: (qId: string) => void;
}) {
  const questions = questionsData.filter((q) => questionIds.includes(q.id));
  const practicedCount = questionIds.filter((id) => practiced.has(id)).length;

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-base">Practice Challenges</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {practicedCount}/{questions.length} completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${questions.length ? (practicedCount / questions.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {questions.map((q) => {
          const done = practiced.has(q.id);
          return (
            <div
              key={q.id}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 transition-all",
                done ? "border-primary/20 bg-primary/5" : "border-border bg-background hover:border-primary/30"
              )}
            >
              <span className="shrink-0 mt-0.5">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm", done && "text-muted-foreground line-through")}>
                  {q.question}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px] capitalize">{q.difficulty}</Badge>
                  {q.missRate > 60 && (
                    <span className="text-[10px] text-destructive font-medium">{q.missRate}% miss rate</span>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant={done ? "secondary" : "default"}
                onClick={() => onChallenge(q.id)}
                className="shrink-0"
              >
                {done ? "Redo" : "Start"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
