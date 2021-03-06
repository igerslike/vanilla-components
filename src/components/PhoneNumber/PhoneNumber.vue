<template>
  <div
    class="vanilla-input-phone-number"
    :class="configuration.classesList.wrapper"
  >
    <div>
      <vanilla-select-country
        ref="localRefCountry"
        v-model="phoneCountryCode"
        :favorite-countries="favoriteCountries"
        :variant="localVariant"
        :show-errors="false"
        :has-item-bellow="true"
        :label-with-dial-code="true"
        :placeholder="countryPlaceholder"
        :clearable="false"
        :class="[
          configuration.classesList.select,
        ]"
        :search-box-placeholder="searchBoxPlaceholder"
        :no-results-text="noResultsText"
        :searching-text="searchingText"
        :loading-closed-placeholder="loadingClosedPlaceholder"
        :loading-more-results-text="loadingMoreResultsText"
      />
      <vanilla-input
        ref="localRefPhone"
        v-model="phoneNumber"
        :variant="localVariant"
        :show-errors="false"
        :placeholder="phonePlaceholder"
        :autocomplete="autocomplete"
        :class="[
          configuration.classesList.input,
        ]"
      >
        <template #before="{className}">
          <slot
            name="dialCode"
            v-bind="{ phoneDialCode }"
          >
            <span
              class="sm:text-sm"
              :class="className"
            >+{{ phoneDialCode }}</span>
          </slot>
        </template>
      </vanilla-input>
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, watch } from 'vue';
import { parsePhoneNumber, getCountryCallingCode } from 'libphonenumber-js';
import { CountryCode, PhoneNumber, CountryCallingCode } from 'libphonenumber-js/types';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/core';
import { VanillaPhoneNumberProps, VanillaPhoneNumberConfig, VanillaPhoneNumberClassesKeys } from './index';
import { VanillaFavoriteCountriesValue } from '@/components/SelectCountry';
import VanillaInput from '@/components/Input/Input.vue';
import VanillaSelectCountry from '@/components/SelectCountry/SelectCountry.vue';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import { MinimumInputLengthTextProp } from '@/components/RichSelect';

export default defineComponent({
    name: 'VanillaPhoneNumber',
    components: {
        VanillaInput,
        VanillaSelectCountry,
        VanillaFormErrors,
        VanillaFormFeedback,
    },
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaPhoneNumberProps>(),
        modelValue: {
            type: [String, Number] as PropType<string>,
            default: undefined,
        },
        countryCode: {
            type: [String] as PropType<CountryCode>,
            default: '',
        },
        phonePlaceholder: {
            type: [String, Number] as PropType<string | number>,
            default: 'Your national number',
        },
        countryPlaceholder: {
            type: [String, Number] as PropType<string | number>,
            default: 'Select your phone indicative',
        },
        favoriteCountries: {
            type: [Array, Object, undefined] as PropType<VanillaFavoriteCountriesValue>,
            required: false,
            default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
        },
        searchBoxPlaceholder: {
            type: String,
            default: 'Your Phone Number country',
        },
        noResultsText: {
            type: String,
            default: '😟 Sorry but we did not find any countries to your query. Try another one query?',
        },
        searchingText: {
            type: String,
            default: 'Please wait, searching for results...',
        },
        loadingClosedPlaceholder: {
            type: String,
            default: 'Loading, please wait ...',
        },
        loadingMoreResultsText: {
            type: String,
            default: 'Loading more options...',
        },
        minimumInputLengthText: {
            type: [Function, String] as PropType<MinimumInputLengthTextProp>,
            default: () => (minimumInputLength: number): string => `Search more countries by entering ${minimumInputLength} or more characters`,
        },
    },
    emits: [
        'update:countryDialCode',
        'update:countryCode',
        'update:countryName',
        'update:modelValue',
        'update:phoneNumberNational',
        'update:phoneNumberInternational',
    ],
    setup(props, { emit }) {
        const localRefPhone = ref(null);
        const localRefCountry = ref(null);
        const localValue = useVModel(props, 'modelValue');
        const phoneCountryCode: CountryCode | Ref = ref(props.countryCode);
        const phoneDialCode: CountryCallingCode | Ref = ref(null);
        const phoneNumber: Ref<string | undefined> = ref(localValue.value);
        const isValidPhoneNumber: Ref<boolean> = ref(false);
        const parsedPhoneNumber: Ref<PhoneNumber> | Ref = ref(null);

        const attemptToParseNumber = (phoneNumberValue: string | undefined, phoneCountryCodeValue: CountryCode) => {
            try {
                // Always resolve the country code to dial code
                phoneDialCode.value = getCountryCallingCode(phoneCountryCodeValue);
                // Attempt to parse the number and country code
                parsedPhoneNumber.value = parsePhoneNumber(phoneNumberValue || '', phoneCountryCodeValue);

                // If we are able to parse, then we will assign the new values
                if (parsedPhoneNumber.value) {
                    isValidPhoneNumber.value = parsedPhoneNumber.value?.isValid();
                    phoneCountryCode.value = parsedPhoneNumber.value.country;
                    phoneDialCode.value = parsedPhoneNumber.value?.countryCallingCode;
                    phoneNumber.value = parsedPhoneNumber.value?.nationalNumber;
                    localValue.value = '+' + phoneDialCode.value + phoneNumber.value;
                }
            } catch (e) {
                localValue.value =  '+' + phoneDialCode.value + phoneNumber.value;
            }
        };

        attemptToParseNumber(phoneNumber.value, phoneCountryCode.value);

        // Only boot here, first we must prepare the values before start to watch.
        const {
            hasErrors,
            localErrors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaPhoneNumberProps>(
            VanillaPhoneNumberConfig,
            VanillaPhoneNumberClassesKeys,
            localVariant,
        );

        // Watch Country Code and Phone number together
        // When one changes we will trigger the model value & emit back
        watch([phoneCountryCode, phoneNumber], ([newPhoneCountryCode, newPhoneNumber]) => {

            attemptToParseNumber(newPhoneNumber, newPhoneCountryCode);

            // Watch & Emit additional data
            emit('update:countryDialCode', phoneDialCode.value);
            emit('update:countryCode', phoneCountryCode.value);
            emit('update:phoneNumberNational', phoneNumber.value);
            emit('update:phoneNumberInternational', localValue.value);

        }, { immediate: true });

        return {
            configuration,
            localRefPhone,
            localRefCountry,
            localVariant,
            localErrors,
            hasErrors,
            phoneCountryCode,
            phoneNumber,
            phoneDialCode,
            isValidPhoneNumber,
        };
    },
});
</script>

