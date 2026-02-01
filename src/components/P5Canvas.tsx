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
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    const frame = frameRef.current;
    if (!frame) return;

    try {
      if (!document.fullscreenElement) {
        if (frame.requestFullscreen) {
          await frame.requestFullscreen();
        } else {
          setError("Fullscreen is not supported in this browser.");
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fullscreen failed.");
    }
  };

  return (
    <div className="p5-frame" ref={frameRef}>
      <button
        className="fullscreen-btn"
        type="button"
        onClick={toggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
      >
        {isFullscreen ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fullscreen-icon"
          >
            <path d="M9 3v2H5v4H3V3h6zm12 0v6h-2V5h-4V3h6zM3 21v-6h2v4h4v2H3zm16-6h2v6h-6v-2h4v-4z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fullscreen-icon"
          >
            <path d="M7 3v2H5v2H3V3h4zm14 0v4h-2V5h-2V3h4zM3 17h2v2h2v2H3v-4zm16 2h-2v-2h-2v-2h4v4z" />
          </svg>
        )}
      </button>
      {error ? <p>{error}</p> : null}
      <div id="p5-container" ref={containerRef} />
    </div>
  );
}
