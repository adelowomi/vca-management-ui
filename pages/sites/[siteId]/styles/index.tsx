import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import {
  CreateStyleInput,
  StyleBodyInput,
  StyleButtonInput,
  StyleFooterInput,
  StyleNavigationInput,
  StylePrimaryButtonInput,
  Styles,
  StyleSecondaryButtonInput,
  UpdateStyleInput,
} from '../../../../classes/schema';
import { Site } from '../../../../classes/Site';
import { Style } from '../../../../classes/Style';
import { User } from '../../../../classes/User';
import Layout from '../../../../components/Layout/Layout';
import { BodyStyles } from '../../../../components/Styles/Body';
import { ButtonStyles } from '../../../../components/Styles/Button';
import { FooterStyles } from '../../../../components/Styles/Footer';
import { NavigationStyles } from '../../../../components/Styles/Navigation';
import { PrimaryButtonStyles } from '../../../../components/Styles/PrimaryButton';
import { SecondaryButtonStyles } from '../../../../components/Styles/SecondaryButton';

const createStyles = ({
  existingStyle,
  token,
  siteId,
  account,
}: {
  existingStyle: Styles;
  token: string;
  siteId: string;
  account: string;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [bodyStyle, setBodyStyle] = useState<StyleBodyInput>(
    existingStyle.body
  );
  const [navigationStyle, setNavigationStyle] = useState<StyleNavigationInput>(
    existingStyle.navigation
  );
  const [buttonStyle, setButtonStyle] = useState<StyleButtonInput>(
    existingStyle.button
  );
  const [primaryButtonStyle, setPrimaryButtonStyle] =
    useState<StylePrimaryButtonInput>(existingStyle.primaryButton);
  const [secondaryButton, setSecondaryButtonStyles] =
    useState<StyleSecondaryButtonInput>(existingStyle.secondaryButton);
  const [footerStyles, setFooterStyles] = useState<StyleFooterInput>(
    existingStyle.footer
  );

  const _thisStyle = new Style(token);



  const onSubmit = async () => {
    const data: CreateStyleInput = {
      body: bodyStyle,
      navigation: navigationStyle,
      button: buttonStyle,
      primaryButton: primaryButtonStyle,
      secondaryButton: secondaryButton,
      footer: footerStyles,
      account: siteId,
      site: account,
    };
    if (existingStyle) {
      await updateStyle(data as UpdateStyleInput);
      return;
    }

    await createStyle(data as CreateStyleInput);
  };

  const createStyle = async (input: CreateStyleInput) => {
    setLoading(true);
    try {
      const result = await _thisStyle.createSite({input:input as unknown as CreateStyleInput});
      console.error(result);
      
    } catch (error) {
      console.error(error);
      addToast(error.error.message ? error.error.message :'An error occurred', { appearance: 'error' });
      setLoading(false);
    }
  };

  const updateStyle = async(input: UpdateStyleInput) => {
    setLoading(true);
    try {
      const result = await _thisStyle.createSite({input:input as unknown as CreateStyleInput});
      console.error(result);
    } catch (error) {
      console.error(error);
      addToast(error.error.message ? error.error.message :'An error occurred', { appearance: 'error' });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="px-32 mt-8">
        <section className="flex items-center justify-between w-full h-">
          <div className="flex text-gray-600 items-center">
            <h1 className="text-3xl text-black font-bold">Styles</h1>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="text-gray-500 bg-gray-100 rounded-sm text-sm py-4 font-bold px-10 "
            >
              <Link href={`#`}>Discard Changes</Link>
            </button>
            <button
              type="submit"
              className="text-white bg-vca-blue rounded-sm text-sm py-4 font-bold px-10"
              onClick={() => onSubmit()}
            >
              {loading ? 'Saving' : 'Save'}
            </button>
          </div>
        </section>
        <BodyStyles onChange={setBodyStyle} style={bodyStyle} />
        <NavigationStyles
          onChange={setNavigationStyle}
          style={navigationStyle}
        />
        <FooterStyles onChange={setFooterStyles} style={footerStyles} />
        <ButtonStyles onChange={setButtonStyle} style={buttonStyle} />
        <PrimaryButtonStyles
          onChange={setPrimaryButtonStyle}
          style={primaryButtonStyle}
        />
        <SecondaryButtonStyles
          onChange={setSecondaryButtonStyles}
          style={secondaryButton}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }
  const user = new User(session.idToken);
  const site = new Site(session.idToken);
  const token = session.idToken;
  const profile = await (await user.getProfile()).data;
  const data = await (
    await site.getSite({
      accountId: profile.account.id,
      siteId: (ctx.query.siteId as unknown) as string,
    })
  ).data;
  return {
    props: {
      siteId: data.id,
      error: null,
      user: session.user,
      token,
      existingStyle:{}
    },
  };
}

export default createStyles;
