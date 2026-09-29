<template>
  <div class="settings-page">
    <div class="page-header">
      <h1>Setări Cont</h1>
      <p class="subtitle">Gestionează-ți preferințele și detaliile personale</p>
    </div>

    <div class="settings-container">
      <div class="settings-card">
        <h3>Informații Personale</h3>
        <div class="form-group">
          <label>Nume complet</label>
          <input type="text" v-model="form.name" placeholder="Numele tău" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="email@exemplu.ro" />
        </div>
        <div class="form-group">
          <label>Oraș implicit pentru predare</label>
          <input type="text" v-model="form.city" placeholder="Ex: București" />
        </div>
      </div>

      <div class="settings-card">
        <h3>Securitate & Parolă</h3>
        <div class="form-group">
          <label>Parolă actuală</label>
          <input type="password" v-model="form.currentPassword" placeholder="••••••••" />
        </div>
        <div class="form-group">
          <label>Parolă nouă</label>
          <input type="password" v-model="form.newPassword" placeholder="••••••••" />
        </div>
      </div>

      <div class="settings-actions">
        <button class="vinted-btn-primary" @click="saveSettings">Salvează modificările</button>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/settings.js"></script>
<style src="@/assets/css/settings.css"></style>