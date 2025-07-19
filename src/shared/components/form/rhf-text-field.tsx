import { Controller, useFormContext } from "react-hook-form";

import { formHelperTextClasses } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  shouldValidate?: true;
};

export default function RHFTextField({
  name,
  helperText,
  type,
  shouldValidate,
  sx,
  ...other
}: Props) {
  const { control } = useFormContext();

  const maxLength = other?.inputProps?.maxLength;

  const _helperText = (length: number) => {
    if (maxLength && !helperText) return `${length ?? 0}/${maxLength}`;

    return helperText;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={field.value ?? ""}
          sx={{
            mb: 1,
            [`& .${formHelperTextClasses.root}`]: {
              position: "absolute",
              bottom: -20,
            },
            "&:focus-within": {
              [`& .${formHelperTextClasses.root}`]: { display: "block" },
            },
            [`& .Mui-disabled`]: {
              backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.04),
            },
            ...sx,
          }}
          onChange={(event) => {
            if (other.onChange) {
              other.onChange(event);
              return;
            }
            if (type === "number") {
              field.onChange(Number(event.target.value), { shouldValidate });
              if (
                Number.isInteger(Number(event.target.value)) &&
                field.value === 0
              ) {
                field.onChange(event.target.value.replace(/^0+/, ""), {
                  shouldValidate,
                });
              }
            } else {
              field.onChange(event.target.value, { shouldValidate });
            }
          }}
          error={!!error}
          helperText={
            error ? error?.message : _helperText(field?.value?.length)
          }
          {...other}
        />
      )}
    />
  );
}
