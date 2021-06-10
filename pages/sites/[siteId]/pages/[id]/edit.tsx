import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import { Hero } from '../../../../../components/Hero/Hero';
import Layout from '../../../../../components/Layout/Layout';
import { CallToAction } from '../../../../../components/Page/CallToAction';
import { CreateWidget } from '../../../../../components/Page/CreateWidget';
import { PageHeaderStyle } from '../../../../../components/Page/HeaderPageStyle';
import { ShadowBtn } from '../../../../../components/Page/PageButtons';
import { PageControls } from '../../../../../components/Page/PageControls';
import { PagePosts } from '../../../../../components/Page/PagePosts';
import {
  ColumnSection,
  Container,
} from '../../../../../components/Page/PageStyledElements';
import { PageTitle } from '../../../../../components/Page/PageTitle';
import { Textposition } from '../../../../../components/Page/TextPosition';
import {
  GET_ALL_ITEMS_QUERY,
  GET_SITE_MENUITEMS,
  GET_WIDGET,
  PAGE_QUERY,
} from '../../../../../graphql';
import { GET_ALL_MEDIA } from '../../../../../graphql/media.gql';
import { validator } from '../../../../../helpers/validator';
import useForm from '../../../../../hooks/useForm';
import { createApolloClient } from '../../../../../lib/apollo';

const edit = ({ token, menuItems, page, items, error, widget, medias }) => {
  const client = createApolloClient(token);
  const {
    query: { siteId, id: pageId },
  } = useRouter();
  const {
    handleSubmit,
    state,
    errors,
    setState,
    handleChange,
  } = useForm(validator, client, { siteId, pageId, page, type: 'edit' });

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
  if (error) {
    return <div>error: {error}</div>;
  }

  return (
    <Layout>
      <Container>
        <PageControls
          onSubmit={handleSubmit}
          title="Edit page"
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
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <CreateWidget
          client={client}
          pageId={pageId}
          items={items}
          widget={widget}
        />

        <hr className="border-gray-400 border-5 w-full mt-8" />
        <PagePosts items={items} client={client} pageId={pageId} />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <ColumnSection>
          <div className="">
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
  const { siteId, id: pageId } = ctx.query;
  const session: Session = getSession(ctx.req, ctx.res);
  const client = createApolloClient(session?.idToken);

  try {
    const {
      data: { page },
    } = await client.query({
      query: PAGE_QUERY,
      variables: {
        filter: {
          singleFilter: {
            field: '_id',
            operator: 'EQ',
            value: pageId,
          },
        },
      },
    });

    const {
      data: { getAllItems },
    } = await client.query({
      query: GET_ALL_ITEMS_QUERY,
      variables: {
        siteId: siteId,
        filter: {
          singleFilter: {
            field: 'siteId',
            operator: 'EQ',
            value: siteId,
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
      data: { widget },
    } = await client.query({
      query: GET_WIDGET,
      variables: {
        filter: {
          singleFilter: {
            field: 'page',
            operator: 'EQ',
            value: pageId,
          },
        },
      },
    });
    return {
      props: {
        page,
        token: session.idToken,
        items: getAllItems,
        menuItems,
        widget,
        medias,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

export default withPageAuthRequired(edit);
