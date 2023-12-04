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
import Inputgroup from 'src/components/custom/newFile';
import ProcessBtn from 'src/components/custom/processbtn';
import InputSelect from 'src/components/custom/inputselect';
import useLocales from 'src/hooks/useLocales';

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

const WIDTH_OPTIONS = ['125 mm', '78 mm', '50mm', '32 mm'];
const HEIGHT_OPTIONS = ['200 mm', '125 mm', '78 mm', '50 mm'];
const TYPE_OF_BOOK_OPTIONS = ['paperback', 'letter', 'overdue', 'draft'];
const FONT_TYPE_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];
const FONT_SIZE_OPTIONS = ['12', '14', '16', '18'];

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

  const { translate } = useLocales();

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <div className="formgroup">
              <div className="inputitem">
                <LabelStyle sx={{ marginTop: '5px' }}>{translate('height')}</LabelStyle>
                <InputSelect STATUS_OPTIONS={HEIGHT_OPTIONS} />
              </div>
              <div className="inputitem">
                <LabelStyle sx={{ marginTop: '5px' }}>{translate('width')}</LabelStyle>
                <InputSelect STATUS_OPTIONS={WIDTH_OPTIONS} />
              </div>
              <div className="inputitem flexgrow">
                <LabelStyle sx={{ marginTop: '5px' }}>{translate('type_of_book')}</LabelStyle>
                <InputSelect STATUS_OPTIONS={TYPE_OF_BOOK_OPTIONS} />
              </div>
              <div className="inputitem flexgrow">
                <LabelStyle sx={{ marginTop: '5px' }}>{translate('font_type')}</LabelStyle>
                <InputSelect STATUS_OPTIONS={FONT_TYPE_OPTIONS} />
              </div>
              <div className="inputitem">
                <LabelStyle sx={{ marginTop: '5px' }}>{translate('font_size')}</LabelStyle>
                <InputSelect STATUS_OPTIONS={FONT_SIZE_OPTIONS} />
              </div>
              <div className="inputitem">
                <LabelStyle sx={{ marginTop: '5px' }}> &nbsp;</LabelStyle>
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
                  {translate('upload_word_file')}
                </Button>
              </div>
              <div className="inputitem">
                <LabelStyle sx={{ marginTop: '5px' }}> &nbsp;</LabelStyle>
                <Button variant="contained">{translate('load_editor')}</Button>
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
              <span className="startpdf">{translate('start_generate_pdf')}</span>
              <img src="/assets/button.png" className="imgbutton" />
            </Button>
            <h1 className="dropheader"> {translate('generate_pdf_s')}</h1>
            <Inputgroup title={true} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <h1 className="dropheader">{translate('create_your_e_book')}</h1>
                <Image src="/assets/images/book.png" className="PDFimg" sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} md={6} lg={7} sx={{ padding: '110px 0px 0px 70px !important' }}>
                <LabelStyle
                  sx={{
                    color: '#676767',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    marginBottom: '10px',
                  }}
                >
                  {translate('upload_your_book_file')}
                </LabelStyle>
                <RHFUploadSingleFile
                  name="cover"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
                <ProcessBtn process={60} />
                <LabelStyle
                  sx={{
                    color: '#676767',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    marginBottom: '10px',
                  }}
                >
                  {translate('upload_your_cover')}
                </LabelStyle>
                <RHFUploadSingleFile
                  name="cover"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
                <ProcessBtn process={60} />
              </Grid>
            </Grid>
            <Inputgroup title={false} />
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
              <span className="startpdf">{translate('generate_e_book')}</span>
            </Button>
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
