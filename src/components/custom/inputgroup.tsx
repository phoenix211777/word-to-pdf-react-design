import { Card, Switch } from '@mui/material';
import LanguagePopover from 'src/layouts/dashboard/header/LanguagePopover';
import Image from '../Image';

export default function () {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 0,
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'transparent',
        border: '1px solid #d2d2d2',
      }}
    >
      <LanguagePopover />
      <input
        type="text"
        className="generateinput"
        placeholder="Name of the generated book"
        style={{
          margin: '0 40px',
          flexGrow: 8,
        }}
      />
      <input
        type="date"
        style={{
          margin: '0 10px',
        }}
        className="generateinput"
      />
      <Switch
        sx={{
          margin: '0 110px',
          padding: '0 0px',
        }}
        // {...field}
        // checked={field.value !== 'active'}
        // onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
      />
      <Image src="/assets/icons/image 36.png" sx={{ width: 60, height: 60 }} />
    </Card>
  );
}
