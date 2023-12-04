import { Button, Card } from '@mui/material';
import Image from '../Image';

type Props = {
  process: number;
};

export default function ProcessBtn({ process }: Props) {
  return (
    <Card
      sx={{
        width: '100%',
        height: 55,
        margin: '24px 0',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        lineHeight: '55px',
        boxShadow: 'none',
        border: '1px solid #d2d2d2',
        textAlign: 'left !important',
        display: 'flex !important',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ marginLeft: '15px' }}>your-file-here.PDF</div>
      <Button
        sx={{
          width: '22px !important',
          minWidth: '22px !important',
          height: '22px',
          margin: '16.5px',
          padding: '0px',
          borderRadius: '50%',
        }}
      >
        <Image src="/assets/icons/Vector.svg" />
      </Button>
      <div className="loadingbar" style={{ width: `${process}%` }}></div>
    </Card>
  );
}
