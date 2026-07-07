'use client';

import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { useId } from 'react';

/**
 * A TextField that aggressively suppresses browser autofill/autocomplete.
 *
 * Chrome ignores autoComplete="off" on forms and fields it recognises as
 * credential inputs. A randomised id plus data-form-type="other" breaks
 * that heuristic without interfering with React Hook Form's name tracking.
 */
export function NoFillTextField(props: TextFieldProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <TextField
      {...props}
      autoComplete="off"
      slotProps={{
        ...props.slotProps,
        htmlInput: {
          ...((props.slotProps as { htmlInput?: object })?.htmlInput ?? {}),
          autoComplete: 'off',
          'data-form-type': 'other',
          id: `field-${uid}`,
        },
      }}
    />
  );
}
