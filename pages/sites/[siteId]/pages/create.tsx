import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import { Hero } from '../../../../components/Hero/Hero';
import Layout from '../../../../components/Layout/Layout';
import { CallToAction } from '../../../../components/Page/Create/CallToAction';
import { ShadowBtn } from '../../../../components/Page/Create/PageButtons';
import { PageControls } from '../../../../components/Page/Create/PageControls';
import { PageHeaderStyle } from '../../../../components/Page/Create/PageHeaderStyle';
import {
  ColumnSection,
  Container,
} from '../../../../components/Page/Create/pageStyledElements';
import { PageTitle } from '../../../../components/Page/Create/PageTitle';
import { Textposition } from '../../../../components/Page/Create/TextPosition';
import { GET_ALL_MEDIA, GET_SITE_MENUITEMS } from '../../../../graphql';
import { validator } from '../../../../helpers/validator';
import useForm from '../../../../hooks/useForm';
import { createApolloClient } from '../../../../lib/apollo';

const create = ({ token, menuItems, medias }) => {
  const client = createApolloClient(token);
  const {
    query: { siteId },
  } = useRouter();

  const {
    handleSubmit,
    state,
    errors,
    setState,
    handleChange,
  } = useForm(validator, client, { siteId, type: 'add' });

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({
      ...state,
      headerType: e.currentTarget.dataset.headertype,
    });
  };

  const locationButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({
      ...state,
      location: e.currentTarget.dataset.textposition,
    });
  };

  return (
    <Layout>
      <Container>
        <PageControls
          onSubmit={handleSubmit}
          title="Add a new page"
          siteId={siteId}
        />
        <PageTitle
          pageTitle={state.pageTitle}
          handleChange={handleChange}
          errors={errors}
          menuItem={state.menuItem}
          options={menuItems}
        />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <PageHeaderStyle
          onButtonClick={onButtonClick}
          headerType={state.headerType}
          medias={medias}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
        />

        <Textposition
          headerText={state.headerText}
          handleChange={handleChange}
          locationButtonClick={locationButtonClick}
          textPosition={state.location}
          captionText={state.captionText}
          errors={errors}
        />

        <CallToAction
          actionText={state.actionText}
          handleChange={handleChange}
          ctaLink={state.ctaLink}
          errors={errors}
          hasAction={state.hasAction}
        />
        <div className="mt-5 mb-5">
          <Hero
            mediaUrl={state.mediaUrl}
            actionText={state.actionText}
            heading={state.pageTitle}
            location={state.location}
            hasAction={state.hasAction}
            caption={state.captionText}
            type={state.headerType}
          />
        </div>
        <ColumnSection>
          <div className="-mt-20">
            <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm font-bold">
              Save as draft
            </ShadowBtn>
          </div>
        </ColumnSection>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  const client = createApolloClient(session?.idToken);

  const {
    data: {
      siteMenuItems: {
        header: { menuItems },
      },
    },
  } = await client.query({
    query: GET_SITE_MENUITEMS,
    variables: {
      filter: {
        combinedFilter: {
          filters: [
            {
              singleFilter: {
                field: 'siteId',
                operator: 'EQ',
                value: ctx.query.siteId,
              },
            },
          ],
        },
      },
    },
  });
  const {
    data: { medias },
  } = await client.query({
    query: GET_ALL_MEDIA,
    variables: {
      filter: {},
    },
  });

  return { props: { token: session?.idToken, menuItems, medias } };
}

export default withPageAuthRequired(create);
