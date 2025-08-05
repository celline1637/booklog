import { useController, type Control } from "react-hook-form";

export const RHFCommaSeparatedInput = ({
  name,
  control,
}: {
  name: string;
  control: Control<any>;
}) => {
  const { field } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replaceAll(",", "");
    if (!/^\d*$/.test(rawValue)) return;
    field.onChange(Number(rawValue));
  };

  return (
    <input
      value={field.value?.toLocaleString() ?? ""}
      onChange={handleChange}
      ref={field.ref}
    />
  );
};
