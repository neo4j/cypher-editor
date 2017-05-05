import * as CompletionTypes from '../CompletionTypes';

export default (element) => {
  const text = element.getText();
  if (text === '$') {
    return [
      { type: CompletionTypes.PARAMETER },
    ];
  }
  return [];
};
