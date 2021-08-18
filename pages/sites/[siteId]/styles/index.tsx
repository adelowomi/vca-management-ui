import Link from 'next/link';
import React from 'react';

import Layout from '../../../../components/Layout/Layout';
import { BodyStyles } from '../../../../components/Styles/Body';
import { ButtonStyles } from '../../../../components/Styles/Button';
import { FooterStyles } from '../../../../components/Styles/Footer';
import { NavigationStyles } from '../../../../components/Styles/Navigation';
import { PrimaryButtonStyles } from '../../../../components/Styles/PrimaryButton';
import { SecondaryButtonStyles } from '../../../../components/Styles/SecondaryButton';

const createStyles = () => {
  const onChange = (data: any) => {
    return data;
    // setValue('menuStatus', stringToBoolean(data.value));
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
            >
              {'Save'}
            </button>
          </div>
        </section>
        <BodyStyles onChange={onChange} />
        <NavigationStyles onChange={onChange} />
        <FooterStyles onChange={onChange} />
        <ButtonStyles onChange={onChange} />
        <PrimaryButtonStyles onChange={onChange} />
        <SecondaryButtonStyles onChange={onChange} />
      </div>
    </Layout>
  );
};

export default createStyles;
