"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  type DialogProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AppModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: DialogProps["maxWidth"];
}

/** Reusable modal: a titled MUI Dialog with a close button. */
export function AppModal({
  open,
  title,
  onClose,
  children,
  maxWidth = "sm",
}: AppModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
