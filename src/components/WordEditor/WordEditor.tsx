// @mui
// import { Box, Typography, Stack } from '@mui/material';
// // assets
// import { UploadIllustration } from '../../assets';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { MenuItem, Button, IconButton } from '@mui/material';

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

import './index.css';

import useLocales from 'src/hooks/useLocales';


DocumentEditorContainerComponent.Inject(Toolbar);
// ----------------------------------------------------------------------

export default function WordEditor() {
  let hostUrl = "https://services.syncfusion.com/react/production/api/documenteditor/";
  const { translate } = useLocales();

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

  return (
    <div className="control-pane">
        <div className="control-section">
            <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
              <DocumentEditorContainerComponent id="container" ref={(scope) => {container = scope!; }}
                height={'590px'}
                serviceUrl={hostUrl}
                enableToolbar={true}
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
  );
}
