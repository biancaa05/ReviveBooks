<template>
  <div class="app-container">
    <!-- Desktop Navbar -->
    <header class="desktop-navbar">
      <div class="navbar-content">
        <router-link to="/" class="desktop-logo" data-testid="brand-logo">
          <img src="@/assets/logo.png" alt="ReviveBooks Logo" class="brand-logo-img" />
          <span class="brand-wordmark">
            <span class="brand-name">Revive<em>Books</em></span>
            <span class="brand-tag">schimburi cu suflet</span>
          </span>
        </router-link>
        <nav class="desktop-menu">
          <router-link to="/" class="desktop-link" data-testid="nav-home">Acasă</router-link>
          <router-link to="/alerts" class="desktop-link" data-testid="nav-alerts">Notificări</router-link>
          <router-link to="/chats" class="desktop-link" data-testid="nav-chats">Mesaje</router-link>
          <router-link to="/premium" class="desktop-link" data-testid="nav-premium">Premium</router-link>
          <router-link to="/profile" class="desktop-link" data-testid="nav-profile">Profil</router-link>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="page-content">
      <router-view />
    </main>

    <!-- Mobile bottom nav -->
    <nav class="bottom-nav" data-testid="mobile-nav">
      <router-link to="/" class="nav-item" data-testid="mob-nav-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10 12 3l8 7v10a1 1 0 0 1-1 1h-4v-7h-6v7H5a1 1 0 0 1-1-1V10z" />
        </svg>
        <span>Acasă</span>
      </router-link>
      <router-link to="/alerts" class="nav-item" data-testid="mob-nav-alerts">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15V10a6 6 0 1 0-12 0v5l-2 3h16l-2-3z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
        <span>Alerte</span>
      </router-link>
      <router-link to="/chats" class="nav-item" data-testid="mob-nav-chats">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1.2 3A8 8 0 0 1 21 12z" />
        </svg>
        <span>Mesaje</span>
      </router-link>
      <router-link to="/profile" class="nav-item" data-testid="mob-nav-profile">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        <span>Profil</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default { name: "App" };
</script>
