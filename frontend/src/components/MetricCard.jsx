import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { useEffect, useState } from "react";

function useCountUp(value) {
  const match = String(value).match(/^([\d,.]+)(.*)$/);
  const numericValue = match ? Number(match[1].replaceAll(",", "")) : null;
  const suffix = match?.[2] || "";
  const decimals = match?.[1].includes(".")
    ? match[1].split(".")[1].length
    : 0;
  const usesGrouping = match?.[1].includes(",");
  const [displayValue, setDisplayValue] = useState(
    numericValue === null ? value : `0${suffix}`,
  );

  useEffect(() => {
    if (numericValue === null) {
      setDisplayValue(value);
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 620;
    const startTime = performance.now();
    let frame;

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = numericValue * eased;
      const formatted = current.toLocaleString("en-US", {
        useGrouping: usesGrouping,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [decimals, numericValue, suffix, usesGrouping, value]);

  return displayValue;
}

function MetricCard({
  label,
  value,
  description,
  trend,
  trendDirection = "neutral",
  icon: Icon,
  tone = "blue",
  delay = 0,
}) {
  const animatedValue = useCountUp(value);
  const TrendIcon =
    trendDirection === "up"
      ? ArrowUpRight
      : trendDirection === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <article
      className={`metric-card metric-${tone}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      <div className="metric-card-top">
        <span className="metric-icon" aria-hidden="true">
          <Icon size={19} />
        </span>
        {trend && (
          <span className={`metric-trend trend-${trendDirection}`}>
            <TrendIcon size={13} aria-hidden="true" />
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="metric-label">{label}</p>
        <strong className="metric-value">{animatedValue}</strong>
        <p className="metric-description">{description}</p>
      </div>
    </article>
  );
}

export default MetricCard;
