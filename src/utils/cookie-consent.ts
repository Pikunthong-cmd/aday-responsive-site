export type CookieTableRow = {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
};

export type CookieToggle = {
  value: string;
  enabled: boolean;
  readonly: boolean;
};

export type CookieBlock = {
  title: string;
  description: string;
  toggle?: CookieToggle;
  cookie_table?: CookieTableRow[];
};

export type CookieConsentResponse = {
  consent_modal: {
    title: string;
    description: string;
    primary_btn: {
      text: string;
      role: string;
    };
  };
  settings_modal: {
    title: string;
    save_settings_btn: string;
    accept_all_btn: string;
    close_btn_label: string;
    cookie_table_headers: Array<{
      col1?: string;
      col2?: string;
      col3?: string;
      col4?: string;
    }>;
    blocks: CookieBlock[];
  };
};

export type UserCookiePreferences = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};