import { useEffect, useRef, useState } from "react";

const P5_CDN = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js";

type P5CanvasProps = {
  sketch: string;
};

const loadScript = (src: string, dataAttr?: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    if (dataAttr) {
      script.setAttribute("data-p5", dataAttr);
    }
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });

export default function P5Canvas({ sketch }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setError(null);

    const existingSketch = document.querySelector("script[data-p5='sketch']");
    if (existingSketch) {
      existingSketch.remove();
    }

    const ensureP5 = () => {
      if (window.p5) {
        return Promise.resolve();
      }
      return loadScript(P5_CDN, "lib");
    };

    ensureP5()
      .then(() => loadScript(sketch, "sketch"))
      .catch((err: Error) => {
        setError(err.message);
      });
  }, [sketch]);

  return (
    <div className="p5-frame">
      {error ? <p>{error}</p> : null}
      <div id="p5-container" ref={containerRef} />
    </div>
  );
}
