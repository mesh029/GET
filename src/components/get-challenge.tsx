"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Award,
  Download,
  ChevronLeft,
  Clock,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import questionsData from "@/data/questions.json";
import modulesData from "@/data/modules.json";
import insightsData from "@/data/insights.json";

type Question = (typeof questionsData)[0];
type Context = "social-login" | "banking" | "hospital" | "general";

interface GetChallengeProps {
  open: boolean;
  onClose: () => void;
  context?: Context;
  questionId?: string;
  onSuccess?: () => void;
}

interface Certificate {
  id: string;
  topic: string;
  domain: string;
  context: string;
  timestamp: string;
  score: string;
  moduleTitle: string;
}

const categoryColors: Record<string, string> = {
  cyber: "bg-primary/10 text-primary border-primary/20",
  environment: "bg-accent text-accent-foreground border-accent",
  law: "bg-secondary text-secondary-foreground border-secondary",
  space: "bg-primary/10 text-primary border-primary/20",
  fashion: "bg-accent text-accent-foreground border-accent",
  "life-skills": "bg-secondary text-secondary-foreground border-secondary",
  business: "bg-primary/10 text-primary border-primary/20",
  civic: "bg-primary/10 text-primary border-primary/20",
  ai: "bg-accent text-accent-foreground border-accent",
  strategy: "bg-secondary text-secondary-foreground border-secondary",
};

const contextLabels: Record<Context, string> = {
  "social-login": "Social Login",
  banking: "Banking & Finance",
  hospital: "Healthcare / EMR",
  general: "General Awareness",
};

const domainLabels: Record<string, string> = {
  cyber: "Cybersecurity",
  environment: "Environment",
  law: "Law & Rights",
  space: "Space & Science",
  fashion: "Fashion & Culture",
  "life-skills": "Life Skills",
  business: "Business",
  civic: "Civic & Democracy",
  ai: "AI & Technology",
  strategy: "Strategy & Chess",
};

function pickQuestion(context: Context, questionId?: string): Question {
  if (questionId) {
    const found = questionsData.find((q) => q.id === questionId);
    if (found) return found;
  }
  const filtered = questionsData.filter((q) => q.context === context);
  const pool = filtered.length > 0 ? filtered : questionsData;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getRelatedModule(question: Question) {
  return modulesData.find((m) => m.id === question.relatedModuleId) ?? null;
}

function getRandomInsight(category: string) {
  const relevant = insightsData.microInsights.filter(
    (i) => i.category === category
  );
  const pool = relevant.length > 0 ? relevant : insightsData.microInsights;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateCertId(questionId: string): string {
  const chars = "abcdef0123456789";
  const suffix = Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `cert_${questionId.replace("q", "")}${suffix}`;
}

export function GetChallenge({
  open,
  onClose,
  context = "general",
  questionId,
  onSuccess,
}: GetChallengeProps) {
  const question = useMemo(
    () => pickQuestion(context, questionId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );
  const relatedModule = useMemo(() => getRelatedModule(question), [question]);
  const insight = useMemo(
    () => getRandomInsight(question.category),
    [question]
  );
  const certId = useMemo(
    () => generateCertId(question.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showCert, setShowCert] = useState(false);

  const isCorrect = selected === question.correct;

  const certificate: Certificate = {
    id: certId,
    topic: question.question.slice(0, 52) + (question.question.length > 52 ? "…" : ""),
    domain: domainLabels[question.category] ?? question.category,
    context: contextLabels[context],
    timestamp: new Date().toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    score: "100% — Awareness Verified",
    moduleTitle: relatedModule?.title ?? "GET Knowledge Hub",
  };

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correct && onSuccess) {
      setTimeout(onSuccess, 2000);
    }
  }

  function handleClose() {
    setSelected(null);
    setAnswered(false);
    setShowCert(false);
    onClose();
  }

  function handlePrint() {
    window.print();
  }

  const catColor = categoryColors[question.category] ?? categoryColors.cyber;
  const difficultyLabel =
    question.difficulty === "beginner"
      ? "Beginner"
      : question.difficulty === "intermediate"
      ? "Intermediate"
      : "Advanced";

  // ── Certificate View ──────────────────────────────────────────────────────
  if (showCert) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)] gap-0 p-0 overflow-hidden">
          {/* Cert header */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20 px-4 sm:px-6 py-4 sm:py-5">
            <button
              onClick={() => setShowCert(false)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back to challenge
            </button>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    GET Certificate
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground">
                  {certificate.id}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Cert body */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4">
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-bold">Awareness Verified</h2>
              <p className="text-xs text-muted-foreground mt-1">
                This certificate confirms a verified learning moment
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              {[
                { icon: Hash, label: "Certificate ID", value: certificate.id },
                { icon: Lightbulb, label: "Topic", value: certificate.topic },
                { icon: ShieldCheck, label: "Knowledge Domain", value: certificate.domain },
                { icon: Clock, label: "Interaction Context", value: certificate.context },
                { icon: Award, label: "Awareness Score", value: certificate.score },
                { icon: Clock, label: "Issued", value: certificate.timestamp },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-xs font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What this means:</strong>{" "}
                This certificate is a tamper-evident, timestamped proof that
                a human demonstrated awareness of a knowledge domain at the
                point of interaction. It can be used for compliance reporting,
                audit trails, and measuring organizational knowledge health.
              </p>
            </div>
          </div>

          {/* Cert footer */}
          <div className="border-t border-border px-4 sm:px-6 py-3 flex items-center justify-between bg-muted/20 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Leaf className="h-3 w-3 text-primary" />
              <span>Powered by GET</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-1.5" onClick={handlePrint}>
                <Download className="h-3.5 w-3.5" />
                Save
              </Button>
              <Button size="sm" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ── Challenge View ─────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg w-[calc(100vw-2rem)] gap-0 p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                GET Challenge
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className={cn("text-xs capitalize", catColor)}>
                {question.category}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                {difficultyLabel}
              </Badge>
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-foreground leading-snug">
              {question.question}
            </DialogTitle>
          </DialogHeader>

          {question.missRate > 60 && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary/60" />
              <span>
                <span className="text-primary/80 font-medium">{question.missRate}%</span>{" "}
                of users get this wrong — stay sharp
              </span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="px-6 py-4 space-y-2">
          {question.options.map((option, i) => {
            const isSelected = selected === i;
            const isCorrectOption = i === question.correct;
            let cls =
              "w-full text-left rounded-lg border px-4 py-3 text-sm font-medium transition-all";

            if (!answered) {
              cls +=
                " border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
            } else if (isCorrectOption) {
              cls += " border-primary bg-primary/10 text-primary";
            } else if (isSelected && !isCorrect) {
              cls += " border-destructive bg-destructive/10 text-destructive";
            } else {
              cls += " border-border opacity-40";
            }

            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs mt-0.5">
                    {answered && isCorrectOption ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : answered && isSelected && !isCorrect ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <span>{String.fromCharCode(65 + i)}</span>
                    )}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={cn(
              "mx-6 rounded-lg p-4 text-sm",
              isCorrect
                ? "bg-primary/8 border border-primary/20"
                : "bg-destructive/8 border border-destructive/20"
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
              <span className="font-semibold">
                {isCorrect ? "Correct — well done" : "Not quite"}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Certificate prompt — only on correct */}
        {answered && isCorrect && (
          <div className="mx-6 mt-3 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/8 px-4 py-2.5">
            <Award className="h-4 w-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">
                Compliance certificate generated
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                {certId}
              </p>
            </div>
            <button
              onClick={() => setShowCert(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              View <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Smart suggestions after answer */}
        {answered && relatedModule && (
          <>
            <Separator className="mx-6 mt-3" />
            <div className="px-6 py-3 bg-secondary/30">
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <ArrowRight className="h-3 w-3 text-primary" />
                You might want to learn this next
              </p>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {relatedModule.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {relatedModule.description}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs capitalize">
                  {relatedModule.questionIds.length}Q
                </Badge>
              </div>
            </div>
          </>
        )}

        {/* Micro-insight */}
        {answered && (
          <div className="mx-6 mb-4 flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
            <span>{insight.text}</span>
          </div>
        )}

        {/* Tags */}
        {answered && question.tags && (
          <div className="px-6 pb-2 flex flex-wrap gap-1">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border px-4 sm:px-6 py-3 flex items-center justify-between bg-muted/20 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Leaf className="h-3 w-3 text-primary" />
            <span>Powered by GET</span>
          </div>
          {answered && (
            <Button size="sm" onClick={handleClose}>
              {isCorrect ? "Access Granted" : "Continue"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
