import merge from "lodash/merge";

import type { Theme } from "@mui/material/styles";

import { alert } from "./components/alert";
import { autocomplete } from "./components/autocomplete";
import { badge } from "./components/badge";
import { breadcrumbs } from "./components/breadcrumbs";
import { button } from "./components/button";
import { buttonGroup } from "./components/button-group";
import { card } from "./components/card";
import { checkbox } from "./components/checkbox";
import { chip } from "./components/chip";
import { cssBaseline } from "./components/css-baseline";
import { datePicker } from "./components/date-picker";
import { dialog } from "./components/dialog";
import { list } from "./components/list";
import { loadingButton } from "./components/loading-button";
import { menu } from "./components/menu";
import { paper } from "./components/paper";
import { popover } from "./components/popover";
import { radio } from "./components/radio";
import { rating } from "./components/rating";
import { select } from "./components/select";
import { skeleton } from "./components/skeleton";
import { slider } from "./components/slider";
import { stepper } from "./components/stepper";
import { svgIcon } from "./components/svg-icon";
import { switches } from "./components/switch";
import { textField } from "./components/textfield";
import { toggleButton } from "./components/toggle-button";
import { typography } from "./components/typography";
import { defaultProps } from "./default-props";

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = merge(
    defaultProps(theme),
    //
    chip(theme),
    card(theme),
    menu(theme),
    list(theme),
    badge(theme),
    paper(theme),
    alert(theme),
    radio(theme),
    select(theme),
    button(theme),
    rating(theme),
    dialog(theme),
    slider(theme),
    stepper(theme),
    popover(theme),
    svgIcon(theme),
    switches(theme),
    checkbox(theme),
    skeleton(theme),
    textField(theme),
    typography(theme),
    datePicker(theme),
    buttonGroup(theme),
    breadcrumbs(theme),
    cssBaseline(theme),
    autocomplete(theme),
    toggleButton(theme),
    loadingButton(theme)
  );

  return components;
}
