// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';
import Image from '../Image';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

export default function BlockContent() {
  const { translate } = useLocales();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        width: 1,
        textAlign: { xs: 'center', md: 'left' },
        display: 'flex',
        flexDirection: 'column !important',
      }}
    >
      <div>
        <Image src="/assets/icons/Upload icon.svg" sx={{ width: 92, height: 80 }} />
      </div>
      <Box sx={{ p: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontSize: '16px !important', fontWeight: '700 !important', textAlign: 'center' }}
        >
          {translate('drop_or_delect_file_or')} &nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: '#B7190F',
              textDecoration: 'underline',
              fontSize: '16px',
              fontWeight: '700 !important',
            }}
          >
            {translate('browse')}
          </Typography>
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {translate('supported_formates')}: PDF, DOC, DOCX
        </Typography>
      </Box>
    </Stack>
  );
}
