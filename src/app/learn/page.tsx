"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldAlert,
  Leaf,
  Scale,
  Telescope,
  Shirt,
  Brain,
  Briefcase,
  BookOpen,
  Flame,
  TrendingUp,
  Clock,
  GraduationCap,
  ArrowRight,
  Lightbulb,
  Vote,
  Bot,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import modulesData from "@/data/modules.json";
import questionsData from "@/data/questions.json";
import articlesData from "@/data/articles.json";
import insightsData from "@/data/insights.json";
import { RandomInsight } from "@/components/random-insight";

type ArticleEntry = {
  heroImage?: string;
  readTime?: string;
  forSchools?: boolean;
};

const categories = [
  { key: "all", label: "All", icon: BookOpen },
  { key: "cyber", label: "Cyber", icon: ShieldAlert },
  { key: "environment", label: "Environment", icon: Leaf },
  { key: "law", label: "Law & Rights", icon: Scale },
  { key: "space", label: "Space", icon: Telescope },
  { key: "fashion", label: "Fashion", icon: Shirt },
  { key: "life-skills", label: "Life Skills", icon: Brain },
  { key: "business", label: "Business", icon: Briefcase },
  { key: "civic", label: "Civic & Democracy", icon: Vote },
  { key: "ai", label: "AI & Tech", icon: Bot },
  { key: "strategy", label: "Chess & Strategy", icon: Crown },
];

function getTopMissed(category?: string) {
  const pool = category && category !== "all"
    ? questionsData.filter((q) => q.category === category)
    : questionsData;
  return [...pool].sort((a, b) => b.missRate - a.missRate).slice(0, 3);
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("all");

  const trendingQuestions = useMemo(
    () => getTopMissed(activeTab),
    [activeTab]
  );

  const filteredModules = useMemo(() => {
    if (activeTab === "all") return modulesData;
    return modulesData.filter((m) => m.category === activeTab);
  }, [activeTab]);

  const totalModules = modulesData.length;
  const publishedCount = Object.keys(articlesData).length;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-4">
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            Knowledge Hub
          </span>
        </div>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Learn what matters
            </h1>
            <p className="text-muted-foreground max-w-xl">
              {totalModules} modules · 7 domains · every lesson tied to a real GET Challenge question.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 sm:px-5 py-3 shrink-0 text-center">
            <div className="text-2xl font-bold text-primary">{publishedCount}<span className="text-sm font-normal text-muted-foreground">/{totalModules}</span></div>
            <div className="text-xs text-muted-foreground">articles published</div>
          </div>
        </div>
      </div>

      {/* Micro-insight strip */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3">
        <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground capitalize">
            {activeTab === "all" ? "Quick insight" : categories.find(c => c.key === activeTab)?.label + " insight"}:{" "}
          </span>
          <RandomInsight category={activeTab === "all" ? undefined : activeTab} />
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <TabsList className="flex flex-nowrap sm:flex-wrap h-auto gap-1 bg-muted/50 p-1 w-max sm:w-full">
          {categories.map(({ key, label, icon: Icon }) => (
            <TabsTrigger
              key={key}
              value={key}
              className="gap-1.5 text-xs data-[state=active]:bg-background"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {key !== "all" && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {modulesData.filter((m) => m.category === key).length}
                </span>
              )}
            </TabsTrigger>
          ))}
          </TabsList>
        </div>

        {/* Trending questions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              Most Missed{activeTab !== "all" ? ` in ${categories.find(c => c.key === activeTab)?.label}` : ""}
            </span>
            <Badge variant="secondary" className="text-xs">Users struggle here</Badge>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {trendingQuestions.map((q) => {
              const mod = modulesData.find((m) => m.id === q.relatedModuleId);
              return (
                <Link
                  key={q.id}
                  href={mod ? `/learn/${mod.id}` : "/learn"}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-[10px] capitalize shrink-0">{q.category}</Badge>
                      <span className="text-[10px] text-destructive font-semibold">{q.missRate}% miss rate</span>
                    </div>
                    <p className="text-xs text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {q.question}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Module card grids */}
        {categories.map(({ key }) => (
          <TabsContent key={key} value={key} className="mt-0">
            {filteredModules.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">No modules in this category yet.</div>
            ) : (
              <ModuleCardGrid modules={filteredModules} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

// ── Module Card Grid ─────────────────────────────────────────────────────────

function ModuleCardGrid({ modules }: { modules: typeof modulesData }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((mod) => {
        const article = (articlesData as Record<string, ArticleEntry>)[mod.id];
        const hasArticle = !!article;
        const meta = (insightsData.categoryMeta as Record<string, { label: string }>)[mod.category];

        return (
          <Link key={mod.id} href={`/learn/${mod.id}`}>
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md h-full">
              {/* Image */}
              <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                {hasArticle && article.heroImage ? (
                  <Image
                    src={article.heroImage}
                    alt={mod.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/60 to-accent/30">
                    <BookOpen className="h-10 w-10 text-primary/30" />
                  </div>
                )}

                {/* Overlay badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <Badge className="text-[10px] bg-primary/90 text-primary-foreground capitalize">
                    {meta?.label ?? mod.category}
                  </Badge>
                  {article?.forSchools && (
                    <Badge className="text-[10px] bg-amber-500/90 text-white gap-1">
                      <GraduationCap className="h-2.5 w-2.5" />
                      Schools
                    </Badge>
                  )}
                  {!hasArticle && (
                    <Badge className="text-[10px] bg-black/60 text-white">Coming soon</Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-bold text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors">
                  {mod.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-auto">
                  {mod.description}
                </p>

                {/* Footer meta */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {hasArticle && article.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {mod.questionIds.length} challenges
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    {hasArticle ? "Read" : "Preview"}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
