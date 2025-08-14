import * as d3 from "npm:d3";

export function arc_diagram(data) {
    // Specify the chart’s dimensions.
    const {nodes, links, orders} = data;
    const height = 1000;
    const step = 32;
    const marginTop = 60;
    const marginRight = 120;
    const marginBottom = 420;
    const marginLeft = 10;
    const width = (nodes.length - 1) * step + marginLeft + marginRight;

    // Fix: If orders is undefined or does not have "get", fall back to node ids
    let initialOrder;
    if (orders && typeof orders.get === "function" && orders.get("by name")) {
      initialOrder = orders.get("by name");
    } else {
      // fallback: use nodes sorted by id
      initialOrder = nodes.map(d => d.id).sort(d3.ascending);
    }

    // Horizontal: x is the main axis
    const x = d3.scalePoint(initialOrder, [marginLeft, width - marginRight]);

    // A color scale for the nodes and links.
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
    const X = new Map(nodes.map(({id}) => [id, x(id)]));

    // Add an arc for each link (horizontal orientation).
    function arc(d) {
      const x1 = X.get(d.source);
      const x2 = X.get(d.target);
      const r = Math.abs(x2 - x1) / 2;
      // Arcs go from (x1, y) to (x2, y), arching upward
      return `M${x1},${height - marginBottom}A${r},${r} 0,0,1 ${x2},${height - marginBottom}`;
    }
    const path = svg.insert("g", "*")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 3)
      .selectAll("path")
      .data(links)
      .join("path")
        .attr("stroke", d => color(samegroup(d)))
        .attr("d", arc);

    // Add a dot and a text label for each node, with the label below the node.
    const label = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 16)
        .attr("text-anchor", "middle")
      .selectAll("g")
      .data(nodes)
      .join("g")
        .attr("transform", d => `translate(${X.get(d.id)},${height - marginBottom})`)
        .call(g => g.append("circle")
            .attr("r", 7)
            .attr("fill", d => color(d.group))
            .attr("stroke", d => d3.lab(color(d.group)).darker(2)))
        .call(g => g.append("text")
            .attr("x", -90)
            .attr("y", 0) // 24px below the node
            .attr("transform", "rotate(-90)")
            .attr("dy", "0.32em")
            .attr("fill", d => d3.lab(color(d.group)).darker(1))
            .text(d => d.id));

    // Add invisible rects that update the class of the elements on mouseover.
    label.append("rect")
        .attr("fill", "none")
        .attr("width", step)
        .attr("height", marginBottom + 40)
        .attr("x", -step / 2)
        .attr("y", -20)
        .attr("pointer-events", "all")
        .on("pointerenter", (event, d) => {
          svg.classed("hover", true);
          label.classed("primary", n => n === d);
          label.classed("secondary", n => links.some(({source, target}) => (
            n.id === source && d.id == target || n.id === target && d.id === source
          )));
          path.classed("primary", l => l.source === d.id || l.target === d.id).filter(".primary").raise();
        })
        .on("pointerout", () => {
          svg.classed("hover", false);
          label.classed("primary", false);
          label.classed("secondary", false);
          path.classed("primary", false).order();
        });

    // Add styles for the hover interaction.
    svg.append("style").text(`
      .hover text { fill: #333; }
      .hover g.primary text { font-weight: bold; fill: #333; }
      .hover g.secondary text { fill: #333; }
      .hover path { stroke: #333; }
      .hover path.primary { stroke: #333; }
    `);

    // A function that updates the positions of the labels and recomputes the arcs
    // when passed a new order.
    function update(order) {
      x.domain(order);

      label
          .sort((a, b) => d3.ascending(X.get(a.id), X.get(b.id)))
          .transition()
          .duration(750)
          .delay((d, i) => i * 20) // Make the movement start from the left.
          .attrTween("transform", d => {
            const i = d3.interpolateNumber(X.get(d.id), x(d.id));
            return t => {
              const xval = i(t);
              X.set(d.id, xval);
              return `translate(${xval},${height - marginBottom})`;
            }
          });

      path.transition()
          .duration(750 + nodes.length * 20) // Cover the maximum delay of the label transition.
          .attrTween("d", d => () => arc(d));
    }

    return Object.assign(svg.node(), {update});
}