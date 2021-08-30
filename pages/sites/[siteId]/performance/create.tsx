import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import { Items } from '../../../../classes/Items';
import { MediaClass } from '../../../../classes/media';
import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
} from '../../../../classes/schema';
import { Site } from '../../../../classes/Site';
import { User } from '../../../../classes/User';
import Layout from '../../../../components/Layout/Layout';
import { CallToAction } from '../../../../components/Page/CtaComponent';
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
import { performanceValidator } from '../../../../helpers/performanceValidator';
import { performanceUseForm } from '../../../../hooks/performance.hooks';
import { createApolloClient } from '../../../../lib/apollo';

const create = ({
  token,
  menuItems,
  items,
  medias,
  accountId: account,
  profile,
}) => {
  const client = createApolloClient(token);
  const {
    query: { siteId },
  } = useRouter();


  const { handleSubmit, state, errors, setState, handleChange } =
    performanceUseForm(performanceValidator, client, { type: 'add', account });

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
          token={token}
          profile={profile}
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

        <hr className="border-gray-400 border-5 w-full mt-8" />
        <FiscalYear
          state={state}
          handleChange={handleChange}
          setDate={setDate}
          getQuarters={getQuarters}
          errors={errors}
          items={items.error ? [] : items}
          token={token}
          profile={profile}
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
  // const { siteId } = ctx.query;
  const session: Session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const item = new Items(session.idToken);
  const site = new Site(session.idToken);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const profile = (await user.getProfile()).data;
  const media = new MediaClass(session.idToken);


  let medias: any;
  let items: any;
  const currentSite = await (
    await site.getSite({
      siteId: (ctx.query.siteId as unknown) as string,
      accountId: profile.account.id,
    })
  ).data;

  try {
    const data = (await media.getMedias({ accountId: profile.account.id }))
      .data;
    medias = data;
  } catch (error) {
    medias = { error: true };
  }

  
  try {
    const values = (
      await item.getAllItems({
        accountId: profile.account.id,
        filter: {
          combinedFilter: {
            logicalOperator: LogicalOperatorEnum.And,
            filters: [
              {
                singleFilter: {
                  field: 'account',
                  operator: ComparisonOperatorEnum.Eq,
                  value: profile.account.id,
                },
              },
              {
                singleFilter: {
                  field: 'siteId',
                  operator: ComparisonOperatorEnum.Eq,
                  value: ctx.query.siteId,
                },
              },
            ],
          },
        },
      })
    ).data as any;

    items = values ? values : { error: true };
  } catch (error) {
    items = { error: true };
  }
  return {
    props: {
      token: session?.idToken,
      menuItems:currentSite.header.menuItems.filter(item => item.type == "PERFORMANCE"),
      medias,
      items,
      accountId: profile.account.id,
      profile,
    },
  };
}

export default withPageAuthRequired(create);
