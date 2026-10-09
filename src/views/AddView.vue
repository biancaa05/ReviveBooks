<template>
  <div class="mx-auto flex w-full max-w-[700px] flex-col gap-5 pb-10">
    <div class="page-header-card block">
      <h1>{{ isEditMode ? 'Editează anunțul cărții' : 'Adaugă o carte pentru schimb' }}</h1>
      <p class="subtitle">
        {{ isEditMode ? 'Modifică detaliile de mai jos' : 'Completează detaliile de mai jos' }}
      </p>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-col gap-4 rounded-xl border border-line bg-white p-6">
        <div class="form-group">
          <label>Cod ISBN</label>
          <input type="text" v-model="form.isbn" placeholder="Ex: 978-973-46-..." />
        </div>

        <div class="form-group">
          <label>Titlul cărții</label>
          <input type="text" v-model="form.title" placeholder="Ex: Normal People" />
        </div>

        <div class="form-group">
          <label>Autorul</label>
          <input type="text" v-model="form.author" placeholder="Ex: Sally Rooney" />
        </div>

        <div class="grid grid-cols-2 gap-4">
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
          <div
            class="cursor-pointer rounded-lg border-2 border-dashed border-line-2 bg-canvas p-5 text-center text-[0.9rem] font-medium text-muted transition-all hover:border-brand hover:bg-brand-tint hover:text-brand"
            @click="triggerUpload"
          >
            <span>📷 Apasă pentru a selecta o imagine</span>
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
          </div>
          <span v-if="fileName" class="mt-1 text-[0.8rem] font-semibold text-brand">
            Fișier selectat: {{ fileName }}
          </span>
        </div>

        <div class="mt-2.5 flex gap-3">
          <button class="vinted-btn-outline !mt-0 flex-1 !py-3 !text-[0.95rem]" @click="goBack">
            Anulează
          </button>
          <button class="vinted-btn-primary flex-1 !py-3 !text-[0.95rem]" @click="submitBook">
            {{ isEditMode ? 'Salvează modificările' : 'Publică anunțul' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/add.js"></script>
