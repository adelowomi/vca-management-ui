import mergeClassNames from './mergeClassNames';

describe('mergeClassNames', () => {
  it.each([
    [[' class1 class2 '], 'class1 class2'],
    [[undefined], ''],
    [[null], ''],
    [[{}], ''],

    // multiple classNames
    [
      [
        ' class1 ',
        undefined,
        undefined,
        false,
        {},
        123,
        'class2 class3 ',
        null,
        '',
      ],
      'class1 class2 class3',
    ],
  ])('classNames %p, expected = %p', (classNames, expected) =>
    expect(mergeClassNames(...classNames)).toBe(expected)
  );
});
