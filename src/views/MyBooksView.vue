<template>
  <div>
    <PageHead eyebrow="Raftul meu" title="Cărțile mele puse la schimb">
      <router-link to="/add" :class="$ui.btn" data-testid="mybooks-add-btn"><Plus :size="18" /> Adaugă o carte</router-link>
    </PageHead>

    <div v-if="myBooks.length === 0" :class="$ui.empty" data-testid="mybooks-empty-state">
      <BookOpen :size="28" />
      <p>Nu ai nicio carte pusă la schimb.</p>
    </div>

    <transition-group v-else tag="div" class="grid gap-3.5 md:grid-cols-2 md:gap-5 xl:grid-cols-3" leave-active-class="transition duration-250" leave-to-class="opacity-0 scale-95">
      <article v-for="book in myBooks" :key="book.id" :class="[$ui.panel, 'animate-rise flex gap-[18px] p-4 md:p-5 transition-[box-shadow,border-color] hover:shadow-lift hover:border-line-2']" :data-testid="`mybook-card-${book.id}`">
        <div class="shrink-0 w-[92px] md:w-[110px]"><BookCover :title="book.title" :author="book.author" :color="book.bg" /></div>
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          <span :class="['self-start px-2.5 py-[3px] rounded-full text-[0.72rem] font-semibold', book.status === 'Disponibilă' ? 'bg-brand-soft text-brand' : 'bg-[#fff4d6] text-[#7a5300]']">{{ book.status }}</span>
          <h3 class="font-display font-normal text-[1.35rem] leading-tight mt-1.5">{{ book.title }}</h3>
          <p class="text-muted text-[0.9rem]">{{ book.author }}</p>
          <div class="flex flex-wrap gap-2 mt-auto pt-3.5">
            <button :class="[$ui.btnOutline, $ui.sm]" :data-testid="`edit-book-btn-${book.id}`" @click="editBook(book)">
              <Pencil :size="15" /> Editează
            </button>
            <button class="inline-flex items-center gap-1.5 h-[38px] px-3.5 rounded-full text-[#b42318] font-semibold text-[0.86rem] cursor-pointer transition-colors hover:bg-[#fdecea]" :data-testid="`delete-book-btn-${book.id}`" @click="deleteBook(book.id)">
              <Trash2 :size="15" /> Șterge
            </button>
          </div>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script src="@/assets/js/mybooks.js"></script>
