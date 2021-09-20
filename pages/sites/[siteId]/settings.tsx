import { getSession } from '@auth0/nextjs-auth0';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';

import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
  Page,
  Profile,
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
import useUnsavedChangesWarning from '../../../hooks/useUnsavedChangesWarning';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdContentCopy } from 'react-icons/md'

//TODO: Implement flow for updating site without page passed

const schema = yup.object().shape({
  name: yup.string().required('Site Name is required'),
  header: yup.object({
    logoUrl: yup
      .string()
      .required('Please provide a logo url for your site')
      .url('Please enter a valid url'),
  }),
  social: yup.object().shape({
    facebook: yup
      .string()
      .nullable()
      .notRequired()
      .url('Please enter a valid url'),
    twitter: yup
      .string()
      .nullable()
      .notRequired()
      .url('Please enter a valid url'),
    instagram: yup
      .string()
      .nullable()
      .notRequired()
      .url('Please enter a valid url'),
    linkedin: yup
      .string()
      .nullable()
      .notRequired()
      .url('Please enter a valid url'),
  }),
});


export const Edit = ({
  site,
  error,
  pages,
  token,
  profile,
}: {
  site: SiteView;
  error: GqlErrorResponse;
  token: any;
  pages: Page[];
  profile: Profile;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateSiteInput>({
    defaultValues: {
      name: site.name,
      page: site.page,
      header: {
        logoUrl: site.header.logoUrl,
      },
      social: {
        facebook: site.social?.facebook,
        instagram: site.social?.instagram,
        twitter: site.social?.twitter,
        linkedin: site.social?.linkedin,
      },
    },
    resolver: yupResolver(schema)
  });
  const { addToast } = useToasts();
  const router = useRouter();
  const [newPage, setNewPage] = useState('');
  const [working, setWorking] = useState(false);
  const [showSiteId, setShowSiteId] = useState(false)
  const [showAccountId, setShowAccountId] = useState(false)
  const _thisSite = new Site(token);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const submit = async (data) => {
    setWorking(true);
    newPage ? (data.page = newPage) : null;
    data.page == undefined ? (data.page = null) : null;
    try {
      const result = await _thisSite.updateSite({
        siteId: site.id,
        input: data as unknown as UpdateSiteInput,
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
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      setWorking(false);
    }
  };
  useUnsavedChangesWarning(isDirty);

  const copyToBoard = (content: string) => {
    navigator.clipboard.writeText(content)
    addToast('Copied', { appearance: 'success' });
  }

  return (
    <Layout isPAdmin={false} profile={profile}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Edit website settings</h1>
              <div className="flex flex-row justify-start space-x-5">
                <Link href="/sites">
                  <Btn color="primary" $bg="secondary" $px="sm">
                    Cancel
                  </Btn>
                </Link>
                <Btn color="secondary" $bg="primary" $px="lg">
                  {working ? 'Saving..' : 'Save Changes'}
                </Btn>
              </div>
          </div>
          <div className=' flex flex-col mt-4 w-96 p-2 rounded-md'>
              <p>Site Id</p>
            <div className='bg-vca-grey-5 my-1 flex p-1 rounded-md items-center justify-between'>
              <input type={showSiteId ? 'text' : "password"} defaultValue={site.id} className='w-10/12 bg-transparent' style={{background: 'transparent'}} disabled/>
              <div className="flex">
              < MdContentCopy className="mr-2 cursor-pointer text-vca-grey-2" onClick={() => copyToBoard(site.id)}/>
              { showSiteId ? <AiFillEyeInvisible onClick={() => setShowSiteId(!showSiteId)} className='cursor-pointer text-vca-grey-2'/> : <AiFillEye onClick={() => setShowSiteId(!showSiteId)} className='cursor-pointer text-vca-grey-2'/> }
              </div>
            </div>
            <p>Account Id</p>
            <div className='bg-vca-grey-5 my-1 flex p-1 rounded-md items-center justify-between'>
            <input type={showAccountId ? "text" : "password"} defaultValue={profile.account.id} className='w-10/12 bg-blue-200' style={{background: 'transparent'}} disabled/>
            <div className="flex">
            <MdContentCopy className="mr-2 cursor-pointer text-vca-grey-2" onClick={() => copyToBoard(profile.account.id)}/>
            { showAccountId ? <AiFillEyeInvisible onClick={() => setShowAccountId(!showAccountId)} className='cursor-pointer text-vca-grey-2'/> : <AiFillEye onClick={() => setShowAccountId(!showAccountId)} className='cursor-pointer text-vca-grey-2'/> }
            </div>
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
                    name: site.page
                      ? pages.filter((p) => p.id == site.page)[0].name
                      : 'Select a page',
                    value: site.page
                      ? pages.filter((p) => p.id == site.page)[0].id
                      : '0',
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
          <hr className="border-gray-400 border-5 w-full mt-8" />
          <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
            Add site social handles
          </div>
          <div className="grid grid-cols-2  w-form-col">
            <FormGroup className="">
              <FormInput
                name="social.facebook"
                label="Facebook"
                register={register}
                error={errors.social?.facebook}
                required={true}
              />
            </FormGroup>
            <FormGroup className="">
              <FormInput
                name="social.twitter"
                label="Twitter"
                register={register}
                error={errors.social?.twitter}
                required={true}
              />
            </FormGroup>
          </div>
          <div className="grid grid-cols-2  w-form-col">
            <FormGroup className="">
              <FormInput
                name="social.instagram"
                label="Instagram"
                register={register}
                error={errors.social?.instagram}
                required={true}
              />
            </FormGroup>
            <FormGroup className="">
              <FormInput
                name="social.linkedin"
                label="Linkedin"
                register={register}
                error={errors.social?.linkedin}
                required={true}
              />
            </FormGroup>
          </div>
        </form>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <AddMenuItem token={token} siteId={site.id} reload={refreshData} />
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
          Added Items
        </div>
        <div className="flex flex-col mt-5 pb-20">
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
        siteId: ctx.query.siteId as unknown as string,
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
        profile,
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
