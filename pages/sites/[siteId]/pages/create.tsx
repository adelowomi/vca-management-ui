import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { Pages } from '../../../../classes/Page';
import { UpdateMenuitemInput } from '../../../../classes/schema';
import { Site } from '../../../../classes/Site';
import { User } from '../../../../classes/User';
import { FormInput } from '../../../../components/FormInput/formInput';
import FormSelect from '../../../../components/FormSelect/VcaSelect';
import Layout from '../../../../components/Layout/Layout';
import { AddEditHero } from '../../../../components/Page/Add&EditHerro';
import { Btn, ShadowBtn } from '../../../../components/Page/PageButtons';
import {
  ColumnSection,
  Container,
  FormGroup,
  H1,
  RowSection,
} from '../../../../components/Page/PageStyledElements';
import useUnsavedChangesWarning from '../../../../hooks/useUnsavedChangesWarning';

const create = ({
  token,
  menuItems,
  profile,
}: {
  token: string;
  menuItems: any[];
  medias: any[];
  errorss: any;
  profile: any;
}) => {
  const router = useRouter();
  const {
    query: { siteId },
  } = useRouter();
  const _thisSite = new Site(token);
  const _thisPage = new Pages(token);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [hero, setHeroDetails] = useState(undefined);
  const { addToast } = useToasts();
  const [working, setWorking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm();

  const setOtherDetails = (data: any) => {
    setHeroDetails({ ...hero, ...data });
  };

  const watching = watch();

  const onSubmit = async (data: any) => {
    // console.error({hero});
    data.site = siteId;
    data.tags = ['lifestyle'];
    data.account = profile.account.id;
    data.hero = watching.hero;
    data.hero.media = hero.media;
    data.hero.location = hero.location;
    data.hero.mediaUrl = '/';
    data.hero.type = 'Page';
    data.hero.hasAction = data.hero.actionText ? true : false;
    data.menuItem = selectedMenu;
    console.error({ data });
    await createPage(data);
    return;
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

  useUnsavedChangesWarning(isDirty);

  const createPage = async (data: any) => {
    setWorking(true);
    try {
      const result = await _thisPage.createPage({
        input: data,
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
      addToast('Your Page has been created', { appearance: 'success' });
      setWorking(false);
      await updateMenuItem();
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

  return (
    <Layout profile={profile}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <RowSection className="justify-between">
            <H1>Add New Page</H1>
            <div className="flex flex-row justify-start space-x-5">
              <Btn color="primary" $bg="secondary" $px="sm">
                <Link href={`/sites/${siteId}/pages`}> Cancel</Link>
              </Btn>

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
                name: 'Select menu',
                value: null,
                unavailable: false,
              }}
              onChange={(data) => setSelectedMenu(data.value)}
              label="Add menu to page"
              options={menuItems.map((item, index) => {
                return {
                  value: item.id as unknown as string,
                  name: item.name as unknown as string,
                  id: index,
                  unavailable: false,
                };
              })}
              error={errors.type}
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
          token={token}
          profile={profile}
        />
        <ColumnSection>
          <div className="mt-5">
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

  const user = new User(session.idToken);
  const site = new Site(session.idToken);

  const profile = await (await user.getProfile()).data;

  const currentSite = await (
    await site.getSite({
      siteId: ctx.query.siteId as unknown as string,
      accountId: profile.account.id,
    })
  ).data;

  return {
    props: {
      token: session?.idToken,
      menuItems: currentSite.header.menuItems,
      site: currentSite,
      profile,
    },
  };
}

export default withPageAuthRequired(create);
