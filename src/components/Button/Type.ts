import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaButtonClassesValidKeys } from './Config';

export declare type VanillaButtonProps = WithVariantPropsAndClassesList<{
    as?: string,
    asDeep?: string,
    label?: string
    loading?: boolean,
    disabled?: boolean | string,
}
& InputHTMLAttributes & Data & {
  type?: string
  disabled?: boolean | string
}, VanillaButtonClassesValidKeys>;
