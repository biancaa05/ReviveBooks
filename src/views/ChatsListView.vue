<template>
  <div class="chats-page">
    <div class="chats-header">
      <h1>Mesaje</h1>
      <span class="chats-badge" v-if="chats.length">{{ chats.length }} conversații</span>
    </div>

    <div class="chats-list">
      <div v-if="chats.length === 0" class="empty-state">
        <p>Nu ai nicio conversație activă.</p>
      </div>

      <div 
        class="chat-item-card" 
        v-for="chat in chats" 
        :key="chat.id"
        @click="openChat(chat.id)"
      >
        <div class="chat-avatar" :style="{ backgroundColor: chat.avatarColor }">
          {{ chat.userInitials }}
        </div>

        <div class="chat-info">
          <div class="chat-top-row">
            <h3 class="chat-username">{{ chat.userName }}</h3>
            <span class="chat-time">{{ chat.time }}</span>
          </div>
          <p class="chat-book">Carte: <strong>{{ chat.bookTitle }}</strong></p>
          <p class="chat-last-message">{{ chat.lastMessage }}</p>
        </div>

        <div class="chat-arrow">
          <span>&gt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/chatslist.js"></script>
<style src="@/assets/css/chatslist.css"></style>