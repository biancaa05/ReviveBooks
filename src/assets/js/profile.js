export default {
  name: 'Profile',
  data() {
    return {
      currentTab: 'books',
      tabs: [
        { id: 'books', label: '📖 Cărțile mele' },
        { id: 'deliveries', label: '🚀 Livrări' },
        { id: 'alerts', label: '🔔 Notificări' },
        { id: 'settings', label: '⚙️ Setări' }
      ],
      myBooks: [
        { id: 1, title: 'Normal People', author: 'Sally Rooney', condition: 'Ca nouă', bgColor: 'linear-gradient(135deg, #09b1ba, #043c25)' },
        { id: 2, title: 'Atomic Habits', author: 'James Clear', condition: 'Excelentă', bgColor: 'linear-gradient(135deg, #2d6a4f, #1b4332)' }
      ],
      deliveries: [
        { id: 1, bookTitle: 'Normal People', courier: 'Fan Courier', awb: 'AWB9382104', status: 'În tranzit' }
      ]
    }
  },
  methods: {
    saveSettings() {
      alert('Modificările au fost salvate cu succes!');
    }
  }
}