import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { DefaultPage, AppLayoutDarkSidebarPage } from '@/pages/dashboards';

import {
  AccountActivityPage,
  AccountAllowedIPAddressesPage,
  AccountApiKeysPage,
  AccountAppearancePage,
  AccountBackupAndRecoveryPage,
  AccountBasicPage,
  AccountCompanyProfilePage,
  AccountCurrentSessionsPage,
  AccountDeviceManagementPage,
  AccountEnterprisePage,
  AccountGetStartedPage,
  AccountHistoryPage,
  AccountImportMembersPage,
  AccountIntegrationsPage,
  AccountInviteAFriendPage,
  AccountMembersStarterPage,
  AccountNotificationsPage,
  AccountOverviewPage,
  AccountPermissionsCheckPage,
  AccountPermissionsTogglePage,
  AccountPlansPage,
  AccountPrivacySettingsPage,
  AccountRolesPage,
  AccountSecurityGetStartedPage,
  AccountSecurityLogPage,
  AccountSettingsEnterprisePage,
  AccountSettingsModalPage,
  AccountSettingsPlainPage,
  AccountSettingsSidebarPage,
  AccountTeamInfoPage,
  AccountTeamMembersPage,
  AccountTeamsPage,
  AccountTeamsStarterPage,
  AccountUserProfilePage
} from '@/others/account';
import {
  NetworkAppRosterPage,
  NetworkMarketAuthorsPage,
  NetworkAuthorPage,
  NetworkGetStartedPage,
  NetworkMiniCardsPage,
  NetworkNFTPage,
  NetworkSocialPage,
  NetworkUserCardsTeamCrewPage,
  NetworkSaasUsersPage,
  NetworkStoreClientsPage,
  NetworkUserTableTeamCrewPage,
  NetworkVisitorsPage
} from '@/others/network';

import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { AppLayout } from '@/layouts/applayout';
import { ErrorsRouting } from '@/errors';
import {
  AuthenticationWelcomeMessagePage,
  AuthenticationAccountDeactivatedPage,
  AuthenticationGetStartedPage
} from '@/pages/authentication';

import { FinancialAccountOverviewPage } from '@/pages/financial-account/pages/financial-account-overview/financial-account-overview.component';
import { PaymentPage } from '@/pages/financial-account/pages/payment/payment.page';
import { SubjectPreselectionPage, SubjectSelectionPage } from '@/pages/processes/pages';
import { AcademicSchedulePage, QualificationPage } from '@/pages/revision/pages';
import { CareerCurriculumPage } from '@/pages/academic-record/pages/career-curriculum';
import { RecordCareerPage } from '@/pages/academic-record/pages';
import { SupportCenterPage } from '@/pages/help/pages/support-center/support-center.component';
import { ProfileDetailsPage } from '@/pages/profile/pages';

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* <Route path="/profile/change-password" element={<ChangePasswordPage />} /> */}

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          {/* Dashboard Pages */}
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<AppLayoutDarkSidebarPage />} />

          {/* Profile Pages */}
          <Route path="/profile/details" element={<ProfileDetailsPage />} />
          {/* aqui va la ruta de change-password esta afuera para poder probar ya que la api de login para pruebas dejo de funcionar */}

          {/* Financial Account Pages */}

          <Route path="/financial-account/overview" element={<FinancialAccountOverviewPage />} />
          <Route path="/financial-account/payment" element={<PaymentPage amount={0} concept="" />} />

          {/* Processes Pages */}

          <Route
            path="/processes/subject-selection/:usuarioId?"
            element={<SubjectSelectionPage />}
          />

          <Route
            path="/processes/subject-preselection/:usuarioId?"
            element={<SubjectPreselectionPage />}
          />

          {/* Revision Pages */}

          <Route path="/revision/academic-schedule" element={<AcademicSchedulePage />} />

          <Route path="/revision/qualification" element={<QualificationPage />} />

          {/*Academic Record Pages */}

          <Route path="/academic-record/career-curriculum" element={<CareerCurriculumPage />} />

          <Route path="/academic-record/record-career" element={<RecordCareerPage />} />

          {/* Help Pages */}

          <Route path="/help/support-center" element={<SupportCenterPage />} />

          {/* Others */}

          <Route path="/account/home/get-started" element={<AccountGetStartedPage />} />
          <Route path="/account/home/user-profile" element={<AccountUserProfilePage />} />
          <Route path="/account/home/company-profile" element={<AccountCompanyProfilePage />} />
          <Route path="/account/home/settings-sidebar" element={<AccountSettingsSidebarPage />} />
          <Route
            path="/account/home/settings-enterprise"
            element={<AccountSettingsEnterprisePage />}
          />
          <Route path="/account/home/settings-plain" element={<AccountSettingsPlainPage />} />
          <Route path="/account/home/settings-modal" element={<AccountSettingsModalPage />} />
          <Route path="/account/billing/basic" element={<AccountBasicPage />} />
          <Route path="/account/billing/enterprise" element={<AccountEnterprisePage />} />
          <Route path="/account/billing/plans" element={<AccountPlansPage />} />
          <Route path="/account/billing/history" element={<AccountHistoryPage />} />
          <Route path="/account/security/get-started" element={<AccountSecurityGetStartedPage />} />
          <Route path="/account/security/overview" element={<AccountOverviewPage />} />
          <Route
            path="/account/security/allowed-ip-addresses"
            element={<AccountAllowedIPAddressesPage />}
          />
          <Route
            path="/account/security/privacy-settings"
            element={<AccountPrivacySettingsPage />}
          />
          <Route
            path="/account/security/device-management"
            element={<AccountDeviceManagementPage />}
          />
          <Route
            path="/account/security/backup-and-recovery"
            element={<AccountBackupAndRecoveryPage />}
          />
          <Route
            path="/account/security/current-sessions"
            element={<AccountCurrentSessionsPage />}
          />
          <Route path="/account/security/security-log" element={<AccountSecurityLogPage />} />
          <Route path="/account/members/team-starter" element={<AccountTeamsStarterPage />} />
          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route path="/account/members/team-info" element={<AccountTeamInfoPage />} />
          <Route path="/account/members/members-starter" element={<AccountMembersStarterPage />} />
          <Route path="/account/members/team-members" element={<AccountTeamMembersPage />} />
          <Route path="/account/members/import-members" element={<AccountImportMembersPage />} />
          <Route
            path="/account/members/import { Route } from 'react-router-dom'; roles"
            element={<AccountRolesPage />}
          />
          <Route
            path="/account/members/permissions-toggle"
            element={<AccountPermissionsTogglePage />}
          />
          <Route
            path="/account/members/permissions-check"
            element={<AccountPermissionsCheckPage />}
          />
          <Route path="/account/integrations" element={<AccountIntegrationsPage />} />
          <Route path="/account/notifications" element={<AccountNotificationsPage />} />
          <Route path="/account/api-keys" element={<AccountApiKeysPage />} />
          <Route path="/account/appearance" element={<AccountAppearancePage />} />
          <Route path="/account/invite-a-friend" element={<AccountInviteAFriendPage />} />
          <Route path="/account/activity" element={<AccountActivityPage />} />
          <Route path="/network/get-started" element={<NetworkGetStartedPage />} />
          <Route path="/network/user-cards/mini-cards" element={<NetworkMiniCardsPage />} />
          <Route path="/network/user-cards/team-crew" element={<NetworkUserCardsTeamCrewPage />} />
          <Route path="/network/user-cards/author" element={<NetworkAuthorPage />} />
          <Route path="/network/user-cards/nft" element={<NetworkNFTPage />} />
          <Route path="/network/user-cards/social" element={<NetworkSocialPage />} />
          <Route path="/network/user-table/team-crew" element={<NetworkUserTableTeamCrewPage />} />
          <Route path="/network/user-table/app-roster" element={<NetworkAppRosterPage />} />
          <Route path="/network/user-table/market-authors" element={<NetworkMarketAuthorsPage />} />
          <Route path="/network/user-table/saas-users" element={<NetworkSaasUsersPage />} />
          <Route path="/network/user-table/store-clients" element={<NetworkStoreClientsPage />} />
          <Route path="/network/user-table/visitors" element={<NetworkVisitorsPage />} />
          <Route path="/auth/welcome-message" element={<AuthenticationWelcomeMessagePage />} />
          <Route
            path="/auth/account-deactivated"
            element={<AuthenticationAccountDeactivatedPage />}
          />
          <Route path="/authentication/get-started" element={<AuthenticationGetStartedPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
