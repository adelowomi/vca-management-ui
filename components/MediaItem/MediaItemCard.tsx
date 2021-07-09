import * as React from 'react';

import { ContentType } from '../../lib/media/createMedia';
import { DocumentCard } from './DocumentCard';
import { ImageCard } from './ImageCard';
import { VideoCard } from './VideoCard';

export interface MediaItemCardProps {
  media: any;
  link?: string;
}

export const truncate = (message: string, length: number) => {
  return message.length > length
    ? message.substring(0, length) + '...'
    : message;
};

export function MediaItemCard({ media, link }: MediaItemCardProps) {
  switch (media.type) {
    case ContentType.DOCUMENT:
      return <DocumentCard media={media} link={link} />;
    case ContentType.VIDEO:
      return <VideoCard media={media} link={link} />;
    case ContentType.IMAGE:
      return <ImageCard media={media} link={link} />;

    default:
      return <DocumentCard media={media} link={link} />;
  }
}
