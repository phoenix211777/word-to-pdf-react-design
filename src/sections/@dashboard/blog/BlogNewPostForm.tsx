import * as Yup from 'yup';
import { useCallback, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Button, IconButton } from '@mui/material';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Chip,
  Switch,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { NewPostFormValues } from '../../../@types/blog';
//components
import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
  RHFSelect,
  RHFUploadAvatar,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import EditorToolbar from 'src/components/editor/EditorToolbar';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import LanguagePopover from 'src/layouts/dashboard/header/LanguagePopover';
import Inputgroup from 'src/components/custom/inputgroup';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const methods = useForm<NewPostFormValues>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async (data: NewPostFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <div className="formgroup">
              <div className="inputitem">
                <LabelStyle>Height</LabelStyle>
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
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="inputitem">
                <LabelStyle>Height</LabelStyle>
                <RHFSelect
                  fullWidth
                  name="width"
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
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="inputitem flexgrow">
                <LabelStyle>Type of book</LabelStyle>
                <RHFSelect
                  fullWidth
                  name="width"
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
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="inputitem flexgrow">
                <LabelStyle>Font type</LabelStyle>
                <RHFSelect
                  fullWidth
                  name="width"
                  label=""
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  sx={{ height: 40, boxSizing: 'border-box' }}
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
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="inputitem">
                <LabelStyle>Font size</LabelStyle>
                <RHFSelect
                  fullWidth
                  name="width"
                  label=""
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  sx={{ height: 40 }}
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
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="inputitem">
                <LabelStyle> &nbsp;</LabelStyle>
                <Button
                  sx={{
                    width: 194,
                    p: 2,
                    height: 40,
                    backgroundColor: 'white',
                    color: 'black',
                    boxShadow: 'none',
                    border: '1px solid #d2d2d2',
                  }}
                  variant="contained"
                >
                  <Image
                    src="/assets/icons/header/upload-two.svg"
                    sx={{ mr: 1, boxShadow: 'none' }}
                  />
                  Upload Word file.
                </Button>
              </div>
              <div className="inputitem">
                <LabelStyle> &nbsp;</LabelStyle>
                <Button variant="contained">Load Editor</Button>
              </div>
            </div>
            <RHFEditor simple name="content" />
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '65px',
                mt: 3,
                mb: 3,
                backgroundColor: '#b7190f',
                borderRadius: '4px',
              }}
            >
              <span className="startpdf">Start generate PDF</span>
              <img src="/assets/button.png" className="imgbutton" />
            </Button>
            <h1 className="dropheader"> Generate pdf's</h1>
            <Inputgroup />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <h1> Create your e-books</h1>
                <Image src="/assets/images/book.png" sx={{ width: 450 }} />
              </div>
              <div
                className="dropwrapper"
                style={{
                  flexGrow: 10,
                  minWidth: 300,
                  padding: '20px, 140px, 60px, 20px !important',
                }}
              >
                <LabelStyle>Upload your book file</LabelStyle>
                <RHFUploadSingleFile
                  name="cover"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
                <Button
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
                  variant="contained"
                >
                  your-file-here.PDF
                </Button>
                <LabelStyle>Upload your cover</LabelStyle>
                <RHFUploadSingleFile
                  name="cover"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </div>
            </div>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '65px',
                mt: 3,
                mb: 3,
                backgroundColor: '#b7190f',
                borderRadius: '4px',
              }}
            >
              <span className="startpdf">GENERATE E- BOOK</span>
            </Button>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile
                    name="cover"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
