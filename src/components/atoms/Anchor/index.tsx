import React from 'react';

type AnchorProps = {
   href: string;
   title: string;
};

export const Anchor = ({ href, title }: AnchorProps) => (
   <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0"
      title={title}
   />
);
