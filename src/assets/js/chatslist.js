export default {
  name: 'ChatsList',
  data() {
    return {
      chats: [
        {
          id: 1,
          userName: 'Ana Popescu',
          userInitials: 'A',
          avatarColor: '#043c25',
          bookTitle: 'Normal People',
          lastMessage: 'Bună! Mai este disponibilă cartea pentru schimb?',
          time: '14:25'
        },
        {
          id: 2,
          userName: 'Mihai Dumitrescu',
          userInitials: 'M',
          avatarColor: '#1b4332',
          bookTitle: 'Atomic Habits',
          lastMessage: 'Mulțumesc frumos pentru schimb! Recomand cu drag.',
          time: 'Ieri'
        }
      ]
    }
  },
  methods: {
    openChat(id) {
      // Navighează către fereastra de chat individuală
      this.$router.push(`/chat/${id}`);
    }
  }
}