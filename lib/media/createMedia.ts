export enum ContectType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
}
export const CreateUploadinput = (result, uploadFormValues) => {
  let media = {};
  switch (uploadFormValues.type) {
    case ContectType.IMAGE:
      media = {
        name: uploadFormValues.name,
        description: uploadFormValues.description,
        type: uploadFormValues.type,
        image: {
          assembly: result['transloadit'][0]['assembly_id'],
          small: result['transloadit'][0]['results']['small'][0]['ssl_url'],
          medium: result['transloadit'][0]['results']['medium'][0]['ssl_url'],
          large: result['transloadit'][0]['results']['large'][0]['ssl_url'],
          xLarge: result['transloadit'][0]['results']['xlarge'][0]['ssl_url'],
        },
      };
      break;
    case ContectType.DOCUMENT:
      media = {
        name: uploadFormValues.name,
        description: uploadFormValues.description,
        type: uploadFormValues.type,
        document: '',
      };
      break;

    default:
      break;
  }
  return media;
};
