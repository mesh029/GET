"use client";

import { useState, useEffect } from "react";
import insightsData from "@/data/insights.json";

/**
 * Renders a randomly selected micro-insight without causing hydration mismatch.
 * Server renders index 0 (stable). Client swaps in a random one after mount.
 */
export function RandomInsight({ category }: { category?: string }) {
  const pool = category
    ? insightsData.microInsights.filter((i) => i.category === category)
    : insightsData.microInsights;
  const stable = pool.length > 0 ? pool : insightsData.microInsights;

  const [text, setText] = useState(stable[0].text);

  useEffect(() => {
    const idx = Math.floor(Math.random() * stable.length);
    setText(stable[idx].text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{text}</>;
}
