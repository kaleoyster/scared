---
title: Network Analysis
---

# Network Analysis
This report is a brief overview of the history and current state of rocket launches and space exploration.

## Background

This passage explains why network analysis is a powerful alternative (or complement) to traditional latent factor models (like factor analysis) when analyzing psychological symptoms, particularly in tools like SCARED (a screening tool for child anxiety).


## 🔗 Network Models vs. Latent Factor Models

```js
import {timeline} from "./components/timeline.js";
```

```js
const events = FileAttachment("./data/events.json").json();
```

```js
timeline(events, {height: 300})
```

## Latent Factor Models (like Factor Analysis):
-	Assume symptoms are caused by underlying (latent) factors, like “general anxiety” or “panic disorder.”
-	Group symptoms based on how they correlate.
-	Output: scores for each latent factor, but not how individual symptoms relate to each other.

---
## Network Models:
-	Treat symptoms themselves as interacting elements.
-	No need for a hidden “cause” (like anxiety) – instead, symptoms influence each other directly.
-	Visualize as graphs: nodes = symptoms, edges = statistical relationships between symptoms (e.g., partial correlations).

---
## 💡 Key Advantages of Network Models

### 1. Granularity: Symptom-level detail
-	Network analysis keeps focus on individual symptoms.
-	Helps identify which specific symptoms are “central” (influential in the network).
-	🧠 Example: “Dizzy when frightened” might be more central than “trouble sleeping,” which you wouldn’t know from a broad anxiety factor score.

### 2. Comorbidity Mapping: Bridge Symptoms
-	Networks can show how different disorders are linked.
-	Bridge symptoms (like “guilt”) connect anxiety and depression.
-	Latent models can show correlation between factors, but don’t explain why.
-	🔧 Clinical value: Targeting bridge symptoms could improve both disorders.

### 3. Dynamic Insights: Feedback Loops
-	Symptoms can reinforce each other (A ↔ B), creating vicious cycles.
-	E.g., anxiety → avoidance → more anxiety.
-	Network analysis allows modeling of bidirectional relationships, unlike latent models.
-	Can even explore moderators (e.g., gender affects strength of connection).


### 4. Group and Time Comparisons: Structural Change
-	You can test whether the structure of the symptom network changes over time or with treatment.
-	For example:
-	Pre-treatment: strong connections between symptoms.
-	Post-treatment: symptoms may become less connected, implying deeper recovery.
-	Traditional models only test symptom reduction, not structure change.

### Patient-specific Modeling: Idiographic Networks
-	If you collect enough data from one person over time, you can build a personalized network.
-	Shows which symptoms drive others for that specific individual.
-	🧍 Example: For one child, “avoidance” may drive “worry”; for another, it’s reversed.
-	Aligns with personalized/precision medicine, unlike group-based latent models.


## 🔬 Methodology Summary
The following is the methodology description of summary:

| Term | Description |
|------|------------|
| Nodes | Individual symptoms (e.g., "trouble sleeping", "dizzy when frightened") |
| Edges | Statistical relationships (e.g., partial correlation) between symptoms |
| Hubs | Central symptoms in the network – those with many or strong connections; important for intervention |
| Bridge Symptoms | Symptoms that connect two different symptom clusters (e.g., anxiety ↔ depression) |
| Network Metrics | Quantitative indicators like centrality, clustering, density – used to assess structure or change |


## 🧠 Clinical Insight from Hubs
-	If a symptom is central, it might be a leverage point: treating it could reduce other connected symptoms.
-	If a bridge symptom links two disorders, treating it may reduce comorbidity.
-	If edges weaken post-treatment, it may suggest a less fragile mental state.
