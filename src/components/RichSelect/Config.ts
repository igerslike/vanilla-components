import { enterAndLeave } from '@/core/config/transitions';
import merge from 'lodash/merge';
import { mergeClasses } from '@/core';
import { commonClasses } from '@/core/config/commonClasses';

const defaultVariant = {
    wrapper: 'relative',

    // TDropdown Component
    trigger: mergeClasses(
      commonClasses.inputsBackground,
      commonClasses.inputsBorder,
      commonClasses.inputsRing,
      commonClasses.inputsRadius,

      // Only way to get border-b-none and etc working :(
      'flex items-center justify-between w-full',
      commonClasses.inputsText,
      commonClasses.inputsTransition,
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsSpacing,
    ),

    dropdown: mergeClasses(
      'z-50 overflow-hidden',
      commonClasses.dropdownsBackground,
      commonClasses.dropdownsBorder,
      commonClasses.dropdownsRadius,
      commonClasses.dropdownsShadows,
    ),
    // Dropdown content
    dropdownContent: 'pt-1 space-y-2',

    // Clear button
    clearButton: mergeClasses(
      'absolute flex items-center justify-center text-gray-600 dark:text-gray-300 dark:text rounded mr-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-opacity-70 top-1/2 right-0 transform -translate-y-1/2',
      commonClasses.buttonRing,
      'focus:ring-primary-600',
      commonClasses.iconsSize,
      commonClasses.inputsTransition,
    ),

    // Option list
    optionsList: 'space-y-1',

    optionsListLoadingMore: 'flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 text-center',

    // Option wrapper
    optionWrapper: '',

    // Option button
    option: mergeClasses(
      'w-full disabled:opacity-50',
      'cursor-pointer disabled:cursor-not-allowed',
      'text-sm font-normal',
      'px-3 py-2',
    ),

    selectedOption: 'font-bold bg-gray-50',
    highlightedOption: 'text-primary-900 bg-primary-100 dark:bg-primary-300 dark:text-black',
    selectedHighlightedOption: 'font-semibold',

    //  Option content
    optionContent: 'flex items-center justify-between',
    optionLabel: 'block truncate',
    optionSelectedIcon: mergeClasses(
      '',
      commonClasses.iconsSize,
    ),

    // Option group
    optgroup: 'space-y-2',
    optgroupContent: '',
    optgroupLabel: 'block px-3 py-2 text-xs text-gray-400 uppercase truncate',
    optgroupOptionsList: 'px-2 pb-2',

    // Search
    searchWrapper: 'inline-block w-full px-3 py-2',

    searchInput: mergeClasses('inline-block w-full shadow-inner focus:ring-opacity-70 text-sm px-4 py-2',
      commonClasses.inputsTextColor,
      commonClasses.inputsRing,
      commonClasses.inputsBorder,
      commonClasses.inputsRadius,
      commonClasses.inputsShadows,
      commonClasses.inputsBackgroundDarkerOrSofter,
    ),

    // State texts
    searchingText: 'px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center',
    needsMoreCharsText: 'px-3 pt-0 pb-2 text-xs text-gray-500 dark:text-gray-400 text-center',
    noResultsText: 'px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center',

    // Select button
    selectButtonLabel: 'block pr-4 truncate',
    selectButtonPlaceholder: 'block text-gray-500/90 truncate',
    selectButtonSearchingPlaceholder: 'block text-gray-400 truncate',
    selectButtonLoadingIcon: 'flex-shrink-0 w-4 h-4 ml-1 text-gray-600',
    selectButtonSelectorIcon: 'flex-shrink-0 w-4 h-4 ml-1 text-gray-600',

    // Select button tags
    tagsWrapper: 'flex flex-wrap overflow-hidden -mx-2 -my-2 py-1 pr-8',

    // Single tag
    tag: mergeClasses(
      'rounded shadow-sm flex items-center cursor-pointer',
      'bg-primary-100 dark:bg-primary-500/20 dark:border dark:border-gray-700',
      'm-0.5 h-8 max-w-full',
      'text-primary-900 dark:text-white white-space-no text-sm font-semibold',
      commonClasses.buttonRing,
      'focus:ring-opacity-50 focus:ring-primary-600',
      commonClasses.inputsTransition,
      commonClasses.inputsDisabled,
    ),

    tagLabel: 'px-3',

    tagDeleteButton: mergeClasses(
      commonClasses.inputsTransition,
      commonClasses.buttonRing,
      'focus:ring-opacity-50 focus:ring-primary-600',
      '-ml-1.5 h-full hover:shadow-sm inline-flex items-center px-2 rounded-r',
      'text-primary-400 focus:text-white hover:text-primary-500 dark:hover:text-white',
      'hover:bg-primary-200 focus:bg-primary-500 dark:hover:bg-primary-400/20 dark:focus:bg-primary-500/20',
    ),
    tagDeleteButtonIcon: 'w-3 h-3',

    // Own Configuration ( not vanilla )
    groupedBellow: 'rounded-b-none border-b-0 focus:border-b focus:border-primary-500 z-10',
    groupedAbove: 'rounded-t-none border-t-0 focus:border-t focus:border-primary-500 z-10',

    // Transitions
    ...enterAndLeave,
};

export const VanillaRichSelectConfig = {
  // Until the little bits are merged or variantjs fixes this issue or provider a clear way to override the trigger
  // fixedClasses: {
  //   trigger: mergeClasses(
  //     'flex items-center justify-between w-full',
  //     commonClasses.inputsText,
  //     commonClasses.inputsTransition,
  //     commonClasses.inputsShadows,
  //     commonClasses.inputsDisabled,
  //     commonClasses.inputsSpacing,
  //   ),
  // },
  // Default Input appearance
  classes: {
    ...defaultVariant,
  },
  // Variants
  variants: {
    // Errors
    error: {
      classes : {
          ...merge(defaultVariant, {
              // Trigger
              trigger: mergeClasses(
                commonClasses.inputsErrorsBackground,
                commonClasses.inputsErrorsBorder,
                commonClasses.inputsErrorsRing,
                commonClasses.inputsErrorText,
                commonClasses.inputsRadius,

                // Only way to get border-b-none and etc working :(
                'flex items-center justify-between w-full',
                commonClasses.inputsText,
                commonClasses.inputsTransition,
                commonClasses.inputsShadows,
                commonClasses.inputsDisabled,
                commonClasses.inputsSpacing,
              ),

              // Clear button
              clearButton: mergeClasses(
                'absolute flex items-center justify-center text-red-400 dark:text-red-300 dark:text rounded mr-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-opacity-70 top-1/2 right-0 transform -translate-y-1/2',
                commonClasses.buttonErrorsRing,
                commonClasses.iconsSize,
                commonClasses.inputsTransition,
              ),

              // Single tag
              tag: mergeClasses(
                'rounded shadow-sm flex items-center cursor-pointer',
                'bg-red-100 dark:bg-red-500/20',
                'm-0.5 h-8 max-w-full',
                'text-red-900 dark:text-red-300 white-space-no text-sm white-space-no',
                commonClasses.buttonErrorsRing + ' focus:ring-opacity-50',
                commonClasses.inputsTransition,
                commonClasses.inputsDisabled,
              ),

              tagDeleteButton: mergeClasses(
                commonClasses.inputsTransition,
                commonClasses.buttonErrorsRing + ' focus:ring-opacity-50',
                '-ml-1.5 h-full hover:shadow-sm inline-flex items-center px-2 rounded-r',
                'text-red-900 dark:text-red-300 focus:text-white hover:text-red-800 dark:hover:text-red-200',
                'hover:bg-red-200 focus:bg-red-500 dark:hover:bg-red-400/20 dark:focus:bg-red-500/20',
              ),
          }),
      },
    },
  },
};

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaRichSelectConfigToVariantJs = (configuration: any) => {
  return configuration;
};


export const VanillaRichSelectClassesKeys = Object.keys(VanillaRichSelectConfig.classes);

export type  VanillaRichSelectClassesValidKeys = keyof typeof VanillaRichSelectConfig.classes;


