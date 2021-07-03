import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../../../../components/Layout/Layout';
import { CallToAction } from '../../../../components/Page/callToAction';
import { PageHeaderStyle } from '../../../../components/Page/HeaderPageStyle';
import { ShadowBtn } from '../../../../components/Page/PageButtons';
import { PageControls } from '../../../../components/Page/PageControls';
import { Input } from '../../../../components/Page/PageInput';
import {
  ColumnSection,
  Container,
  H2,
} from '../../../../components/Page/PageStyledElements';
import { PageTitle } from '../../../../components/Page/PageTitle';
import { Textposition } from '../../../../components/Page/TextPosition';
import { FiscalYear } from '../../../../components/Performance/FiscalYear';
import {
  GET_ALL_ITEMS_QUERY,
  GET_ALL_MEDIA,
  GET_SITE_MENUITEMS,
} from '../../../../graphql';
import { performanceValidator } from '../../../../helpers/performanceValidator';
import { performanceUseForm } from '../../../../hooks/performance.hooks';
import { createApolloClient } from '../../../../lib/apollo';

const create = ({ token, menuItems, items, medias }) => {
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
  } = performanceUseForm(performanceValidator, client, { type: 'add' });

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

  const setDate = (date: any, name: string) => {
    setState({
      ...state,
      [name]: date?.toISOString(),
    });
  };

  const getQuarters = (data) => {
    setState({
      ...state,
      quarters: [...data],
    });
  };

  return (
    <Layout>
      <Container>
        <PageControls
          onSubmit={handleSubmit}
          title="Add a new performance page"
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
          medias={medias.error ? [] : medias}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
          errors={errors}
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
        <div className="mt-9">
          <H2>NASDAQ ID</H2>
          <Input
            className="py-4 mt-3 w-96"
            placeholder="Enter ID"
            onChange={handleChange}
            name="nasdaqId"
            value={state.nasdaqId}
          />

          {errors && errors.nasdaqId && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.nasdaqId}
            </span>
          )}
        </div>
        <div className="mt-5">
          <ShadowBtn
            bg="seconary"
            className="py-4 px-10 shadow-sm rounded text-sm font-bold"
          >
            Preview header
          </ShadowBtn>
        </div>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <FiscalYear
          state={state}
          handleChange={handleChange}
          setDate={setDate}
          getQuarters={getQuarters}
          errors={errors}
          items={items.error ? [] : items}
        />
        <ColumnSection className="mt-5 mb-5">
          <div className="mt-5 space-x-3 flex flex-row">
            <ShadowBtn
              bg="primary"
              className="py-4 px-10 shadow-sm rounded text-sm font-bold"
            >
              Add a new quarter
            </ShadowBtn>
            <ShadowBtn
              bg="secondary"
              className="py-4 px-10 shadow-sm rounded text-sm font-bold"
            >
              Save as draft
            </ShadowBtn>
          </div>
        </ColumnSection>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { siteId } = ctx.query;
  const session: Session = getSession(ctx.req, ctx.res);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const client = createApolloClient(session?.idToken);

  let menuItems: any;
  let medias: any;
  let items: any;

  try {
    const { data } = await client.query({
      query: GET_ALL_MEDIA,
      variables: {
        filter: {},
      },
    });

    medias = data.medias ? data.medias : { error: true };
  } catch (error) {
    medias = { error: true };
  }

  try {
    const { data } = await client.query({
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
    menuItems = data.siteMenuItems.header.menuItems
      ? data.siteMenuItems.header.menuItems
      : { error: true };
  } catch (error) {
    menuItems = { error: true };
  }
  try {
    const { data } = await client.query({
      query: GET_ALL_ITEMS_QUERY,
      variables: {
        siteId: siteId,
      },
    });

    items = data.getAllItems ? data.getAllItems : { error: true };
  } catch (error) {
    items = { error: true };
  }
  return {
    props: {
      token: session?.idToken,
      menuItems,
      medias,
      items,
    },
  };
}

export default withPageAuthRequired(create);
