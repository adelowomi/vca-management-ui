import * as React from 'react';

import { ContentType } from '../../lib/media/createMedia';
import { DocumentCard } from './DocumentCard';
import { ImageCard } from './ImageCard';
import { VideoCard } from './VideoCard';

export interface MediaItemCardProps {
  media: any;
}

export const truncate = (message: string, length: number) => {
  return message.length > length
    ? message.substring(0, length) + '...'
    : message;
};

export function MediaItemCard({ media }: MediaItemCardProps) {
  switch (media.type) {
    case ContentType.DOCUMENT:
      return <DocumentCard media={media} />;
    case ContentType.VIDEO:
      return <VideoCard media={media} />;
    case ContentType.IMAGE:
      return <ImageCard media={media} />;

    default:
      return <DocumentCard media={media} />;
  }
}
