import type { ReactNode } from "react";

export interface PreviewModalProps {
  /** Whether the modal is shown */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Content to render inside the modal */
  children: ReactNode;
  /** Optional wrapper classes for the outer container */
  className?: string;
  /** Optional classes for the backdrop */
  backgroundClassName?: string;
  /** Optional classes for the modal content wrapper */
  contentClassName?: string;
}
