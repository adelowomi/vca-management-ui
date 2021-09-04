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
  StyleSecondaryButtonInput,
  UpdateStyleInput,
} from '../../../../classes/schema';
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
  existingStyle: any;
  token: string;
  siteId: string;
  account: string;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [bodyStyle, setBodyStyle] = useState<StyleBodyInput>({
    bodyFont: existingStyle.body?.bodyFont,
    fontColor: existingStyle.body?.fontColor,
    backgroundColor: existingStyle.body?.backgroundColor,
    accentColor: existingStyle.body?.accentColor,
  });
  const [navigationStyle, setNavigationStyle] = useState<StyleNavigationInput>(
    {
      fontColor:existingStyle.navigation?.fontColor,
      accentColor: existingStyle.navigation?.accentColor,
      backgroundColor: existingStyle.navigation?.backgroundColor,
    }
  );
  const [buttonStyle, setButtonStyle] = useState<StyleButtonInput>(
    {
      font:existingStyle.button?.font,
      buttonBorderStyle: existingStyle.button?.buttonBorderStyle,
      previewButton: existingStyle.button?.previewButton,
    }
  );
  const [primaryButtonStyle, setPrimaryButtonStyle] =
    useState<StylePrimaryButtonInput>({
      backgroundColor:existingStyle.primaryButton?.backgroundColor,
      fontColor: existingStyle.primaryButton?.fontColor,
      hoverBackgroundColor:existingStyle.primaryButton?.hoverBackgroundColor,
     hoverFontColor: existingStyle.primaryButton?.hoverFontColor,
    });
  const [secondaryButton, setSecondaryButtonStyles] =
    useState<StyleSecondaryButtonInput>({
      backgroundColor:existingStyle.secondaryButton?.backgroundColor,
      fontColor:existingStyle.secondaryButton?.fontColor,
      hoverBackgroundColor: existingStyle.secondaryButton?.hoverBackgroundColor,
      hoverFontColor: existingStyle.secondaryButton?.hoverFontColor,
    });
  const [footerStyles, setFooterStyles] = useState<StyleFooterInput>(
    {
      accentColor:existingStyle.footer?.accentColor,
      backgroundColor: existingStyle.footer?.backgroundColor,
      fontColor: existingStyle.footer?.fontColor,
    }
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
      account: account,
      site: siteId,
    };
    console.error({data});
    console.error({existingStyle});
    
    
    if (existingStyle) {
      await updateStyle(data as UpdateStyleInput);
      return;
    }
    await createStyle(data as CreateStyleInput);
    return;
  };

  const createStyle = async (input: CreateStyleInput) => {
    input.button.previewButton = 'preview';
    setLoading(true);
    try {
      const result = await _thisStyle.createStyle({
        input: input as unknown as CreateStyleInput,
      });
      if (!result.status) {
        addToast('An error occurred', { appearance: 'error' });
        setLoading(false);
      }
      addToast('Style created successfully', { appearance: 'success' });
      setLoading(false);
      console.error(result);
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      setLoading(false);
    }
  };

  const updateStyle = async (input: UpdateStyleInput) => {
    input.button.previewButton = 'preview';
    setLoading(true);
    try {
      const result = await _thisStyle.updateStyle({
        input: input as unknown as UpdateStyleInput,
        id: existingStyle.id,
      });
      console.error({result});
      
      if (!result.status) {
        addToast('An error occurred', { appearance: 'error' });
        setLoading(false);
      }
      addToast('Style updated successfully', { appearance: 'success' });
      setLoading(false);
      console.error(result);
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
  const style = new Style(session.idToken);
  const token = session.idToken;
  const profile = await (await user.getProfile()).data;

  let existingStyle;
  try {
    existingStyle = await style.getStyle({
      accountId: profile.account.id,
      siteId: ctx.query.siteId as unknown as string,
    });
  } catch (error) {
    console.error(error);
    existingStyle = {data: {}};
  }

  return {
    props: {
      siteId: ctx.query.siteId as unknown as string,
      error: null,
      account: profile.account.id,
      token,
      existingStyle: existingStyle.data,
    },
  };
};

export default createStyles;
