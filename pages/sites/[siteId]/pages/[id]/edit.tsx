import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import { Hero } from '../../../../../components/Hero/Hero';
import Layout from '../../../../../components/Layout/Layout';
import { CreateWidget } from '../../../../../components/Page/CreateWidget';
import { CallToAction } from '../../../../../components/Page/CtaComponent';
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
  GET_ALL_MEDIA,
  GET_SITE_MENUITEMS,
  GET_WIDGET,
  PAGE_QUERY,
} from '../../../../../graphql';
import { validator } from '../../../../../helpers/validator';
import useForm from '../../../../../hooks/useForm';
import { createApolloClient } from '../../../../../lib/apollo';

const edit = ({ token, menuItems, page, items, widget, medias, pageItems }) => {
  const client = createApolloClient(token);
  const {
    query: { siteId, id: pageId },
  } = useRouter();
  const { handleSubmit, state, errors, setState, handleChange } = useForm(
    validator,
    client,
    { siteId, pageId, page, type: 'edit' }
  );

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
          title="Edit page"
          siteId={siteId}
        />
        <PageTitle
          pageTitle={state.pageTitle}
          handleChange={handleChange}
          errors={errors}
          menuItem={state.menuItem}
          options={menuItems.error ? [] : menuItems}
        />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <PageHeaderStyle
          onButtonClick={onButtonClick}
          headerType={state.headerType}
          medias={medias ? medias : []}
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
        <div className="mt-5 mb-5">
          <Hero
            mediaUrl={state.mediaUrl}
            actionText={state.actionText}
            heading={state.headerText}
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
          items={items.error ? [] : items}
          widget={widget}
        />

        <hr className="border-gray-400 border-5 w-full mt-8" />
        <PagePosts
          items={items.error ? [] : items}
          client={client}
          pageId={pageId}
          pageItems={pageItems.error ? [] : pageItems}
        />
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
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const client = createApolloClient(session?.idToken);

  let page: any;
  let menuItems: any;
  let medias: any;
  let widget: any;
  let items: any;
  let pageItems: any;

  try {
    const { data } = await client.query({
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

    page = data.page ? data.page : { error: true };
  } catch (error) {
    page = { error: true };
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

  try {
    const { data } = await client.query({
      query: GET_ALL_ITEMS_QUERY,
      variables: {
        siteId: siteId,
        filter: {
          singleFilter: {
            field: 'pageId',
            operator: 'EQ',
            value: pageId,
          },
        },
      },
    });

    pageItems = data.getAllItems ? data.getAllItems : { error: true };
  } catch (error) {
    pageItems = { error: true };
  }

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
    widget = data.widget ? data.widget : data.widget;
  } catch (error) {
    widget = { error: true };
  }

  return {
    props: {
      page,
      token: session?.idToken,
      items,
      menuItems,
      widget,
      medias,
      pageItems,
    },
  };
}

export default withPageAuthRequired(edit);
