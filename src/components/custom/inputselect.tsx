import useLocales from 'src/hooks/useLocales';
import { RHFSelect } from '../hook-form';
import { MenuItem } from '@mui/material';

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

type Props = {
  STATUS_OPTIONS: Array<string>;
};

export default function InputSelect({ STATUS_OPTIONS }: Props) {
  const { translate } = useLocales();

  return (
    <RHFSelect
      fullWidth
      name="height"
      label=""
      InputLabelProps={{ shrink: true }}
      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
    >
      {STATUS_OPTIONS.map((option) => (
        <MenuItem
          key={option}
          value={option}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {translate(option)}
        </MenuItem>
      ))}
    </RHFSelect>
  );
}
