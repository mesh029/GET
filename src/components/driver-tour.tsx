"use client";

import { useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface DriverTourProps {
  onTriggerChallenge: (context: "social-login" | "banking" | "hospital") => void;
  onTourEnd: () => void;
}

export function useDriverTour({ onTriggerChallenge, onTourEnd }: DriverTourProps) {
  const startTour = useCallback(() => {
    const driverObj = driver({
      animate: true,
      showProgress: false,
      showButtons: ["next", "close"],
      nextBtnText: "Continue Experience →",
      doneBtnText: "Explore GET →",
      allowClose: true,
      overlayColor: "oklch(0.2683 0.0279 150.7681)",
      overlayOpacity: 0.75,
      popoverClass: "get-driver-popover",
      steps: [
        // ── Act 1: The Problem ──────────────────────────────────────
        {
          popover: {
            title: "The Problem With Verification",
            description:
              "Every day, <strong>2.8 billion interactions</strong> verify that you're human — and not one of them makes you smarter. CAPTCHA clicks, image grids, checkbox taps. All friction. Zero value. Every single time.",
            side: "over",
            align: "center",
          },
        },
        {
          popover: {
            title: "A Missed Opportunity at Scale",
            description:
              "These moments happen at the exact point of <strong>peak attention</strong> — when a user is focused, engaged, and waiting. Instead of wasting that attention on distorted text, what if we used it for something real?",
            side: "over",
            align: "center",
          },
        },

        // ── Act 2: The Solution ─────────────────────────────────────
        {
          popover: {
            title: "Introducing GET",
            description:
              "GET transforms every verification moment into a <strong>learning opportunity</strong>. Instead of proving you're not a robot, you prove you're an aware, informed human. Same infrastructure. Infinitely more value.",
            side: "over",
            align: "center",
          },
        },
        {
          popover: {
            title: "GET Doesn't Just Verify — It Teaches",
            description:
              "From <strong>cybersecurity</strong> to <strong>climate science</strong>, from <strong>your legal rights</strong> to <strong>space exploration</strong> — GET's challenge engine spans every domain where human awareness creates real-world impact.",
            side: "over",
            align: "center",
          },
        },

        // ── Act 3: Social Login ─────────────────────────────────────
        {
          element: "#section-social",
          popover: {
            title: "Social Login: The Most Common Gateway",
            description:
              "Social login handles billions of daily authentications. Today, it's a silent checkbox. With GET, that same gesture becomes a question about <strong>phishing awareness, data rights, or digital consent</strong>.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "#btn-social-login",
          popover: {
            title: "Experience It Live",
            description:
              "Click <em>Continue with Google</em> below to see GET in action. The challenge takes under 12 seconds — and you'll leave knowing something real.",
            side: "bottom",
            align: "start",
            nextBtnText: "See Impact →",
            onNextClick: () => {
              driverObj.destroy();
              onTriggerChallenge("social-login");
            },
          },
        },

        // ── Act 4: Banking ──────────────────────────────────────────
        {
          element: "#section-banking",
          popover: {
            title: "Banking: Where Awareness Prevents Real Harm",
            description:
              "Financial fraud costs over <strong>$485 billion annually</strong>. GET turns every transaction confirmation into a <strong>fraud awareness moment</strong>. The same step. The same time. But now users are actively learning to protect themselves.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "#btn-banking",
          popover: {
            title: "Compliance + Education in One Step",
            description:
              "Banks already require 2FA and verification steps for high-risk actions. GET slots into those same flows — adding a relevant awareness question with <strong>zero added latency</strong> to the core workflow.",
            side: "bottom",
            align: "start",
          },
        },

        // ── Act 5: Healthcare ───────────────────────────────────────
        {
          element: "#section-hospital",
          popover: {
            title: "Healthcare: The Highest-Stakes Use Case",
            description:
              "In EMR systems, every login is a potential liability. Healthcare data breaches average <strong>$10.9M per incident</strong>. GET challenges clinical staff with data privacy and patient safety questions — turning routine logins into micro-training moments.",
            side: "bottom",
            align: "start",
          },
        },

        // ── Act 6: The Knowledge System ─────────────────────────────
        {
          element: "#section-impact",
          popover: {
            title: "A Living Knowledge System",
            description:
              "GET isn't static. The challenge engine surfaces <strong>trending topics, time-aware insights, and personalized weak areas</strong> — making every interaction feel relevant to what's happening right now.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#section-impact",
          popover: {
            title: "Infrastructure for Behavior Change",
            description:
              "GET is <strong>infrastructure</strong>, not an app. It integrates into existing flows — social, banking, healthcare, enterprise — and turns passive verification into active learning at network scale.",
            side: "top",
            align: "center",
          },
        },

        // ── Act 7: The Scale ────────────────────────────────────────
        {
          popover: {
            title: "The Scale Opportunity",
            description:
              "If just <strong>1% of global daily CAPTCHA interactions</strong> became GET challenges, that's <strong>28 million learning moments every day</strong>. No new apps. No new habits. Same infrastructure — transformed purpose.",
            side: "over",
            align: "center",
          },
        },

        // ── Act 8: The Closing ──────────────────────────────────────
        {
          popover: {
            title: "We're Upgrading Humans",
            description:
              "CAPTCHA asks: <em>Are you human?</em><br/><br/>GET asks: <em>Are you an informed one?</em><br/><br/>This system evolves with what people need to know — from cybersecurity to climate, from law to space.<br/><br/><strong>We're not just verifying users. We're upgrading them.</strong>",
            side: "over",
            align: "center",
            nextBtnText: "Explore GET →",
            onNextClick: () => {
              driverObj.destroy();
              onTourEnd();
            },
          },
        },
      ],
    });

    driverObj.drive();
  }, [onTriggerChallenge, onTourEnd]);

  return { startTour };
}
