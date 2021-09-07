import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { Items } from '../../../../../classes/Items';
import { MediaClass } from '../../../../../classes/media';
import { Pages } from '../../../../../classes/Page';
import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
  UpdateMenuitemInput,
  UpdatePageInput,
} from '../../../../../classes/schema';
import { Site } from '../../../../../classes/Site';
import { User } from '../../../../../classes/User';
import { FormInput } from '../../../../../components/FormInput/formInput';
import FormSelect from '../../../../../components/FormSelect/VcaSelect';
import Layout from '../../../../../components/Layout/Layout';
import AddEditHero from '../../../../../components/Page/Add&EditHerro';
import { Btn, ShadowBtn } from '../../../../../components/Page/PageButtons';
import { PageItems } from '../../../../../components/Page/PageItems';
import {
  ColumnSection,
  Container,
  FormGroup,
  H1,
  RowSection,
} from '../../../../../components/Page/PageStyledElements';
import { CreateWidget } from '../../../../../components/Widget/CreateWidget';
import useUnsavedChangesWarning from '../../../../../hooks/useUnsavedChangesWarning';

const edit = ({
  token,
  profile,
  page,
  menuItems,
  items,
  existingWidget,
  pageItems,
}) => {
  const router = useRouter();
  const [working, setWorking] = useState(false);
  const _thisPage = new Pages(token);
  const _thisSite = new Site(token);
  const [selectedMenu, setSelectedMenu] = useState(page.menuItem);
  const [hero, setHeroDetails] = useState(undefined);
  const { addToast } = useToasts();
  const setOtherDetails = (data: any) => {
    setHeroDetails({ ...hero, ...data });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<UpdatePageInput>({
    defaultValues: {
      name: page.name,
      menuItem: page.menuItem,
      hero: {
        actionSlug: page.hero.actionSlug,
        actionText: page.hero.actionText,
        hasAction: page.hero.hasAction,
        caption: page.hero.caption,
        heading: page.hero.heading,
      },
    },
  });
  const {
    query: { siteId, id: pageId },
  } = useRouter();

  const refreshData = () => {
    console.error('refreshed');
    router.replace(router.asPath);
  };

  const onSubmit = async (data: any) => {
    hero && hero.location ? (data.hero.location = hero.location) : null;
    hero && hero.hasAction ? (data.hero.hasAction = hero.hasAction) : null;
    data.menuItem = selectedMenu;
    await updatePage(data);
  };

  const updateMenuItem = async () => {
    const data = { type: 'PAGE' };
    try {
      const result = await await _thisSite.updateMenuItem({
        input: data as unknown as UpdateMenuitemInput,
        menuId: selectedMenu,
      });
      if (!result.status) {
        addToast('An Error Occurred', { appearance: 'error' });
        return;
      }
      return;
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
    }
  };

  const updatePage = async (data: any) => {
    hero && hero.media ? (data.hero.media = hero.media) : null;
    setWorking(true);
    try {
      const result = await _thisPage.updatePage({
        input: data as unknown as UpdatePageInput,
        pageId: pageId as unknown as string,
      });
      if (!result.status) {
        console.error(result);
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        setWorking(false);
        return;
      }
      addToast('Your Page has been updated successfully', {
        appearance: 'success',
      });
      await updateMenuItem();
      setWorking(false);
      router.push(`/sites/${siteId}/pages`);
      return;
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      setWorking(false);
    }
    console.error(data);
  };

  useUnsavedChangesWarning(isDirty);

  return (
    <Layout profile={profile}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <RowSection className="justify-between">
            <H1>Edit Page</H1>
            <div className="flex flex-row justify-start space-x-5">
              <Link href={`/sites/${siteId}/pages`}>
                <Btn color="primary" $bg="secondary" $px="sm">
                  {' '}
                  Cancel
                </Btn>
              </Link>
              <Btn color="secondary" $bg="primary" $px="lg" type="submit">
                {working ? 'Saving' : 'Save & Publish'}
              </Btn>
            </div>
          </RowSection>
          <RowSection className="space-x-7 mt-10">
            <FormGroup className="">
              <FormInput
                name="name"
                label="Page Title"
                register={register}
                error={errors.name}
                required={true}
              />
            </FormGroup>
            <FormSelect
              defaultOption={{
                id: 0,
                name: menuItems.filter((item) => item.id == selectedMenu)[0]
                  .name,
                value: menuItems.filter((item) => item.id == selectedMenu)[0]
                  .id,
                unavailable: false,
              }}
              onChange={(data) => setSelectedMenu(data.value)}
              label="Add menu to page"
              options={menuItems.map(
                (item, index) => {
                  return {
                    value: item.id as unknown as string,
                    name: item.name as unknown as string,
                    id: index,
                    unavailable: false,
                  };
                },
                ...[
                  {
                    id: 0,
                    name: 'None',
                    value: null,
                    unavailable: false,
                  },
                ]
              )}
              error={errors.menuItem}
              errorText={'Add page to menu'}
            />
          </RowSection>
        </form>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <AddEditHero
          setHero={setOtherDetails}
          register={register}
          watch={watch}
          errors={errors}
          existingHero={page.hero}
          token={token}
          profile={profile}
        />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <CreateWidget
          items={items}
          existingWidget={existingWidget ?? []}
          token={token}
          profile={profile}
        />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <PageItems
          existingItems={pageItems}
          refresh={refreshData}
          token={token}
          profile={profile}
        />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id: pageId } = ctx.query;
  const session: Session = getSession(ctx.req, ctx.res);
  const site = new Site(session.idToken);
  const user = new User(session.idToken);
  const item = new Items(session.idToken);
  const media = new MediaClass(session.idToken);
  let medias;
  const _thisPage = new Pages(session.idToken);
  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  let page: any;
  let error;
  let existingWidget;

  const profile = await (await user.getProfile()).data;

  const currentSite = await (
    await site.getSite({
      siteId: ctx.query.siteId as unknown as string,
      accountId: profile.account.id,
    })
  ).data;

  try {
    medias =
      (await (await media.getMedias({ accountId: profile.account.id })).data) ??
      [];
  } catch (error) {
    console.error(error);
  }

  try {
    page = await (
      await _thisPage.getPage({
        accountId: profile.account.id,
        filter: {
          singleFilter: {
            operator: ComparisonOperatorEnum.Eq,
            field: '_id',
            value: pageId,
          },
        },
      })
    ).data;
  } catch (err) {
    console.error(err);
    console.error(err.error.message);

    error = err;
  }

  console.error({ page });

  const items = await (
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
  ).data;

  const pageItems = await (
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
            {
              singleFilter: {
                field: 'pageId',
                operator: ComparisonOperatorEnum.Eq,
                value: pageId,
              },
            },
          ],
        },
      },
    })
  ).data;

  try {
    existingWidget = (
      await _thisPage.getWidget({
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
                  field: 'page',
                  operator: ComparisonOperatorEnum.Eq,
                  value: pageId,
                },
              },
            ],
          },
        },
      })
    ).data;
    console.error(existingWidget);
  } catch (error) {
    console.error(error);
    existingWidget = [];
  }

  return {
    props: {
      page,
      token: session?.idToken,
      menuItems: currentSite.header.menuItems,
      error: error ?? null,
      medias: medias,
      items,
      existingWidget: existingWidget ?? [],
      profile,
      pageItems,
      accountId: profile.account.id,
    },
  };
};

export default withPageAuthRequired(edit);
