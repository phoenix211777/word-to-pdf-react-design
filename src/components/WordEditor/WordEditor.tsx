// @mui
// import { Box, Typography, Stack } from '@mui/material';
// // assets
// import { UploadIllustration } from '../../assets';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MenuItem, Button, IconButton,Typography } from '@mui/material';
import Image from 'src/components/Image';
import { DocumentEditorContainerComponent, Toolbar, ImageFormat } from '@syncfusion/ej2-react-documenteditor';
// import { TitleBar } from './title-bar';
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';
import { WordEditorSelect } from 'src/components/WordEditorSelect';
import { styled } from '@mui/material/styles';

import './index.css';

import useLocales from 'src/hooks/useLocales';
import { setWith } from 'lodash';

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


DocumentEditorContainerComponent.Inject(Toolbar);
// ----------------------------------------------------------------------

export default function WordEditor() {
  let hostUrl = "https://services.syncfusion.com/react/production/api/documenteditor/";
  const { translate } = useLocales();
  const [ width, setWidth ] = useState(210);
  const [ height, setHeight ] = useState(297);
  const [ fontSize, setFontSize ] = useState(11);

  let container: DocumentEditorContainerComponent;
  let contentChanged:boolean=false;

  const  downloadPdf = () => {
    let obj = container;
    let pdfdocument: PdfDocument = new PdfDocument();
    let count: number = obj.documentEditor.pageCount;
    obj.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    let loadedPage = 0;
    console.log("======= page count ======", count);

    const exportPageAsImage = async (pageIndex:number) => {
        // ... (rest of your image exporting logic)
        let format: ImageFormat = 'image/jpeg' as ImageFormat;
        // Getting pages as image
        let image = obj.documentEditor.exportAsImage(pageIndex, format);

        image.onload = function() {
          // ... (rest of your onload logic)
          let imageHeight = parseInt(
            image.style.height.toString().replace('px', '')
          );
          let imageWidth = parseInt(
            image.style.width.toString().replace('px', '')
          );
          let section: PdfSection = pdfdocument.sections.add() as PdfSection;
          let settings: PdfPageSettings = new PdfPageSettings(0);
          if (imageWidth > imageHeight) {
            settings.orientation = PdfPageOrientation.Landscape;
          }
          settings.size = new SizeF(imageWidth, imageHeight);
          (section as PdfSection).setPageSettings(settings);
          let page = section.pages.add();
          let graphics = page.graphics;
          let imageStr = image.src.replace('data:image/jpeg;base64,', '');
          let pdfImage = new PdfBitmap(imageStr);
          graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);

          loadedPage++;
          console.log("======= page number ======", loadedPage);
          if (loadedPage == count) {
            console.log("====== hahaha =======",obj.documentEditor.documentName );
            pdfdocument.save(
              (obj.documentEditor.documentName === ''
                ? 'sample'
                : obj.documentEditor.documentName) + '.pdf'
            );
          }
        }; // Delay based on page index ensures pages are processed in order
    };

    for (let i = 1; i <= count; i++) {
      exportPageAsImage(i);
    }
  }

  const handleFileChange = () => {
    const container_toolbar_open = document.getElementById("container_toolbar_open");
    container_toolbar_open?.click();
  };
  const loadEditor = () => {
    
    var defaultCharacterFormat = {        
      fontSize,
      fontFamily: 'Arial'
    };

    container.documentEditor.selection.selectAll();
    let baselineAlignment : string = container.documentEditor.selection.characterFormat.fontFamily;
    
    container.documentEditor.selection.sectionFormat.pageWidth = Math.round(width * 3.7795275591);
    container.documentEditor.selection.sectionFormat.pageHeight = Math.round(height * 3.7795275591);
    container.documentEditor.selection.characterFormat.fontFamily= 'Garamond';
    container.documentEditor.selection.characterFormat.fontSize= Math.round(fontSize);

  }


  return (
    <>
      <div className="formgroup">
          <div className="inputitem">
            <LabelStyle sx={{ marginTop: '5px' }}>{translate('Width / MM')}</LabelStyle>
            <input className='select-bar' type='number' value={width} onChange={(e)=>{setWidth(Number(e.target.value))}} />
            {/* <WordEditorSelect STATUS_OPTIONS={HEIGHT_OPTIONS} /> */}
          </div>
          <div className="inputitem">
            <LabelStyle sx={{ marginTop: '5px' }}>{translate('Height / MM')}</LabelStyle>
            <input className='select-bar' type='number' value={height}  onChange={(e)=>{setHeight(Number(e.target.value))}}/>
            {/* <WordEditorSelect STATUS_OPTIONS={WIDTH_OPTIONS} /> */}
          </div>
          <div className="inputitem flexgrow">
            <LabelStyle sx={{ marginTop: '5px' }}>{translate('Type of book')}</LabelStyle>
            <WordEditorSelect STATUS_OPTIONS={TYPE_OF_BOOK_OPTIONS} />
          </div>
          <div className="inputitem flexgrow">
            <LabelStyle sx={{ marginTop: '5px' }}>{translate('Font type')}</LabelStyle>
            <WordEditorSelect STATUS_OPTIONS={FONT_TYPE_OPTIONS} />
          </div>
          <div className="inputitem">
            <LabelStyle sx={{ marginTop: '5px' }}>{translate('Font_size')} </LabelStyle>
            <input className='select-bar' type='number' value={fontSize}  onChange={(e)=>{setFontSize(Number(e.target.value))}}/>
            {/* <WordEditorSelect STATUS_OPTIONS={FONT_SIZE_OPTIONS} /> */}
          </div>
          <div className="inputitem">
            <LabelStyle sx={{ marginTop: '5px' }}> &nbsp;</LabelStyle>
            <Button
              sx={{
                width: 194,
                height: 40,
                backgroundColor: 'white',
                color: 'black',
                boxShadow: 'none',
                border: '1px solid #d2d2d2',
              }}
              variant="contained"
              onClick={handleFileChange}
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
            <Button variant="contained" onClick={loadEditor}>{translate('load_editor')}</Button>
          </div>
        </div>
        <div className="control-pane">
          <div className="control-section">
              <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
              <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => {container = scope!; }}
                  height={'590px'}
                  serviceUrl={hostUrl}
                  enableToolbar={true}
                  // created={onCreate}
                />
                  {/* <DocumentEditorContainerComponent id="container"  style={{ display: "block" }} height={"590px"} serviceUrl={hostUrl} enableToolbar={true} locale="en-US"/> */}
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
            onClick={downloadPdf}
          >
            <span className="startpdf">{translate('start_generate_pdf')}</span>
            <img src="/assets/button.png" className="imgbutton" />
          </Button>
      </div>
    </>
    
  );
}
