export const widgetvalidator = (values: any) => {
  const errors: any = {};

  if (!values.widgetDescription.trim()) {
    errors.widgetDescription = '"widgetDescription title" is required';
  }

  if (!values.widgetTitle) {
    errors.widgetTitle = 'widgetTitle is required';
  }

  if (values.widgetItems.length === 0) {
    errors.widgetItems = 'widgetItems is required';
  }

  return errors;
};
