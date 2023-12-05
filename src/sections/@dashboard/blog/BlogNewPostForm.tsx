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
  Input,
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

import { WordEditor } from 'src/components/WordEditor';
import { WordEditorSelect } from 'src/components/WordEditorSelect';

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

const WIDTH_OPTIONS = ['125', '78', '50', '32'];
const HEIGHT_OPTIONS = ['200', '125', '78', '50'];
const TYPE_OF_BOOK_OPTIONS = ['Paperback Book', 'Hardcover Book', 'E-book'];
const FONT_TYPE_OPTIONS = ['Garamond 11', 'unpaid', 'overdue', 'draft'];
const FONT_SIZE_OPTIONS = ['11', '14', '16', '18'];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loadEditorFlag, setLoadEditorFlag] = useState(false);

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

  const handleFileChange = () => {
    const container_toolbar_open = document.getElementById("container_toolbar_open");
    console.log("======== open click =========")
    container_toolbar_open?.click();
  };

  
  const loadEditor = () => {
    setLoadEditorFlag(true);
    console.log("========");
    // const container_toolbar_page_setup = document.getElementById("container_toolbar_page_setup");
    // container_toolbar_page_setup?.click();
    // const container_toolbar_page_set = document.getElementById("container_toolbar_page_set");
    // container_toolbar_page_set?.click();
    // const tabs =  document.querySelectorAll('[data-id="tabitem_1"]');
    // const paper_tab = tabs[2] as HTMLDivElement;
    // paper_tab.click();

    // let widthInputBox =  document.getElementById("numerictextbox_23") as HTMLInputElement ;
    // let nextWidthInput = widthInputBox.nextElementSibling as HTMLInputElement;
    // let heightInputBox =  document.getElementById("numerictextbox_24") as HTMLInputElement;
    // let nextHeightInput = heightInputBox.nextElementSibling as HTMLInputElement;
    // let applyPaperSize = document.getElementsByClassName("e-layout-ppty-okay");

    // function delay(ms: number): Promise<void> {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    
    // // Usage within an async function
    // async function handleActionWithDelay() {
    //   console.log('Action started...');
      
    //   // Wait for 1 second (1000 milliseconds)
    //   await delay(300);
      
    //   console.log('Action finished after 1 second delay.');
    // }
    
    // // Example call to the async function
    // handleActionWithDelay();
    
    // const width = Math.round(175 * 3.7795275591).toString();
    // const height = Math.round(175 * 3.7795275591).toString();
    // nextWidthInput.value = width;
    // nextHeightInput.value = height;
    // widthInputBox.value = width;
    // heightInputBox.value = height;
  }

  const { translate } = useLocales();

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <WordEditor  />
            {/* <RHFEditor simple name="content" />
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
            </Button> */}
          </Grid>
        </Grid>
      </FormProvider>
      {/* <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
