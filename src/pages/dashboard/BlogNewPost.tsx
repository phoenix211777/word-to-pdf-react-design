// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewPostForm } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Post" sx={{ backgroundColor: '#EFF2F4' }}>
      <Container sx={{ maxWidth: '1600px !important', padding: '0 85px 0 50px !important' }}>
        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
