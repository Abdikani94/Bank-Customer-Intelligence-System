import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";

const statusContent = {
  connected: { label: "API online", icon: CircleCheck },
  disconnected: { label: "API offline", icon: CircleX },
  checking: { label: "Checking API", icon: LoaderCircle },
};

function StatusBadge({ status, compact = false }) {
  const content = statusContent[status] || statusContent.checking;
  const Icon = content.icon;

  return (
    <span
      className={`status-badge status-${status} ${compact ? "status-compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <Icon size={14} aria-hidden="true" />
      <span>{content.label}</span>
    </span>
  );
}

export default StatusBadge;
