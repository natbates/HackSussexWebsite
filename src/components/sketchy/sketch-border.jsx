import React, { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";

const SketchyBorder = ({
  children,
  strokeWidth = 6,
  amplitude = 5,
  segmentPercent = 0.05, // percentage of side length to define number of segments
  padding = 0,
  stroke = "black",
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Generate jagged line points between two coordinates
  const jaggedLine = (x1, y1, x2, y2, segments) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * amplitude;
      const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * amplitude;
      points.push([x, y]);
    }
    return points;
  };


  const drawBorder = () => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    let svg = svgRef.current;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.position = "absolute";
      svg.style.top = `-${amplitude}px`;
      svg.style.left = `-${amplitude}px`;
      svg.style.width = `${rect.width + amplitude * 2}px`;
      svg.style.height = `${rect.height + amplitude * 2}px`;
      svg.style.pointerEvents = "none";
      svg.style.zIndex = 2;
      el.appendChild(svg);
      svgRef.current = svg;
    }

    // Clear previous drawings
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);

    const topLeft = [padding + amplitude, padding + amplitude];
    const topRight = [rect.width - padding + amplitude, padding + amplitude];
    const bottomRight = [rect.width - padding + amplitude, rect.height - padding + amplitude];
    const bottomLeft = [padding + amplitude, rect.height - padding + amplitude];

    // Compute segments based on side length
    const topSegments = Math.max(2, Math.round((topRight[0] - topLeft[0]) * segmentPercent));
    const rightSegments = Math.max(2, Math.round((bottomRight[1] - topRight[1]) * segmentPercent));
    const bottomSegments = Math.max(2, Math.round((bottomRight[0] - bottomLeft[0]) * segmentPercent));
    const leftSegments = Math.max(2, Math.round((bottomLeft[1] - topLeft[1]) * segmentPercent));

    // Create one closed jagged path
    const pathPoints = [
      ...jaggedLine(...topLeft, ...topRight, topSegments),
      ...jaggedLine(...topRight, ...bottomRight, rightSegments),
      ...jaggedLine(...bottomRight, ...bottomLeft, bottomSegments),
      ...jaggedLine(...bottomLeft, ...topLeft, leftSegments),
    ];

    const node = rc.linearPath(pathPoints, { stroke, strokeWidth, roughness: 0 });
    svg.appendChild(node);
  };

  useEffect(() => {
    drawBorder();
    const resizeObserver = new ResizeObserver(drawBorder);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [strokeWidth, amplitude, segmentPercent, padding, stroke]);

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      {children}
    </div>
  );
};

export default SketchyBorder;
