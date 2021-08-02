import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  CreateSocialInput,
  Profile,
  Social,
  UpdateSocialInput,
} from '../../../../classes/schema';
import { Socials } from '../../../../classes/Social';
import { User } from '../../../../classes/User';
import { FormInput } from '../../../../components/FormInput/formInput';
import Layout from '../../../../components/Layout/Layout';
import { Btn } from '../../../../components/Page/PageButtons';
import {
  Container,
  FormGroup,
} from '../../../../components/Page/PageStyledElements';

export const index = ({
  token,
  profile,
  existingSocial,
}: {
  token: string;
  profile: Profile;
  existingSocial: Social;
}): JSX.Element => {
    const router = useRouter();
    const {siteId } = router.query;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({defaultValues:{
      facebook: existingSocial?.facebook ,
      linkedin: existingSocial?.linkedin,
      twitter: existingSocial?.twitter,
      instagram: existingSocial?.instagram,
  }});
  const { addToast } = useToasts();
  const social = new Socials(token);
  

  const onSubmit = async (data) => {
    setLoading(true);
    if (existingSocial) {
      await updateSocial(data);
    } else {
      await createSocial(data);
    }
  };

  const createSocial = async (data) => {
    data.account = profile.account.id;
    data.site = siteId;
    try {
      const result = await social.createSocial({
        input: (data as unknown) as CreateSocialInput,
      });
      if (!result.status) {
        console.error(result);
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        setLoading(false);
        return;
      }
      addToast('Your social handles hav been added', { appearance: 'success' });
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      setLoading(false);
    }
  };

  const updateSocial = async (data) => {
    try {
      const result = await social.updateSocial({
        input: (data as unknown) as UpdateSocialInput,
        socialId: existingSocial.id,
      });

      if (!result.status) {
        console.error(result);
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        setLoading(false);
        return;
      }
      addToast('Updated Successfully', { appearance: 'success' });
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 flex flex-col">
          <div className="flex flew-row justify-between items-center">
            <h1 className="text-4xl font-semibold">Social Handles</h1>
            <Btn color="secondary" $bg="primary" $px="lg">
              {loading ? 'Saving..' : 'Save'}
            </Btn>
          </div>
        </div>
          <FormGroup className="mt-10">
            <FormInput
              name="facebook"
              label="Facebook"
              register={register}
              error={errors.facebook}
              required={true}
            />
          </FormGroup>
          <FormGroup className="mt-10">
            <FormInput
              name="instagram"
              label="Instagram"
              register={register}
              error={errors.instagram}
              required={true}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <FormInput
              name="linkedin"
              label="LinkedIn"
              register={register}
              error={errors.linkedin}
              required={true}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <FormInput
              name="twitter"
              label="Twitter"
              register={register}
              error={errors.twitter}
              required={true}
            />
          </FormGroup>
        </form>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const _thisSocial = new Socials(session.idToken);
  
  const token = session.idToken;

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const profile = await (await user.getProfile()).data;
  const socials = await (await _thisSocial.getSocials({accountId: profile.account.id})).data

  return {
    props: {
      error: null,
      token,
      profile,
      existingSocial:socials.filter(social => social.site == ctx.query.siteId )[0] ?? null
    },
  };
};

export default index;
