import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

// import { Hero } from '../../../../components/Hero/Hero';
import Layout from '../../../../components/Layout/Layout';
import { CallToAction } from '../../../../components/Page/CallToAction';
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
import { GET_ALL_MEDIA, GET_SITE_MENUITEMS } from '../../../../graphql';
import { performanceValidator } from '../../../../helpers/performanceValidator';
import { performanceUseForm } from '../../../../hooks/performance.hooks';
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

  const setDate = (date, name) => {
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
        <div className="mt-9">
          <H2>NASDAQ ID</H2>
          {/* <div style={{ width: '' }}> */}
          <Input
            className="py-4 mt-3 w-96"
            placeholder="Enter ID"
            onChange={handleChange}
            name="nasdaqId"
            value={state.nasdaqId}
          />
          {/* </div> */}

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
        />

        {/* <div className="mt-5 mb-5">
          <Hero
            mediaUrl={state.mediaUrl}
            actionText={state.actionText}
            heading={state.pageTitle}
            location={state.location}
            hasAction={state.hasAction}
            caption={state.captionText}
            type={state.headerType}
          />
        </div> */}
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
