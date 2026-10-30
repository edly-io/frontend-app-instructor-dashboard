import React from 'react';
import { EnvironmentTypes, SiteConfig, WidgetOperationTypes, footerApp, headerApp, shellApp } from '@openedx/frontend-base';

import { instructorDashboardApp } from './src';

import '@openedx/frontend-base/shell/style';

// Slot/widget IDs for the header app (from @openedx/frontend-base/dist/shell/header/app.js)
const WIDGET_DESKTOP_PRIMARY_LINKS = 'org.openedx.frontend.widget.header.desktopPrimaryLinks.v1';
const WIDGET_DESKTOP_SECONDARY_LINKS = 'org.openedx.frontend.widget.header.desktopSecondaryLinks.v1';
const WIDGET_MOBILE_MENU_LINKS = 'org.openedx.frontend.widget.header.mobileMenuLinks.v1';
const WIDGET_COURSE_NAV_BAR = 'org.openedx.frontend.widget.header.courseNavigationBar.v1';
const WIDGET_MASQUERADE_BAR = 'org.openedx.frontend.widget.header.masqueradeBar.v1';
const SLOT_DESKTOP_LEFT = 'org.openedx.frontend.slot.header.desktopLeft.v1';
const SLOT_DESKTOP_RIGHT = 'org.openedx.frontend.slot.header.desktopRight.v1';
const SLOT_AUTH_MENU = 'org.openedx.frontend.slot.header.authenticatedMenu.v1';
const WIDGET_AUTH_MENU_PROFILE = 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuProfile.v1';
const WIDGET_AUTH_MENU_ACCOUNT = 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuAccount.v1';
const WIDGET_AUTH_MENU_LOGOUT = 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuLogout.v1';

const CMS_BASE_URL = 'http://studio.local.openedx.io:8001';

const StudioMenuItem: React.FC = () => (
  <a href={CMS_BASE_URL} className="dropdown-item">Studio</a>
);

const studioInstructorHeaderSlots = [
  // Remove learner nav links — keep only logo + user menu (Studio style)
  { slotId: SLOT_DESKTOP_LEFT, relatedId: WIDGET_DESKTOP_PRIMARY_LINKS, op: WidgetOperationTypes.REMOVE },
  { slotId: SLOT_DESKTOP_RIGHT, relatedId: WIDGET_DESKTOP_SECONDARY_LINKS, op: WidgetOperationTypes.REMOVE },
  { slotId: SLOT_DESKTOP_RIGHT, relatedId: WIDGET_MOBILE_MENU_LINKS, op: WidgetOperationTypes.REMOVE },
  // Remove blue course bar and masquerade bar (belt-and-suspenders alongside provides.ts)
  { slotId: 'org.openedx.frontend.slot.header.courseNavigationBar.v1', relatedId: WIDGET_COURSE_NAV_BAR, op: WidgetOperationTypes.REMOVE },
  { slotId: 'org.openedx.frontend.slot.header.masqueradeBar.v1', relatedId: WIDGET_MASQUERADE_BAR, op: WidgetOperationTypes.REMOVE },
  // Trim user dropdown to Studio link + Logout only
  { slotId: SLOT_AUTH_MENU, relatedId: WIDGET_AUTH_MENU_PROFILE, op: WidgetOperationTypes.REMOVE },
  { slotId: SLOT_AUTH_MENU, relatedId: WIDGET_AUTH_MENU_ACCOUNT, op: WidgetOperationTypes.REMOVE },
  {
    slotId: SLOT_AUTH_MENU,
    id: 'uber.widget.header.studioLink',
    relatedId: WIDGET_AUTH_MENU_LOGOUT,
    op: WidgetOperationTypes.INSERT_BEFORE,
    component: StudioMenuItem,
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
        ...((headerApp as any).slots ?? []),
        ...studioInstructorHeaderSlots,
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
      role: 'org.openedx.frontend.role.profile',
      url: 'http://apps.local.openedx.io:1995/profile/'
    },
    {
      role: 'org.openedx.frontend.role.account',
      url: 'http://apps.local.openedx.io:1997/account/'
    },
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://local.openedx.io:8000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
