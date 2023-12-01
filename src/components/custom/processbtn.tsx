import { Button, Card } from '@mui/material';
import Image from '../Image';

export default function ProcessBtn() {
  return (
    <Card
      sx={{
        width: '100%',
        height: 55,
        margin: '24px 0',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        border: '1px solid #d2d2d2',
        textAlign: 'left !important',
      }}
    >
      your-file-here.PDF
      <Button>
        <Image src="/assets/icons/Vector.svg" />
      </Button>
    </Card>
  );
}
