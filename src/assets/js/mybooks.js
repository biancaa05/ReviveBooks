export default {
  name: 'MyBooksView',
  data() {
    return {
      myBooks: [
        { id: 1, title: 'Normal People', author: 'Sally Rooney', status: 'Disponibilă', bg: '#043c25' },
        { id: 2, title: 'Atomic Habits', author: 'James Clear', status: 'În tranzit', bg: '#1b4332' }
      ]
    }
  },
  methods: {
    editBook(book) {
      this.$router.push({
        path: '/add',
        query: { edit: 'true', title: book.title, author: book.author }
      });
    },
    deleteBook(id) {
      this.myBooks = this.myBooks.filter(b => b.id !== id);
    }
  }
}