# GreenGauge

GreenGauge is a **climate portfolio x-ray** that helps investors understand the environmental footprint and climate-related risk hidden inside their portfolio.

Instead of trying to be an all-in-one investing platform, GreenGauge is being shaped around one core question:

> **What do I actually own, how exposed is it to environmental risk, and which holdings are driving that result?**

## Project Idea

GreenGauge is designed to help users move beyond generic ESG buzzwords and get a clearer picture of how their portfolio looks through an environmental lens.

The product direction is intentionally narrow:

- analyze a portfolio or watchlist
- surface environmental and climate-related signals
- show which holdings contribute most to the portfolio profile
- connect sustainability context to portfolio risk
- explain results in plain English through a grounded chat experience

The goal is not to give trading advice. The goal is to make a portfolio easier to understand.

## Problem GreenGauge Solves

Many investment tools focus on price movement, returns, and performance. Many sustainability tools focus on company-level ESG reports. Very few help a user understand:

- how environmentally exposed their **whole portfolio** is
- which holdings are the biggest drivers of that exposure
- how climate-related concerns may overlap with traditional investment risk
- how to interpret those signals without reading dense reports

GreenGauge aims to bridge that gap with a simple, explainable portfolio view.

## Core MVP Direction

The current idea is to build a first version around a small, focused workflow:

1. A user enters or imports portfolio holdings
2. GreenGauge normalizes the portfolio and maps holdings to known companies or funds
3. The app computes a portfolio-level environmental profile and climate-related risk view
4. The user sees the top holdings driving the result
5. A chat widget explains the numbers and definitions in plain language

For the MVP, the emphasis is on **clarity, transparency, and environmental relevance** rather than trying to support every brokerage, every dataset, or every finance feature.

## What GreenGauge Should Feel Like

GreenGauge should feel like a portfolio health check with a climate lens.

That means the app should prioritize:

- a clear portfolio summary
- understandable scoring or signal breakdowns
- visible drivers behind the result
- honest caveats when data is incomplete
- an explanation layer that uses the app's actual metrics instead of making things up

## Intended Stack Direction

GreenGauge is intended to move toward a **Next.js-based stack** as the project matures.

The target direction is:

- Next.js frontend with TypeScript
- Tailwind CSS for styling
- a portfolio dashboard experience with chat-assisted explanations
- backend APIs and data integrations layered in as the product evolves

That stack fits the long-term product better than a lightweight prototype setup because it gives the project a stronger foundation for routing, server-side data flows, and full-stack application growth.

## Current Repository Status

This repository currently contains an **early frontend prototype** for the GreenGauge experience.

At the moment, the checked-in code includes:

- a React frontend prototype built with Vite
- a home page and login route
- an early landing-page concept
- a chat widget prototype

So the README reflects the **product direction and intended architecture**, while the current codebase is still an earlier prototype that has not yet been migrated to Next.js.

## Current Prototype Stack

- React 18
- Vite
- React Router
- Tailwind CSS
- Recharts
- Radix UI primitives

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Run locally

```bash
git clone https://github.com/rishi-golla/GreenGauge.git
cd GreenGauge
npm install
npm run dev
```

Then open the local Vite development URL shown in the terminal.

> Note: these commands run the **current prototype** in this repository. The team’s intended production direction is a Next.js-based stack, but that migration has not been completed yet.

## Near-Term Product Priorities

The most important next steps for GreenGauge are:

- sharpen the UI around the climate portfolio x-ray concept
- define the environmental metrics or signals used in the MVP
- make the chat experience explain portfolio results instead of acting like generic support
- connect the frontend to real portfolio and climate-related data sources over time

## Guiding Principle

GreenGauge should stay focused on one strong promise:

**Help users understand the environmental profile and climate-related risk of their portfolio in a way that is simple, transparent, and actionable to interpret.**
