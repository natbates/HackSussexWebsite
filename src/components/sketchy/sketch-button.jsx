import React, { useRef, useEffect } from "react";
import rough from "roughjs/bin/rough";

const SketchButton = ({
  children,
  strokeWidth = 8,
  amplitude = 2,        // controls jaggedness
  segmentPercent = 0.01,
  stroke = "black",
  style = {},
  ...props
}) => {
  const buttonRef = useRef(null);
  const svgRef = useRef(null);

  const drawBorder = () => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Create SVG if it doesn't exist
    let svg = svgRef.current;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.position = "absolute";
      svg.style.top = `-${amplitude}px`;    // allow border outside top
      svg.style.left = `-${amplitude}px`;   // allow border outside left
      svg.style.width = `${rect.width + amplitude * 2}px`;
      svg.style.height = `${rect.height + amplitude * 2}px`;
      svg.style.pointerEvents = "none";
      svg.style.zIndex = 2;
      el.appendChild(svg);
      svgRef.current = svg;
    }

    // Clear previous drawing
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);

    // Rectangle coordinates for the jagged border
    const topLeft = [0, 0];
    const topRight = [rect.width + amplitude * 2, 0];
    const bottomRight = [rect.width + amplitude * 2, rect.height + amplitude * 2];
    const bottomLeft = [0, rect.height + amplitude * 2];

    // Helper to generate jagged line points
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

    // Compute number of segments per side
    const topSegments = Math.max(2, Math.round((topRight[0] - topLeft[0]) * segmentPercent));
    const rightSegments = Math.max(2, Math.round((bottomRight[1] - topRight[1]) * segmentPercent));
    const bottomSegments = Math.max(2, Math.round((bottomRight[0] - bottomLeft[0]) * segmentPercent));
    const leftSegments = Math.max(2, Math.round((bottomLeft[1] - topLeft[1]) * segmentPercent));

    // Generate points for full path
    const pathPoints = [
      ...jaggedLine(...topLeft, ...topRight, topSegments),
      ...jaggedLine(...topRight, ...bottomRight, rightSegments),
      ...jaggedLine(...bottomRight, ...bottomLeft, bottomSegments),
      ...jaggedLine(...bottomLeft, ...topLeft, leftSegments),
    ];

    // Draw the jagged border
    const node = rc.linearPath(pathPoints, { stroke, strokeWidth, roughness: 0 });
    svg.appendChild(node);
  };

  useEffect(() => {
    drawBorder();

    // Observe button size changes (hover scale or layout changes)
    const resizeObserver = new ResizeObserver(drawBorder);
    if (buttonRef.current) resizeObserver.observe(buttonRef.current);

    return () => resizeObserver.disconnect();
  }, [strokeWidth, amplitude, segmentPercent, stroke]);

  return (
    <button
      ref={buttonRef}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "visible",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default SketchButton;
