import de from "./de";
import en from "./en";
import {I18nResolver} from "i18n-ts";
import {env} from "../env";

const i18n = {
    en: en,
    default: en
};

export default new I18nResolver(i18n, env.LOCALIZATION).translation;