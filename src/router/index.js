import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import AddView from '../views/AddView.vue'
import ProfileView from '../views/ProfileView.vue'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/book/:id', name: 'book', component: BookView },
    { path: '/add', name: 'add', component: AddView },
    { path: '/profile', name: 'profile', component: ProfileView },
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
  ],
})

export default router