<template>
  <div class="add-book-page">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Editează anunțul cărții' : 'Adaugă o carte pentru schimb' }}</h1>
      <p class="subtitle">{{ isEditMode ? 'Modifică detaliile de mai jos' : 'Completează detaliile de mai jos' }}</p>
    </div>

    <div class="form-container">
      <div class="form-card">
        
        <!-- Câmpul ISBN & AI Helper -->
        <div class="isbn-section">
          <div class="form-group flex-grow">
            <label>Cod ISBN</label>
            <input type="text" v-model="form.isbn" placeholder="Ex: 978-973-46-..." />
          </div>
        </div>

        <div class="form-group">
          <label>Titlul cărții</label>
          <input type="text" v-model="form.title" placeholder="Ex: Normal People" />
        </div>

        <div class="form-group">
          <label>Autorul</label>
          <input type="text" v-model="form.author" placeholder="Ex: Sally Rooney" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Gen literar</label>
            <select v-model="form.genre">
              <option value="Fiction">Ficțiune / Roman</option>
              <option value="Personal Development">Dezvoltare personală</option>
              <option value="SF & Fantasy">SF & Fantasy</option>
              <option value="Thriller">Thriller / Mister</option>
              <option value="Biography">Biografie</option>
            </select>
          </div>

          <div class="form-group">
            <label>Starea cărții</label>
            <select v-model="form.condition">
              <option value="Nouă">Nouă (sigilată)</option>
              <option value="Ca nouă">Ca nouă (fără defecte)</option>
              <option value="Bună">Bună (uzură normală)</option>
              <option value="Acceptabilă">Acceptabilă</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Descriere / Detalii despre starea fizică</label>
          <textarea v-model="form.description" rows="4" placeholder="Menționează detalii"></textarea>
        </div>

        <div class="form-group">
          <label>Încarcă o poză a cărții</label>
          <div class="upload-box" @click="triggerUpload">
            <span>📷 Apasă pentru a selecta o imagine</span>
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
          </div>
          <span class="file-name" v-if="fileName">Fișier selectat: {{ fileName }}</span>
        </div>

        <div class="form-actions">
          <button class="vinted-btn-outline" @click="goBack">Anulează</button>
          <button class="vinted-btn-primary" @click="submitBook">
            {{ isEditMode ? 'Salvează modificările' : 'Publică anunțul' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/add.js"></script>
<style src="@/assets/css/add.css"></style>