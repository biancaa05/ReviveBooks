export default {
  name: 'SettingsView',
  data() {
    return {
      form: {
        name: 'Bianca Turcu',
        email: 'bianca@revivebooks.ro',
        city: 'București',
        currentPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    saveSettings() {
      alert('Setările au fost salvate cu succes!');
    }
  }
}