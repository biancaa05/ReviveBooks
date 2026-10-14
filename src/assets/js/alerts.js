export default {
  name: 'AlertsView',
  data() {
    return {
      alerts: [
        {
          id: 1,
          userName: 'Ana Popescu',
          userInitials: 'A',
          avatarColor: '#043c25',
          bookTitle: 'Normal People',
          timeAgo: 'Acum 10 min'
        },
        {
          id: 2,
          userName: 'Mihai Dumitrescu',
          userInitials: 'M',
          avatarColor: '#1b4332',
          bookTitle: 'Atomic Habits',
          timeAgo: 'Acum 2 ore'
        }
      ]
    }
  },
  methods: {
    acceptSwap(id) {
      alert(`Ai acceptat schimbul pentru alerta #${id}!`);
      this.alerts = this.alerts.filter(a => a.id !== id);
    },
    refuseSwap(id) {
      this.alerts = this.alerts.filter(a => a.id !== id);
    }
  }
}