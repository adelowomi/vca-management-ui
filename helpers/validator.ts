export const validator = (values: any) => {
  const errors: any = {};

  if (!values.pageTitle.trim()) {
    errors.pageTitle = '"page title" is required';
  }

  if (!values.site) {
    errors.site = 'siteId required';
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
  if (!values.tags) {
    errors.tags = 'tags is required';
  }
  if (!values.location) {
    errors.location = 'location is required';
  }
  if (!values.hasAction) {
    errors.hasAction = 'hasAction is required';
  }
  return errors;
};
