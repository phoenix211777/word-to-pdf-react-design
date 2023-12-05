import * as React from 'react';

import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------
type Props = {
    STATUS_OPTIONS: Array<string>;
};

export default function WordEditorSelect({ STATUS_OPTIONS }: Props) {
  const { translate } = useLocales();


  return (
    <select className='select-bar'>
        {STATUS_OPTIONS.map((item, index) => 
        <option key={index}>{item}</option>
        )}
    </select>
  );
}
