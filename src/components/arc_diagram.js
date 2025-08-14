import * as d3 from "npm:d3";

export function arc_diagram(data) {
    const {nodes, links, orders} = data;
    // Specify the chart’s dimensions.
    const width = 640;
    const step = 14;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 130;
    const height = (nodes.length - 1) * step + marginTop + marginBottom;

    // Fallback: if orders is undefined or does not have "get", use nodes sorted by id
    let initialOrder;
    if (orders && typeof orders.get === "function" && orders.get("by name")) {
      initialOrder = orders.get("by name");
    } else {
      initialOrder = nodes.map(d => d.id).sort(d3.ascending);
    }

    const y = d3.scalePoint(initialOrder, [marginTop, height - marginBottom]);
  
    // A color scale for the nodes and links (flipped: default is gray, color on hover)
    const color = d3.scaleOrdinal()
      .domain(nodes.map(d => d.group).sort(d3.ascending))
      .range(d3.schemeCategory10)
      .unknown("#aaa");
  
    // A function of a link, that checks that source and target have the same group and returns
    // the group; otherwise null. Used to color the links.
    const groups = new Map(nodes.map(d => [d.id, d.group]));
    function samegroup({ source, target }) {
      return groups.get(source) === groups.get(target) ? groups.get(source) : null;
    }
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
    // The current position, indexed by id. Will be interpolated.
    const Y = new Map(nodes.map(({id}) => [id, y(id)]));
    
    // Add an arc for each link.
    function arc(d) {
      const y1 = Y.get(d.source);
      const y2 = Y.get(d.target);
      const r = Math.abs(y2 - y1) / 2;
      return `M${marginLeft},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${marginLeft},${y2}`;
    }
    const path = svg.insert("g", "*")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
        .attr("stroke", "#ccc") // Default: gray
        .attr("d", arc)
        .attr("class", "arc-link");
  
    // Add a text label and a dot for each node.
    const label = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(nodes)
      .join("g")
        .attr("transform", d => `translate(${marginLeft},${Y.get(d.id)})`)
        .call(g => g.append("text")
            .attr("x", -6)
            .attr("dy", "0.35em")
            .attr("fill", "#aaa") // Default: gray
            .text(d => d.id))
        .call(g => g.append("circle")
            .attr("r", 3)
            .attr("fill", "#aaa")); // Default: gray
  
    // Add invisible rects that update the class of the elements on mouseover.
    label.append("rect")
        .attr("fill", "none")
        .attr("width", marginLeft + 40)
        .attr("height", step)
        .attr("x", -marginLeft)
        .attr("y", -step / 2)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("pointerenter", (event, d) => {
          svg.classed("hover", true);
          label.classed("primary", n => n === d);
          label.classed("secondary", n => links.some(({source, target}) => (
            n.id === source && d.id == target || n.id === target && d.id === source
          )));
          path.classed("primary", l => l.source === d.id || l.target === d.id).filter(".primary").raise();

          // Color the hovered node and its links/nodes
          label.selectAll("text")
            .attr("fill", n => {
              if (n === d) return d3.lab(color(n.group)).darker(2); // primary
              if (links.some(({source, target}) => (
                (n.id === source && d.id == target) || (n.id === target && d.id === source)
              ))) return d3.lab(color(n.group));
              return "#aaa";
            });
          label.selectAll("circle")
            .attr("fill", n => {
              if (n === d) return color(n.group); // primary
              if (links.some(({source, target}) => (
                (n.id === source && d.id == target) || (n.id === target && d.id === source)
              ))) return color(n.group);
              return "#aaa";
            });
          path
            .attr("stroke", l => {
              // If this link is connected to the hovered node, color it
              if (l.source === d.id || l.target === d.id) {
                // Use color based on group if same group, else fallback
                return color(samegroup(l));
              }
              return "#ccc";
            });
        })
        .on("pointerout", () => {
          svg.classed("hover", false);
          label.classed("primary", false);
          label.classed("secondary", false);
          path.classed("primary", false).order();

          // Reset all to gray
          label.selectAll("text").attr("fill", "#aaa");
          label.selectAll("circle").attr("fill", "#aaa");
          path.attr("stroke", "#ccc");
        });

    // Add hover for links themselves (so hovering a link highlights it and its nodes)
    path
      .on("pointerenter", function(event, d) {
        svg.classed("hover", true);
        // Highlight the two nodes
        label.classed("primary", n => n.id === d.source || n.id === d.target);
        label.classed("secondary", n => false);
        // Highlight the hovered link
        path.classed("primary", l => l === d).filter(".primary").raise();

        // Color the two nodes
        label.selectAll("text")
          .attr("fill", n => (n.id === d.source || n.id === d.target) ? d3.lab(color(groups.get(n.id))).darker(2) : "#aaa");
        label.selectAll("circle")
          .attr("fill", n => (n.id === d.source || n.id === d.target) ? color(groups.get(n.id)) : "#aaa");
        // Color the hovered link
        path.attr("stroke", l => l === d ? color(samegroup(l)) : "#ccc");
      })
      .on("pointerout", function() {
        svg.classed("hover", false);
        label.classed("primary", false);
        label.classed("secondary", false);
        path.classed("primary", false).order();

        // Reset all to gray
        label.selectAll("text").attr("fill", "#aaa");
        label.selectAll("circle").attr("fill", "#aaa");
        path.attr("stroke", "#ccc");
      });
  
    // Add styles for the hover interaction (flipped: default is gray, color on hover)
    svg.append("style").text(`
      .hover text { fill: #aaa; }
      .hover g.primary text { font-weight: bold; }
      .hover g.secondary text { }
      .hover path { stroke: #ccc; }
      .hover path.primary { }
    `);
  
    // A function that updates the positions of the labels and recomputes the arcs
    // when passed a new order.
    function update(order) {
      // Defensive: if order is not provided, use the current order
      if (!order) order = initialOrder;
      y.domain(order);
  
      label
          .sort((a, b) => d3.ascending(Y.get(a.id), Y.get(b.id)))
          .transition()
          .duration(750)
          .delay((d, i) => i * 20) // Make the movement start from the top.
          .attrTween("transform", d => {
            const i = d3.interpolateNumber(Y.get(d.id), y(d.id));
            return t => {
              const yVal = i(t);
              Y.set(d.id, yVal);
              return `translate(${marginLeft},${yVal})`;
            }
          });
  
      path.transition()
          .duration(750 + nodes.length * 20) // Cover the maximum delay of the label transition.
          .attrTween("d", d => () => arc(d));
    }
  
    return Object.assign(svg.node(), {update});
  }