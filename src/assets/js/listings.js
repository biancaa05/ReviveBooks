import AddBookModal from '@/views/AddBookModal.vue';

export default {
  name: 'ListingsPage',
  components: { AddBookModal },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'Toate',
      isModalOpen: false,
      categories: ['Toate', 'Ficțiune', 'Dezvoltare Personală', 'Sci-Fi', 'Thriller', 'Biografii'],
      books: [
        { id: 1, title: 'Normal People', author: 'Sally Rooney', category: 'Ficțiune', condition: 'Ca nouă', owner: 'Ana P.', isPremium: true, bgColor: '#09b1ba' },
        { id: 2, title: 'Educated', author: 'Tara Westover', category: 'Biografii', condition: 'Bună', owner: 'Mihai D.', isPremium: true, bgColor: '#044e52' },
        { id: 3, title: 'Atomic Habits', author: 'James Clear', category: 'Dezvoltare Personală', condition: 'Excelentă', owner: 'Elena V.', isPremium: false, bgColor: '#10b981' },
        { id: 4, title: 'Dune', author: 'Frank Herbert', category: 'Sci-Fi', condition: 'Acceptabilă', owner: 'Radu M.', isPremium: false, bgColor: '#3b82f6' }
      ]
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const matchesCat = this.selectedCategory === 'Toate' || book.category === this.selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || book.author.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      });
    }
  },
  methods: {
    requestSwap(book) {
      this.$router.push({ path: '/chat-room', query: { user: book.owner, book: book.title } });
    },
    addNewBook(newBook) {
      this.books.unshift({ id: Date.now(), ...newBook, owner: 'Tu', isPremium: false, bgColor: '#09b1ba' });
      this.isModalOpen = false;
    }
  }
}