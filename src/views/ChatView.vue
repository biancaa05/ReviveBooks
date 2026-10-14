<template>
  <div class="chat-detail-page">
    <!-- Header-ul conversației -->
    <div class="chat-detail-header">
      <button class="back-btn" @click="goBack">←</button>
      <div class="chat-header-user">
        <div class="header-avatar" :style="{ backgroundColor: partner.avatarColor }">
          {{ partner.initials }}
        </div>
        <div>
          <h2>{{ partner.name }}</h2>
          <span class="partner-status">{{ partner.status }}</span>
        </div>
      </div>

      <!-- Butonul / Statusul de Livrare -->
      <div class="delivery-status-container">
        <button 
          class="delivery-status-btn" 
          :class="{ 'ready': myDeliveryReady }"
          @click="toggleDeliveryReady"
        >
          📦 Gata de livrare ({{ deliveryCount }}/2)
        </button>
      </div>

      <div class="header-book-info">
        <span>Carte: <strong>{{ book.title }}</strong></span>
      </div>
    </div>

    <!-- Zona de mesaje -->
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="msg in messages" 
        :key="msg.id" 
        :class="['message-bubble', msg.sender === 'me' ? 'sent' : 'received']"
      >
        <p class="message-text">{{ msg.text }}</p>
        <span class="message-time">{{ msg.time }}</span>
      </div>
    </div>

    <!-- Bara de input pentru trimitere mesaj -->
    <div class="chat-input-bar">
      <input 
        type="text" 
        v-model="newMessage" 
        @keyup.enter="sendMessage" 
        placeholder="Scrie un mesaj..." 
      />
      <button class="vinted-btn-primary send-btn" @click="sendMessage">Trimite</button>
    </div>

    <!-- Modal / Ecran de Livrare detaliat -->
    <div class="delivery-modal-overlay" v-if="showDeliveryScreen">
      <div class="delivery-modal-content">
        <h2>🚀 Detalii Livrare & Colet</h2>
        <p class="delivery-subtitle">Ambele părți au confirmat schimbul pentru <strong>„{{ book.title }}”</strong>. Completează adresa completă de expediere:</p>

        <div class="delivery-form-grid">
          <div class="form-group">
            <label>Județ:</label>
            <input type="text" v-model="deliveryForm.county" placeholder="Ex: București / Cluj" />
          </div>

          <div class="form-group">
            <label>Oraș / Localitate:</label>
            <input type="text" v-model="deliveryForm.city" placeholder="Ex: Sector 1 / Cluj-Napoca" />
          </div>

          <div class="form-group full-width">
            <label>Stradă și Număr:</label>
            <input type="text" v-model="deliveryForm.street" placeholder="Ex: Str. Libertății, Nr. 10" />
          </div>

          <div class="form-group">
            <label>Cod Poștal:</label>
            <input type="text" v-model="deliveryForm.zipCode" placeholder="Ex: 010101" />
          </div>

          <div class="form-group">
            <label>Detalii Extra (Bloc, Ap, Interfon):</label>
            <input type="text" v-model="deliveryForm.extra" placeholder="Ex: Bl. A2, Sc. 1, Ap. 14" />
          </div>
        </div>

        <div class="form-group courier-section">
          <label>Alege curierul:</label>
          <div class="courier-options">
            <label class="courier-card" :class="{ selected: deliveryForm.courier === 'fancourier' }">
              <input type="radio" value="fancourier" v-model="deliveryForm.courier" />
              <span>Fan Courier</span>
            </label>
            <label class="courier-card" :class="{ selected: deliveryForm.courier === 'sameday' }">
              <input type="radio" value="sameday" v-model="deliveryForm.courier" />
              <span>Sameday Easybox</span>
            </label>
            <label class="courier-card" :class="{ selected: deliveryForm.courier === 'cargus' }">
              <input type="radio" value="cargus" v-model="deliveryForm.courier" />
              <span>Cargus</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="vinted-btn-outline" @click="showDeliveryScreen = false">Înapoi la chat</button>
          <button class="vinted-btn-primary" @click="confirmShipping">Generează AWB</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/chat.js"></script>
<style src="@/assets/css/chat.css"></style>