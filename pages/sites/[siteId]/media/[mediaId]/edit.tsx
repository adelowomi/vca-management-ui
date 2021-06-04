import * as React from 'react';

export default function EditMedia({ id }) {
  return <div>{`Edit ${id}`}</div>;
}

export function getServerSideProps(ctx) {
  const id = ctx.query.mediaId;
  return {
    props: {
      id,
    },
  };
}
