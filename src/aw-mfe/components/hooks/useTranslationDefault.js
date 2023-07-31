import BaseApisWrap, { getTranslation } from "../../BaseApisWrap";

export default function useTranslationDefault() {
    const { t } = BaseApisWrap.geti18nUseTranslationHook()();
    return {
        t: (loc) => {
            const value = t(loc);
            return (!value || value === loc) ? (getTranslation(loc) || value) : value;
        }
    };
 }