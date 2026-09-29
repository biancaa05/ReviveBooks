<template>
  <div class="app-container">
    <!-- BARĂ SUS (Desktop) -->
    <header class="desktop-navbar">
      <div class="navbar-content">
        <router-link to="/" class="desktop-logo">
          <img src="@/assets/logo.png" alt="ReviveBooks Logo" class="brand-logo-img" />
        </router-link>
        <nav class="desktop-menu">
          <router-link to="/" class="desktop-link">Home</router-link>
          <router-link to="/alerts" class="desktop-link">Alerts</router-link>
          <router-link to="/chats" class="desktop-link">Chat</router-link>
          <router-link to="/profile" class="desktop-link">Profile</router-link>
        </nav>
      </div>
    </header>

    <!-- CONȚINUTUL PAGINILOR -->
    <main class="page-content">
      <router-view />
    </main>

    <!-- BARA DE JOS (Mobil) -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <span>🏠</span>
        <span>Home</span>
      </router-link>
      <router-link to="/alerts" class="nav-item">
        <span>🔔</span>
        <span>Alerts</span>
      </router-link>
      <router-link to="/chats" class="nav-item">
        <span>💬</span>
        <span>Chat</span>
      </router-link>
      <router-link to="/profile" class="nav-item">
        <span>👤</span>
        <span>Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<style src="@/assets/css/app.css"></style>