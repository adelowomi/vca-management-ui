import React, { useState } from 'react';

import { HeroLocationType, Media } from '../../classes/schema';
import { FormInput } from '../FormInput/formInput';
import FormSelect from '../FormSelect/VcaSelect';
import { HeroPreview } from '../Hero/Hero';
import { HeaderTypeBtn, ShadowBtn } from './PageButtons';
import {
  ColumnSection,
  FormGroup,
  Grid,
  H2,
  HeaderPositionWrapper,
  ImageSelectBox,
} from './PageStyledElements';
import SelectMediaModal from './SelectMediaModal';

const options = [
  {
    id: 1,
    name: 'Active',
    value: (true as unknown) as string,
    unavailable: false,
  },
  {
    id: 2,
    name: 'InActive',
    value: (false as unknown) as string,
    unavailable: false,
  },
];

export const AddEditHero = ({
  setHero,
  register,
  errors,
  watch,
  existingHero,
  token,
  profile
}: {
  setHero: any;
  register: any;
  watch: any;
  errors: any;
  existingHero?: any;
  token:any;
  profile: any;
}): JSX.Element => {
  
  const watching = watch();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [textPosition, setTextPosition] = useState(existingHero?.location);
  const [hasAction, setHasAction] = useState(existingHero?.hasAction);
  const [selectedMedia, setSelectedMedia] = useState<Media>(
    existingHero?.media
  );
  const [showPreview, setShowPreview] = useState(true);

  const setMedia = (media:any) => {
    
    setHero({ media: media.id });
    setSelectedMedia(media);
    console.error(media);
  };

  return (
    <>
      <SelectMediaModal
        close={setMediaModalOpen}
        open={mediaModalOpen}
        setMedia={setMedia}
        selected={selectedMedia}
        token={token}
        profile={profile}
        type={"IMAGE"}
      />
      <ColumnSection>
        <H2 className="mt-6">Media Image</H2>
        <ImageSelectBox
          onClick={() => setMediaModalOpen(!mediaModalOpen)}
          className="mt-5 w-96 flex items-center justify-center cursor-pointer"
        >
          <p>+ Select from media gallery</p>
        </ImageSelectBox>
      </ColumnSection>
      <ColumnSection>
        <HeaderPositionWrapper>
          <div className="flex flex-col w-full">
            <H2 className="mb-5">Header Text</H2>
            <div className="w-full">
              <FormGroup className="">
                <FormInput
                  name="hero.heading"
                  label="Enter text"
                  register={register}
                  error={errors.hero}
                  required={true}
                  disableLabel
                />
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-col w-full ml-6">
            <H2 className="mb-5">Text Position</H2>
            <div className="flex flex-row justify-between space-x-3">
              <HeaderTypeBtn
                active={textPosition == HeroLocationType.Left ? true : false}
                value={HeroLocationType.Left}
                data-textposition={HeroLocationType.Left}
                onClick={() => {
                  setHero({ location: HeroLocationType.Left });
                  setTextPosition(HeroLocationType.Left);
                }}
                type="button"
              >
                Left
              </HeaderTypeBtn>
              <HeaderTypeBtn
                active={textPosition == HeroLocationType.Right ? true : false}
                value={HeroLocationType.Right}
                data-textposition={HeroLocationType.Right}
                onClick={() => {
                  setHero({ location: HeroLocationType.Right });
                  setTextPosition(HeroLocationType.Right);
                }}
                type="button"
              >
                Right
              </HeaderTypeBtn>
              <HeaderTypeBtn
                active={textPosition == HeroLocationType.Center ? true : false}
                value={HeroLocationType.Center}
                data-textposition={HeroLocationType.Center}
                onClick={() => {
                  setHero({ location: HeroLocationType.Center });
                  setTextPosition(HeroLocationType.Center);
                }}
                type="button"
              >
                Centre
              </HeaderTypeBtn>
            </div>
          </div>
          <div className="flex flex-col w-full mt-3">
            <H2 className="mb-5">Caption Text</H2>
            <div className="w-full">
              <FormGroup className="">
                <FormInput
                  name="hero.caption"
                  label="Enter caption"
                  register={register}
                  error={errors.name}
                  required={true}
                  disableLabel
                />
              </FormGroup>
            </div>
          </div>
        </HeaderPositionWrapper>
      </ColumnSection>
      <ColumnSection>
        <Grid className="space-x-5">
          <div className="flex flex-col w-full">
            <H2 className="mb-5">Call to action button</H2>
            <div className="w-full -mt-6">
              <FormSelect
                defaultOption={{
                  id: 0,
                  name:
                    (existingHero &&
                      options.filter(
                        (opt) =>
                          ((opt.value as unknown) as boolean) ==
                          existingHero.hasAction
                      )[0].name) ??
                    'Select option',
                  value:
                    (existingHero &&
                      options.filter(
                        (opt) =>
                          ((opt.value as unknown) as boolean) ==
                          existingHero.hasAction
                      )[0].value) ??
                    null,
                  unavailable: false,
                }}
                onChange={(data) => {
                  setHasAction((data.value as unknown) as boolean);
                  existingHero
                    ? setHero({ hasAction: (data.value as unknown) as boolean })
                    : null;
                }}
                label=""
                options={options}
                error={errors.type}
                errorText={'Add page to menu'}
              />
            </div>
          </div>
          {hasAction ? (
            <>
              <div className="w-full mt-12">
                <FormGroup className="">
                  <FormInput
                    name="hero.actionText"
                    label="Action Text"
                    register={register}
                    error={errors.name}
                    required={true}
                    disableLabel
                  />
                </FormGroup>
              </div>
              <div className="w-full mt-12">
                <FormGroup className="">
                  <FormInput
                    name="hero.actionSlug"
                    label="Enter CTA (call to action Link)"
                    register={register}
                    error={errors.name}
                    required={true}
                    disableLabel
                  />
                </FormGroup>
              </div>
            </>
          ) : null}
        </Grid>
      </ColumnSection>
      <ColumnSection>
        <div className="mt-3">
          <ShadowBtn
            className="py-4 px-10 shadow-sm rounded text-sm font-bold"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </ShadowBtn>
        </div>
      </ColumnSection>
      {selectedMedia && showPreview ? (
        <HeroPreview
          hero={{
            heading:
              (watching?.hero && watching?.hero.heading) ??
              existingHero?.heading,
            hasAction:
              (watching?.hero && watching.hero?.actionText ? true : false) ??
              existingHero?.hasAction,
            location:
              (textPosition && (textPosition as HeroLocationType)) ??
              existingHero?.location,
            media: selectedMedia && selectedMedia,
            actionText:
              (watching?.hero && watching.hero?.actionText) ??
              existingHero?.actionText,
            mediaUrl: '',
            type: '',
            caption: watching?.hero && watching?.hero.caption,
            actionSlug: watching?.hero && watching?.hero.actionSlug,
          }}
        />
      ) : null}
    </>
  );
};

export default AddEditHero;
