import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../../../../../components/Layout/Layout';
import { CallToAction } from '../../../../../components/Page/Create/CallToAction';
import { CreateWidget } from '../../../../../components/Page/Create/CreateWidget';
import { ShadowBtn } from '../../../../../components/Page/Create/PageButtons';
import { PageControls } from '../../../../../components/Page/Create/PageControls';
import { PageHeaderStyle } from '../../../../../components/Page/Create/PageHeaderStyle';
import { PagePosts } from '../../../../../components/Page/Create/PagePosts';
import {
  ColumnSection,
  Container,
} from '../../../../../components/Page/Create/pageStyledElements';
import { PageTitle } from '../../../../../components/Page/Create/PageTitle';
import { Textposition } from '../../../../../components/Page/Create/TextPosition';
import {
  GET_ALL_ITEMS_QUERY,
  GET_SITE_MENUITEMS,
  PAGE_QUERY,
} from '../../../../../graphql';
import { validator } from '../../../../../helpers/validator';
import useForm from '../../../../../hooks/useForm';
import { createApolloClient } from '../../../../../lib/apollo';

const edit = ({ token, menuItems, page, items }) => {
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

  return (
    <Layout>
      <Container>
        <PageControls onSubmit={handleSubmit} title="Edit page" />
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
        <hr className="border-gray-400 border-5 w-full mt-8" />

        <CreateWidget client={client} pageId={pageId} items={items} />

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
  const client = createApolloClient('');
  const session: Session = getSession(ctx.req, ctx.res);

  try {
    const {
      data: { page },
    } = await client.query({
      query: PAGE_QUERY,
      variables: {
        filter: {
          combinedFilter: {
            logicalOperator: 'OR',
            filters: [
              {
                singleFilter: {
                  field: '_id',
                  operator: 'EQ',
                  value: pageId,
                },
              },
              {
                singleFilter: {
                  field: 'site',
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
      data: { getAllItems },
    } = await client.query({
      query: GET_ALL_ITEMS_QUERY,
      variables: {
        siteId: siteId,
        filter: {
          singleFilter: {
            field: 'pageId',
            operator: 'EQ',
            value: page.id,
          },
        },
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

    return {
      props: {
        page,
        token: session.idToken,
        items: getAllItems,
        menuItems,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

export default withPageAuthRequired(edit);
