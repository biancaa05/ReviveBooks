export default {
  name: 'Chat',
  data() {
    return {
      partner: {
        name: 'Ana Popescu',
        initials: 'A',
        avatarColor: '#043c25',
        status: 'Activă acum'
      },
      book: {
        title: 'Normal People'
      },
      newMessage: '',
      myDeliveryReady: false,
      
      /* SCHIMBĂ ACEST RÂND DIN false ÎN true CA SĂ SIMULEZI CĂ CEALALTĂ PERSOANĂ A DEJA APĂSAT */
      partnerDeliveryReady: true, 

      showDeliveryScreen: false,
      deliveryForm: {
        county: '',
        city: '',
        street: '',
        zipCode: '',
        extra: '',
        courier: 'fancourier'
      },
      messages: [
        { id: 1, sender: 'them', text: 'Bună! Mai este disponibilă cartea pentru schimb?', time: '14:20' },
        { id: 2, sender: 'me', text: 'Salut! Da, este disponibilă.', time: '14:22' }
      ]
    }
  },
  computed: {
    deliveryCount() {
      let count = 0;
      if (this.myDeliveryReady) count++;
      if (this.partnerDeliveryReady) count++;
      return count;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/chats');
    },
    toggleDeliveryReady() {
      this.myDeliveryReady = !this.myDeliveryReady;

      // Dacă amândoi au confirmat (ajunge la 2/2), deschidem ecranul de livrare
      if (this.deliveryCount === 2) {
        this.showDeliveryScreen = true;
      }
    },
    confirmShipping() {
      if (!this.deliveryForm.county || !this.deliveryForm.city || !this.deliveryForm.street || !this.deliveryForm.zipCode) {
        alert('Te rugăm să completezi toate câmpurile obligatorii ale adresei!');
        return;
      }
      alert(`Livrarea a fost înregistrată cu succes prin ${this.deliveryForm.courier.toUpperCase()} pentru adresa: ${this.deliveryForm.street}, ${this.deliveryForm.city}, Jud. ${this.deliveryForm.county}!`);
      this.showDeliveryScreen = false;
    },
    sendMessage() {
      if (!this.newMessage.trim()) return;

      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages.push({
        id: Date.now(),
        sender: 'me',
        text: this.newMessage.trim(),
        time: timeNow
      });

      this.newMessage = '';
      
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });
    }
  }
}