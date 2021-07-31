import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
  Page,
  SiteView,
  UpdateSiteInput,
} from '../../../classes/schema';
import { Site } from '../../../classes/Site';
import { User } from '../../../classes/User';
import { FormInput } from '../../../components/FormInput/formInput';
import FormSelect from '../../../components/FormSelect/VcaSelect';
import Layout from '../../../components/Layout/Layout';
import { AddMenuItem } from '../../../components/MenuItems/AddMenuItem';
import { MenuItemListItem } from '../../../components/MenuItems/MenuItemListItem';
import { Btn } from '../../../components/Page/PageButtons';
import {
  Container,
  FormGroup,
} from '../../../components/Page/PageStyledElements';
import { GqlErrorResponse } from '../../../errors/GqlError';

//TODO: Implement flow for updating site without page passed

export const Edit = ({
  site,
  error,
  pages,
  token,
}: {
  site: SiteView;
  error: GqlErrorResponse;
  token: any;
  pages: Page[];
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSiteInput>({
    defaultValues: {
      name: site.name,
      page: site.page,
      header: {
        logoUrl: site.header.logoUrl,
      },
    },
  });
  const { addToast } = useToasts();
  const router = useRouter();
  const [newPage, setNewPage] = useState('');
  const [working, setWorking] = useState(false);
  const _thisSite = new Site(token);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const submit = async (data) => {
    setWorking(true);
    newPage ? (data.page = newPage) : null;
    data.page == undefined ? (data.page = '') : null;
    try {
      const result = await _thisSite.updateSite({
        siteId: site.id,
        input: (data as unknown) as UpdateSiteInput,
      });
      if (!result.status) {
        setWorking(false);
        console.error(error);
        addToast('An error occurred', { appearance: 'error' });
        return;
      }
      addToast('Site Updated Successfully', { appearance: 'success' });
      setWorking(false);
      refreshData();
      return;
    } catch (error) {
      console.error(error);
      addToast(error.error.message ? error.error.message :'An error occurred', { appearance: 'error' });
      setWorking(false);
    }
  };

  return (
    <Layout isPAdmin={true}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Edit website settings</h1>
            <div className="flex flex-row justify-start space-x-5">
              <Btn color="primary" $bg="secondary" $px="sm">
                <Link href="/sites"> Cancel</Link>
              </Btn>
              <Btn color="secondary" $bg="primary" $px="lg">
                {working ? 'Saving..' : 'Save Changes'}
              </Btn>
            </div>
          </div>
          <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
            Add the site settings
          </div>

          <div className="grid grid-cols-2  w-form-col">
            <FormGroup className="">
              <FormInput
                name="name"
                label="Site Name"
                register={register}
                error={errors.name}
                required={true}
              />
            </FormGroup>
            <FormGroup className="">
              <FormInput
                name="header.logoUrl"
                label="Logo Url"
                register={register}
                error={errors.header}
                required={true}
              />
            </FormGroup>
            {pages.length < 1 ? (
              <Btn
                color="primary"
                $bg="secondary"
                $px="sm"
                className="mt-3 w-96"
              >
                <Link href={`/sites/${site.id}/pages/create`}>
                  Add a page to your site
                </Link>
              </Btn>
            ) : (
              <FormGroup className="">
                <FormSelect
                  defaultOption={{
                    id: 0,
                    name: pages.filter((p) => p.id == site.page)[0].name,
                    value: pages.filter((p) => p.id == site.page)[0].id,
                    unavailable: false,
                  }}
                  onChange={(data) => setNewPage(data.value)}
                  label="Select page"
                  options={pages.map((page, index) => {
                    return {
                      id: index,
                      name: page.name,
                      value: page.id,
                      unavailable: false,
                    };
                  })}
                  error={errors}
                  errorText={'select a type'}
                />
              </FormGroup>
            )}
          </div>
        </form>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <AddMenuItem token={token} siteId={site.id} reload={refreshData} />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
          Added Items
        </div>
        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle  min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="" style={{ background: '#F2F2F2' }}>
                    <tr className="text-left text-gray-500 text-sm font-light">
                      <th
                        scope="col"
                        className="px-6 tracking-wider font-light py-4"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="h-5 w-6"
                        />
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6  tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {site.header.menuItems.map((item, index) => {
                      return (
                        <MenuItemListItem
                          key={index}
                          item={item}
                          siteId={site.id}
                          token={token}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const site = new Site(session.idToken);
  const token = session.idToken;

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const profile = await (await user.getProfile()).data;

  try {
    const data = await (
      await site.getSite({
        accountId: profile.account.id,
        siteId: (ctx.query.siteId as unknown) as string,
      })
    ).data;
    const pages = await (
      await site.getAllPages({
        accountId: profile.account.id,
        filter: {
          combinedFilter: {
            logicalOperator: LogicalOperatorEnum.And,
            filters: [
              {
                singleFilter: {
                  field: 'site',
                  operator: ComparisonOperatorEnum.Eq,
                  value: data.id,
                },
              },
            ],
          },
        },
      })
    ).data;
    return {
      props: {
        site: data,
        error: null,
        user: session.user,
        token,
        pages,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        site: {},
        error: GqlErrorResponse(error),
        user: session.user,
        token,
        pages: [],
      },
    };
  }
};

export default Edit;
