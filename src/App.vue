<template>
  <div class="flex min-h-screen w-full flex-col relative">
    <!-- Top bar (Desktop, hidden on mobile) -->
    <header
      class="hidden md:flex sticky top-0 z-[1000] w-full border-b border-line bg-white"
    >
      <div class="flex w-full items-center justify-between px-10 py-2.5">
        <router-link
          to="/"
          class="desktop-logo flex h-[70px] items-center justify-center no-underline"
        >
          <img
            src="@/assets/logo.png"
            alt="ReviveBooks Logo"
            class="h-[150px] w-auto object-contain"
          />
        </router-link>
        <nav class="flex gap-[30px]">
          <router-link
            to="/"
            class="desktop-link text-[0.95rem] font-semibold text-slate-600 no-underline transition-colors hover:text-brand"
          >Home</router-link>
          <router-link
            to="/alerts"
            class="desktop-link text-[0.95rem] font-semibold text-slate-600 no-underline transition-colors hover:text-brand"
          >Alerts</router-link>
          <router-link
            to="/chats"
            class="desktop-link text-[0.95rem] font-semibold text-slate-600 no-underline transition-colors hover:text-brand"
          >Chat</router-link>
          <router-link
            to="/profile"
            class="desktop-link text-[0.95rem] font-semibold text-slate-600 no-underline transition-colors hover:text-brand"
          >Profile</router-link>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="w-full flex-1 px-6 py-6 pb-[90px] md:px-10 md:pb-6">
      <router-view />
    </main>

    <!-- Bottom nav (Mobile only) -->
    <nav
      class="fixed inset-x-0 bottom-0 z-[99999] flex h-[60px] items-center justify-around border-t border-line bg-white md:hidden"
    >
      <router-link
        to="/"
        class="nav-item flex flex-col items-center gap-0.5 text-[0.75rem] text-muted no-underline"
      >
        <span class="text-[1.2rem]">🏠</span>
        <span>Home</span>
      </router-link>
      <router-link
        to="/alerts"
        class="nav-item flex flex-col items-center gap-0.5 text-[0.75rem] text-muted no-underline"
      >
        <span class="text-[1.2rem]">🔔</span>
        <span>Alerts</span>
      </router-link>
      <router-link
        to="/chats"
        class="nav-item flex flex-col items-center gap-0.5 text-[0.75rem] text-muted no-underline"
      >
        <span class="text-[1.2rem]">💬</span>
        <span>Chat</span>
      </router-link>
      <router-link
        to="/profile"
        class="nav-item flex flex-col items-center gap-0.5 text-[0.75rem] text-muted no-underline"
      >
        <span class="text-[1.2rem]">👤</span>
        <span>Profile</span>
      </router-link>
    </nav>
  </div>
</template>
