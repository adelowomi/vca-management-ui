import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';

import { MediaCard } from '../Page/MediaCard';
import { SelectButton } from '../Page/PageButtons/SelectButton';
import { PageSearchInput } from '../Page/PageSearchInput';
import { H1 } from '../Page/PageStyledElements';
// import { SelectMedia } from '../Page/SelectMedia';

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const options = [
  { id: 'pageId', name: 'Page ID' },
  { id: 'type', name: 'Media type' },
];

export const SelectMediaModal = ({
  open,
  setOpen,
  medias,
  state,
  setState,
}): JSX.Element => {
  const cancelButtonRef = useRef();

  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    setState({
      ...state,
      mediaUrl: selected[selected.length - 1]?.image?.small,
      media: selected[selected.length - 1]?.id,
    });

    // } else if (media.type === 'VIDEO') {
    //   inputRef.current.checked = !inputRef.current.checked;
    //   setState({ ...state, mediaUrl: media.video });
    //   inputRef.current.checked = !inputRef.current.checked;
    // } else if (media.type === 'DOCUMENT') {
    //   setState({ ...state, mediaUrl: media.document.url });
    // }
  }, [selected]);

  const selectedArr = (arr: any) => {
    setSelected([...arr]);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-x-0 bottom-0 top-1 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
              {/* <SelectMedia
                setOpen={setOpen}
                medias={medias}
                state={state}
                setState={setState}
              /> */}

              <>
                <Container>
                  <Row>
                    <H1 className="mb-10">Select Media</H1>
                    <button
                      className="flex space-x-2 justify-center focus:outline-none"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-semibold text-base">Close</span>
                      <RiCloseLine className="h-6 w-5" aria-hidden="true" />
                    </button>
                  </Row>
                  <Row>
                    <div className="flex flex-row justify-start space-x-4">
                      <div className="w-">
                        <PageSearchInput />
                      </div>
                      <div className="w-60">
                        <SelectButton
                          name="filterBy"
                          py={2.5}
                          px={5}
                          caption="Filter by"
                          handleChange={() => {
                            return;
                          }}
                          value={''}
                          options={options}
                        />
                      </div>
                    </div>
                    <div></div>
                  </Row>
                  <div className="grid grid-cols-4 gap-4 mt-8">
                    {medias.map((media: any) => (
                      <MediaCard
                        key={media.id}
                        media={media}
                        selectedArr={selectedArr}
                        selected={selected}
                        count={1}
                      />
                    ))}
                  </div>
                </Container>
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
