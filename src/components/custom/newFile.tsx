import { Card, Switch, Button } from '@mui/material';
import LanguagePopover from 'src/layouts/dashboard/header/LanguagePopover';
import Image from '../Image';
import { Props } from './inputgroup';
import useLocales from 'src/hooks/useLocales';

export default function ({ title }: Props) {
  const { translate } = useLocales();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: 0,
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'transparent',
          border: '1px solid #d2d2d2',
          flexGrow: 9,
          minHeight: 92,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LanguagePopover />
          <input
            type="text"
            className="generateinput"
            placeholder={translate('name_of_the_generated_book')}
            style={{
              margin: '0 30px',
              flexGrow: '10',
              width: '300px',
            }}
            maxLength={25}
          />
        </div>
        <input
          type="date"
          style={{
            margin: '0 10px 0 50px',
          }}
          className="generateinput"
        />
        <Switch
          sx={{
            margin: '0 30px 0 70px',
            padding: '0 0px',
          }}
        />
        {title && <Image src="/assets/icons/image 36.png" sx={{ width: 60, height: 60 }} />}
      </Card>
      {!title && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ marginLeft: '15px' }}>
            <Image src="/assets/icons/epub.png" sx={{ width: 84, height: 84 }} />
          </Button>
          <Button>
            <Image
              src="/assets/icons/image 36.png"
              sx={{ width: 60, height: 60, margin: '13px' }}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
