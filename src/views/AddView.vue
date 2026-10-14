<template>
  <div class="bg-[#f5f6f5] py-8" data-testid="add-page">
    <form @submit.prevent="submit" class="mx-auto flex max-w-[808px] flex-col gap-4 px-3">
      <h1 class="text-2xl font-semibold">Adaugă o carte</h1>

      <section class="flex flex-col gap-5 bg-white p-6 sm:flex-row">
        <div class="aspect-[2/3] w-full shrink-0 overflow-hidden rounded-sm sm:w-44" data-testid="add-cover-preview">
          <BookCover :book="{ ...form, title: form.title || 'Titlul cărții' }" />
        </div>
        <div class="flex-1">
          <p class="font-medium">Copertă</p>
          <p class="mt-1 text-sm text-muted">Alege o imagine pentru copertă sau folosește varianta implicită.</p>

          <div class="mt-4 flex flex-wrap items-start gap-3" data-testid="image-gallery">
            <div v-for="(img, i) in form.images" :key="i"
              class="group relative h-20 w-16 overflow-hidden rounded-md ring-2 ring-brand">
              <img :src="img" alt="" class="h-full w-full object-cover" :data-testid="`cover-thumb-${i}`" />
              <button type="button" @click="removeImage(i)" :data-testid="`remove-image-${i}`"
                class="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <AppIcon name="close" :size="20" />
              </button>
            </div>
            <label class="flex h-20 w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-line-2 text-brand hover:border-brand hover:bg-brand-soft/40" data-testid="pick-image-label">
              <AppIcon name="plus" :size="20" />
              <span class="text-[10px] font-semibold">Adaugă imagini</span>
              <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFiles" data-testid="pick-image-input" />
            </label>
          </div>

          <p v-if="!form.images.length" class="mt-3 flex items-center gap-2 text-xs text-muted" data-testid="default-cover-hint">
            <AppIcon name="info" :size="14" /> Folosește coperta implicită (verde)
          </p>
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
        <button class="rounded bg-brand px-8 py-2.5 text-white transition-colors hover:bg-brand-dark" data-testid="add-submit-btn">Publică cartea</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import BookCover from '@/components/BookCover.vue'
import AppIcon from '@/components/AppIcon.vue'
import { addBook, categories, conditions, readImage, DEFAULT_COVER_COLOR } from '@/stores/books'

const router = useRouter()

const form = reactive({
  title: '', author: '', description: '', wants: '',
  category: categories[0], condition: conditions[1], language: 'Română', year: 2024,
  bgColor: DEFAULT_COVER_COLOR,
  images: [],
})

const textFields = [
  { key: 'title', label: 'Titlul cărții', placeholder: 'Maitreyi', required: true },
  { key: 'author', label: 'Autor', placeholder: 'Mircea Eliade', required: true },
  { key: 'description', label: 'Descriere', placeholder: '...', area: true },
  { key: 'wants', label: 'Caută în schimb', placeholder: '...', required: true },
]
const selects = [
  { key: 'category', label: 'Gen', options: categories },
  { key: 'condition', label: 'Stare', options: conditions },
  { key: 'language', label: 'Limbă', options: ['Română', 'Engleză', 'Franceză', 'Germană', 'Spaniolă'] },
]

const onFiles = async (e) => {
  const files = Array.from(e.target.files || [])
  for (const f of files) {
    if (f && f.type.startsWith('image/')) {
      const dataUrl = await readImage(f)
      if (dataUrl) form.images.push(dataUrl)
    }
  }
  e.target.value = ''
}

const removeImage = (i) => { form.images.splice(i, 1) }

const submit = () => {
  const id = addBook({ ...form })
  router.push(`/book/${id}`)
}
</script>
