import React from 'react';
import useLocales from 'src/hooks/useLocales';

interface Props {
  title: string;
}

export default function HeaderTitle({ title }: Props) {
  const { translate } = useLocales();

  return <div className="headertitlecustom">{translate(title)}</div>;
}
