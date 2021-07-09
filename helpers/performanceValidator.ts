export const performanceValidator = (values: any) => {
  const errors: any = {};

  if (!values.pageTitle) {
    errors.pageTitle = '"page title" is required';
  }

  // if (!values.menuItem) {
  //   errors.menuItem = 'menuItem is required';
  // }

  if (!values.mediaUrl) {
    errors.mediaUrl = 'mediaUrl is required';
  }
  if (!values.headerText) {
    errors.headerText = 'headerText is required';
  }
  if (!values.captionText) {
    errors.captionText = 'captionText is required';
  }
  if (!values.actionText) {
    errors.actionText = 'actionText is required';
  }
  if (!values.ctaLink) {
    errors.ctaLink = 'ctaLink is required';
  }
  if (!values.headerType) {
    errors.headerType = 'headerType is required';
  }
  if (!values.location) {
    errors.location = 'location is required';
  }
  if (!values.hasAction) {
    errors.hasAction = 'hasAction is required';
  }

  if (!values.year) {
    errors.year = 'year is required';
  }
  if (!values.name) {
    errors.name = 'name is required';
  }
  if (!values.description) {
    errors.description = 'description is required';
  }
  if (!values.stop) {
    errors.stop = 'stop date is required';
  }
  if (!values.start) {
    errors.start = 'start date is required';
  }
  if (!values.nasdaqId) {
    errors.nasdaqId = 'nasdaqId is required';
  }

  // if (values.quarters.length === 0) {
  //   errors.nasdaqId = 'nasdaqId is required';
  // }
  return errors;
};
