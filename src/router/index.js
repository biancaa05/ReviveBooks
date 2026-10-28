import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import AddView from '../views/AddView.vue'
import ProfileView from '../views/ProfileView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import AlertsView from '../views/AlertsView.vue'
import ChatsView from '../views/ChatsView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import SettingsView from '../views/SettingsView.vue'
import AccountSettings from '../components/settings/AccountSettings.vue'
import NotificationSettings from '../components/settings/NotificationSettings.vue'
import PrivacySettings from '../components/settings/PrivacySettings.vue'
import SecuritySettings from '../components/settings/SecuritySettings.vue'
import ShippingSettings from '../components/settings/ShippingSettings.vue'
import ProfileSettings from '../components/settings/ProfileSettings.vue'
import FaqView from '../views/FaqView.vue'
import PremiumView from '../views/PremiumView.vue'
import LoginView from '../views/LoginView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'
import CookiesView from '../views/CookiesView.vue'
import CookieSettingsView from '../views/CookieSettingsView.vue'
import PlatformView from '../views/PlatformView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/book/:id', name: 'book', component: BookView },
    { path: '/add', name: 'add', component: AddView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/user/:id', name: 'user', component: UserProfileView },
    { path: '/alerts', name: 'alerts', component: AlertsView },
    { path: '/chats', name: 'chats', component: ChatsView },
    { path: '/chat/:id', name: 'chat', component: ChatsView },
    { path: '/favorites', name: 'favorites', component: FavoritesView },
    { path: '/settings/:tab?', name: 'settings', component: SettingsView },
    { path: '/account', name: 'account', component: AccountSettings },
    { path: '/notifications', name: 'notifications', component: NotificationSettings },
    { path: '/privacy', name: 'privacy', component: PrivacySettings },
    { path: '/security', name: 'security', component: SecuritySettings },
    { path: '/shipping', name: 'shipping', component: ShippingSettings },
    { path: '/profile-settings', name: 'profile-settings', component: ProfileSettings },
    { path: '/faq', name: 'faq', component: FaqView },
    { path: '/premium', name: 'premium', component: PremiumView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/privacy', name: 'privacy-policy', component: PrivacyView },
    { path: '/terms', name: 'terms', component: TermsView },
    { path: '/cookies', name: 'cookie-policy', component: CookiesView },
    { path: '/cookie-settings', name: 'cookie-settings', component: CookieSettingsView },
    { path: '/platform', name: 'platform', component: PlatformView },
  ],
})

export default router