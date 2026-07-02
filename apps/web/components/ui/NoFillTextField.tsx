"use client";

import { useId } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

/**
 * A TextField that aggressively suppresses browser autofill/autocomplete.
 *
 * Chrome ignores autoComplete="off" on forms and fields it recognises as
 * credential inputs. Setting a randomised id and name on the underlying
 * <input> breaks that heuristic.
 */
export function NoFillTextField(props: TextFieldProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <TextField
      {...props}
      autoComplete="off"
      slotProps={{
        ...props.slotProps,
        htmlInput: {
          ...((props.slotProps as { htmlInput?: object })?.htmlInput ?? {}),
          autoComplete: "off",
          "data-form-type": "other",
          id: `field-${uid}`,
          name: `field-${uid}`,
        },
      }}
    />
  );
}
