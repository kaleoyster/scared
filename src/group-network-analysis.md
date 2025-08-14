---
toc: true
---
<div class='hero'> 
 <h1>Personalized Anxiety Insights</h1>
</div>



```js
import {arc_diagram} from "./components/arc_diagram.js";

const network_data = FileAttachment("./data/group_symptom_network.json").json();
```


```js
arc_diagram(network_data)
```
*Interactive Network: Hover over symptoms to see details, click to explore connections*

*Individual SCARED Report: Exploring Your Unique Anxiety Profile*

## Understanding Group Anxiety Profile


<div class="wide-paragraph">
Instead of simply tallying up symptoms, this analysis uncovers the intricate web of relationships among your anxiety symptoms—showing not just which symptoms you experience, but how they influence and reinforce one another. By mapping these connections, we can highlight the symptoms that are most central to your unique experience and better understand the pathways through which your anxiety manifests and evolves.
</div>
<br>

### What This Report Reveals

<div class="wide-paragraph">
The SCARED assessment evaluates 41 anxiety symptoms spanning several domains. What sets this report apart is its focus on the connections between your symptoms—revealing not just which symptoms you have, but how they interact and combine to shape your unique anxiety profile.
</div>

---

## Your Anxiety Network Visualization

<div class="wide-paragraph">
Below is an interactive visualization of your anxiety symptom network. Each point represents a symptom, and the connections show how symptoms relate to each other. The size and position of each symptom indicates its importance in your overall anxiety pattern.
</div>
<br>


---

## Key Findings: Anxiety Architecture

*The following covers central players, connectors, and anxiety structures*

### The Central Players: Your Most Influential Symptoms

The symptoms listed below are the "hubs" of your anxiety network—they have the strongest connections to other symptoms and likely play a central role in your anxiety experience:

| Symptom | Degree | Betweenness | Closeness | Eigenvector | Composite |
|---------|--------|-------------|-----------|-------------|-----------|
| q18     | 0.875  | 0.037375    | 0.888889  | 0.227463    | 0.507182  |
| q1      | 0.800  | 0.028140    | 0.833333  | 0.212562    | 0.468509  |
| q7      | 0.750  | 0.025758    | 0.800000  | 0.198757    | 0.443629  |
| q14     | 0.750  | 0.032427    | 0.800000  | 0.190443    | 0.443218  |
| q36     | 0.725  | 0.013144    | 0.784314  | 0.205961    | 0.432105  |

**What This Means:** These symptoms are highly connected to others in your anxiety network. When these symptoms are present, they tend to activate or influence many other anxiety experiences. This suggests that addressing these central symptoms could have a broader impact on your overall anxiety.

### The Connectors: Symptoms That Bridge Different Anxiety Types

Some symptoms act as "bridges" between different clusters of anxiety experiences:

| Symptom | Clusters Connected |
|---------|-------------------|
| q1      | 3                 |
| q2      | 3                 |
| q3      | 3                 |
| q4      | 3                 |
| q5      | 3                 |

**What This Means:** These symptoms connect different types of anxiety experiences. They might represent common pathways that anxiety takes in your system, or they could be symptoms that appear across multiple anxiety contexts.

---

## Your Anxiety Network Structure

### Overall Network Characteristics

| Metric                  | Value    | What This Tells Us |
|-------------------------|----------|-------------------|
| **41 Symptoms**         | 41.0000  | Comprehensive coverage of anxiety domains |
| **451 Connections**     | 451.0000 | High interconnectivity between symptoms |
| **Density**             | 0.5500   | Moderate to high symptom clustering |
| **Clustering**          | 0.6772   | Symptoms tend to group together |
| **Communities**         | 2.0000   | Two main anxiety symptom clusters |

### What These Numbers Mean

- **High Density (0.55):** Your anxiety symptoms are well-connected, suggesting that anxiety experiences tend to co-occur and influence each other.
- **Strong Clustering (0.68):** Symptoms group together, indicating that certain types of anxiety tend to happen together.
- **Two Communities:** Your anxiety symptoms organize into two main groups, suggesting two distinct anxiety patterns or domains.

---

## Your Anxiety Symptom Clusters

### Cluster 1: Core Anxiety Group
- **Size:** 17 symptoms
- **Average Centrality:** 0.528
- **Characteristics:** This cluster represents your primary anxiety symptoms, including q4, q3, q32, q8, q40, and others.

### Cluster 2: Secondary Anxiety Group  
- **Size:** 24 symptoms
- **Average Centrality:** 0.566
- **Characteristics:** This larger cluster includes symptoms like q23, q33, q31, q18, and q22, with slightly higher centrality scores.

**Understanding Your Clusters:** The fact that you have two distinct anxiety clusters suggests that your anxiety may manifest in different ways depending on the situation or context. Cluster 2's higher centrality suggests these symptoms might be more influential in your overall anxiety pattern.

---

## What This Means for You

### Personalized Insights

1. **Target the Hubs:** The symptoms with the highest centrality scores (q18, q1, q7, q14, q36) are likely your most impactful anxiety experiences. Addressing these could have the broadest positive effect.

2. **Understand the Connections:** Your anxiety symptoms are highly interconnected, which means changes in one area could positively influence others.

3. **Cluster-Based Approach:** Consider whether your anxiety tends to manifest in one cluster more than the other, as this could guide your intervention strategies.

### Next Steps

- **Discuss with Professionals:** Share these findings with mental health professionals to develop targeted intervention strategies
- **Monitor Patterns:** Pay attention to which symptoms tend to appear together in your daily experience
- **Track Progress:** Use this baseline to measure how interventions affect your symptom network over time

---

## Technical Details

*Network analysis results saved with prefix: `child_scared_network`*

*This analysis uses advanced network science methods to map the relationships between your anxiety symptoms, providing insights that go beyond traditional assessment approaches.*

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.wide-paragraph {
  max-width: 100%;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  /* 
    font-size: 1vw; 
    'vw' stands for "viewport width" — 1vw is 1% of the width of the browser window.
    To make the font size half as large, use 0.5vw instead of 1vw.
    Example:
    font-size: 0.5vw;
  */
  font-size: 0.5vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, #000, #000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>
