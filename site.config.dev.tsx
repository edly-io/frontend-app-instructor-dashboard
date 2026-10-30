import {
  EnvironmentTypes,
  LinkMenuItem,
  SiteConfig,
  SlotOperation,
  WidgetOperationTypes,
  defineMessages,
  footerApp,
  headerApp,
  shellApp,
} from '@openedx/frontend-base';

import { instructorDashboardApp } from './src';

import '@openedx/frontend-base/shell/style';

const CMS_BASE_URL = 'http://studio.local.openedx.io:8001';

const messages = defineMessages({
  studio: {
    id: 'uber.header.user.menu.studio',
    defaultMessage: 'Studio',
    description: 'User menu link to Studio in the instructor dashboard header',
  },
});

// Studio-style header: logo and user menu only; the user menu holds Studio and Logout.
// Widget and slot IDs come from frontend-base's header app (shell/header/app).
const studioStyleHeaderSlots: SlotOperation[] = [
  {
    slotId: 'org.openedx.frontend.slot.header.desktopLeft.v1',
    relatedId: 'org.openedx.frontend.widget.header.desktopPrimaryLinks.v1',
    op: WidgetOperationTypes.REMOVE,
  },
  {
    slotId: 'org.openedx.frontend.slot.header.desktopRight.v1',
    relatedId: 'org.openedx.frontend.widget.header.desktopSecondaryLinks.v1',
    op: WidgetOperationTypes.REMOVE,
  },
  {
    slotId: 'org.openedx.frontend.slot.header.mobileMenu.v1',
    relatedId: 'org.openedx.frontend.widget.header.mobileMenuLinks.v1',
    op: WidgetOperationTypes.REMOVE,
  },
  {
    slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
    relatedId: 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuProfile.v1',
    op: WidgetOperationTypes.REMOVE,
  },
  {
    slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
    relatedId: 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuAccount.v1',
    op: WidgetOperationTypes.REMOVE,
  },
  {
    slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
    id: 'uber.widget.header.authenticatedMenuStudio.v1',
    relatedId: 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuLogout.v1',
    op: WidgetOperationTypes.INSERT_BEFORE,
    element: <LinkMenuItem label={messages.studio} url={CMS_BASE_URL} variant="dropdownItem" />,
  },
];

const siteConfig: SiteConfig = {
  siteId: 'instructor-dev',
  siteName: 'Instructor Dev',
  baseUrl: 'http://apps.local.openedx.io:8080',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  cmsBaseUrl: CMS_BASE_URL,
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    {
      ...headerApp,
      slots: [
        ...(headerApp.slots ?? []),
        ...studioStyleHeaderSlots,
      ],
    },
    footerApp,
    {
      ...instructorDashboardApp,
      config: {
        ...instructorDashboardApp.config,
        SUPPORT_URL: 'https://docs.openedx.org/en/latest/educators/index.html',
      }
    }
  ],
  externalRoutes: [
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://local.openedx.io:8000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
