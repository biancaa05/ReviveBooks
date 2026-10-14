<template>
<<<<<<< HEAD
  <div class="bg-[#f5f6f5] py-8" data-testid="add-page">
    <form @submit.prevent="submit" class="mx-auto flex max-w-[808px] flex-col gap-4 px-3">
      <h1 class="text-2xl font-semibold">Adaugă o carte</h1>

      <section class="flex flex-col gap-5 bg-white p-6 sm:flex-row">
        <div class="aspect-[2/3] w-full shrink-0 overflow-hidden rounded-sm sm:w-44" data-testid="add-cover-preview">
          <BookCover :book="{ ...form, title: form.title || 'Titlul cărții' }" />
        </div>
        <div>
          <p class="font-medium">Coperta</p>
          <p class="mt-1 text-sm text-muted">Alege culoarea copertei cărții tale.</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button v-for="c in coverColors" :key="c" type="button" @click="form.bgColor = c" :data-testid="`cover-color-${c.slice(1)}`"
              :class="['h-9 w-9 rounded-full ring-offset-2 transition-transform hover:scale-110', form.bgColor === c ? 'ring-2 ring-brand' : '']" :style="{ backgroundColor: c }"></button>
          </div>
        </div>
      </section>

      <section class="bg-white px-6">
        <label v-for="f in textFields" :key="f.key" class="flex flex-col gap-2 border-b border-line py-5 last:border-0 sm:flex-row sm:items-center">
          <span class="w-56 shrink-0">{{ f.label }}</span>
          <component :is="f.area ? 'textarea' : 'input'" v-model="form[f.key]" :placeholder="f.placeholder" :required="f.required" :rows="3"
            :data-testid="`add-${f.key}-input`" class="flex-1 border-b border-line py-1 outline-none focus:border-brand" />
        </label>
      </section>

      <section class="bg-white px-6">
        <label v-for="s in selects" :key="s.key" class="flex flex-col gap-2 border-b border-line py-5 last:border-0 sm:flex-row sm:items-center">
          <span class="w-56 shrink-0">{{ s.label }}</span>
          <select v-model="form[s.key]" :data-testid="`add-${s.key}-select`" class="flex-1 border-b border-line bg-white py-1 outline-none focus:border-brand">
            <option v-for="o in s.options" :key="o">{{ o }}</option>
          </select>
        </label>
      </section>

      <div class="flex justify-end">
        <button class="rounded bg-brand px-8 py-2.5 text-white transition-colors hover:bg-brand-dark" data-testid="add-submit-btn">Adaugă</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import BookCover from '@/components/BookCover.vue'
import { store, addBook, categories, conditions, coverColors } from '@/stores/books'

const router = useRouter()
const form = reactive({ title: '', author: '', description: '', wants: '', category: categories[0], condition: conditions[1], language: 'Română', year: 2024, bgColor: coverColors[0] })
const textFields = [
  { key: 'title', label: 'Titlu', placeholder: 'ex. Maitreyi', required: true },
  { key: 'author', label: 'Autor', placeholder: 'ex. Mircea Eliade', required: true },
  { key: 'description', label: 'Descrie cartea', placeholder: 'ex. citită o dată, fără sublinieri', area: true },
  { key: 'wants', label: 'Ce ai vrea în schimb', placeholder: 'ex. orice roman clasic', required: true },
]
const selects = [
  { key: 'category', label: 'Gen', options: categories },
  { key: 'condition', label: 'Stare', options: conditions },
  { key: 'language', label: 'Limba', options: ['Română', 'Engleză', 'Franceză', 'Germană', 'Spaniolă'] },
]
const submit = () => { store.loggedIn = true; router.push(`/book/${addBook({ ...form })}`) }
</script>
=======
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
>>>>>>> f152b90 (Added all pages and some functionalities)
