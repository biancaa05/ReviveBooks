<template>
  <div class="alerts-page">
    <div class="alerts-header">
      <h1>Notificări & Schimburi</h1>
      <span class="alerts-count" v-if="alerts.length">{{ alerts.length }} noi</span>
    </div>

    <div class="alerts-container">
      <div v-if="alerts.length === 0" class="empty-state">
        <p>Nu ai nicio alertă nouă momentan.</p>
      </div>

      <div class="alert-card" v-for="alert in alerts" :key="alert.id">
        <div class="alert-avatar" :style="{ backgroundColor: alert.avatarColor }">
          {{ alert.userInitials }}
        </div>
        
        <div class="alert-content">
          <p class="alert-text">
            <strong>{{ alert.userName }}</strong> vrea cartea ta 
            <span class="book-highlight">„{{ alert.bookTitle }}”</span>
          </p>
          <span class="alert-time">{{ alert.timeAgo }}</span>
        </div>

        <div class="alert-actions">
          <button class="vinted-btn-primary" @click="acceptSwap(alert.id)">
            Acceptă & Schimbă
          </button>
          <button class="vinted-btn-outline" @click="refuseSwap(alert.id)">
            Refuză
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/alerts.css"></style>
<script src="@/assets/js/alerts.js"></script>