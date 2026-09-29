import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import ProfileView from '../views/ProfileView.vue'
import MyBooksView from '../views/MyBooksView.vue'
import DeliveriesView from '../views/DeliveriesView.vue'
import AlertsView from '../views/AlertsView.vue'
import SettingsView from '../views/SettingsView.vue'
import PremiumView from '../views/PremiumView.vue'
import ChatsListView from '../views/ChatsListView.vue'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/add', name: 'add', component: AddView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/my-books', name: 'myBooks', component: MyBooksView },
    { path: '/deliveries', name: 'deliveries', component: DeliveriesView },
    { path: '/alerts', name: 'alerts', component: AlertsView },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/premium', name: 'premium', component: PremiumView },
    { path: '/chats', name: 'ChatsList', component: ChatsListView },
    { path: '/chat/:id', name: 'Chat', component: ChatView },
  ]
})

export default router