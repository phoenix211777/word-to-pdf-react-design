import React from 'react';

interface Props {
  title: string;
}

export default function HeaderTitle({ title }: Props) {
  return <div className="headertitlecustom">{title}</div>;
}
