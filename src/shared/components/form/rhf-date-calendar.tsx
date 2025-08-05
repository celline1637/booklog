import { Controller, useFormContext } from 'react-hook-form';

import { DateCalendar } from '@mui/x-date-pickers';

type RHFDateCalendarProps = {
  name: string;
  onChange?: (date: Date | null) => void;
};

const RHFDateCalendar = ({ name, onChange }: RHFDateCalendarProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateCalendar
          {...field}
          onChange={(date) => {
            onChange?.(date);
            field.onChange(date);
          }}
        />
      )}
    />
  );
};

export default RHFDateCalendar;
