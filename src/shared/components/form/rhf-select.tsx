import { Controller, useFormContext } from "react-hook-form";

import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox";
import Chip, { type ChipProps } from "@mui/material/Chip";
import type { FormControlProps } from "@mui/material/FormControl";
import FormControl from "@mui/material/FormControl";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import Select, { type SelectProps } from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import type { TextFieldProps } from "@mui/material/TextField";

//------------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
};

export const RHFSelect = ({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  ...other
}: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          onChange={(e) => {
            field.onChange(e); // ✅ 반드시 호출!
            other?.onChange?.(e);
          }}
          value={field.value ?? ""}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    maxHeight:
                      typeof maxHeight === "number" ? maxHeight : "unset",
                  }),
                  ...PaperPropsSx,
                },
              },
            },
            sx: { textTransform: "capitalize" },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
        >
          {children}
        </TextField>
      )}
    />
  );
};

//------------------------------------------------------------------------

type RHFSelectOptionProps = {
  value: string;
  label?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<any>;

RHFSelect.Option = function RHFSelectOption({
  value,
  label,
  as: Component = MenuItem,
  children,
  ...props
}: RHFSelectOptionProps) {
  return (
    <Component value={value} {...props}>
      {children ?? label}
    </Component>
  );
};

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  slotProps?: {
    chip?: ChipProps;
    select: SelectProps;
    checkbox?: CheckboxProps;
    inputLabel?: InputLabelProps;
    formHelperText?: FormHelperTextProps;
  };
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  slotProps,
  helperText,
  onChange,
  ...other
}: RHFMultiSelectProps) {
  const { control, setValue } = useFormContext();

  const labelId = `${name}-select-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} {...other}>
          {label && (
            <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
              {label}
            </InputLabel>
          )}

          <Select
            {...field}
            onChange={
              field.value instanceof Array
                ? field.onChange
                : (e) => {
                    setValue(name, e.target.value);
                    slotProps?.select?.onChange?.(e, null);
                  }
            }
            multiple={field.value instanceof Array}
            displayEmpty={!!placeholder}
            label={label}
            renderValue={(selected) => {
              const selectedItems = options.filter((item) =>
                (selected as string[]).includes(item.value)
              );

              if (!selectedItems.length && placeholder) {
                return <Box sx={{ color: "text.disabled" }}>{placeholder}</Box>;
              }

              if (chip) {
                return (
                  <Box sx={{ gap: 0.5, display: "flex", flexWrap: "wrap" }}>
                    {selectedItems.map((item) => (
                      <Chip
                        key={item.value}
                        size="small"
                        // variant="soft"
                        label={item.label}
                        {...slotProps?.chip}
                      />
                    ))}
                  </Box>
                );
              }

              return selectedItems.map((item) => item.label).join(", ");
            }}
            {...slotProps?.select}
            inputProps={{ id: labelId, ...slotProps?.select?.inputProps }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {checkbox && (
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={
                      typeof field.value === "string"
                        ? field.value === option.value
                        : field.value.includes(option.value)
                    }
                    {...slotProps?.checkbox}
                  />
                )}

                {option.label}
              </MenuItem>
            ))}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} {...slotProps?.formHelperText}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
