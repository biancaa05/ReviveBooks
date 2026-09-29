export default {
  name: 'AddView',
  data() {
    return {
      isEditMode: false,
      form: {
        isbn: '',
        title: '',
        author: '',
        genre: 'Fiction',
        condition: 'Ca nouă',
        description: '',
        image: null
      },
      fileName: ''
    }
  },
  created() {
    if (this.$route.query.edit === 'true') {
      this.isEditMode = true;
      this.form.title = this.$route.query.title || '';
      this.form.author = this.$route.query.author || '';
    }
  },
  methods: {
    fetchBookWithAI() {
      if (!this.form.isbn.trim()) {
        alert('Te rugăm să introduci un cod ISBN valid pentru căutare!');
        return;
      }
      alert(`🤖 AI-ul a analizat codul ISBN ${this.form.isbn} și a preluat datele cu succes!`);
      this.form.title = 'Maitreyi';
      this.form.author = 'Mircea Eliade';
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
        this.fileName = file.name;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    submitBook() {
      if (!this.form.title || !this.form.author) {
        alert('Te rugăm să completezi cel puțin titlul și autorul cărții!');
        return;
      }
      
      if (this.isEditMode) {
        alert(`Modificările pentru cartea „${this.form.title}” au fost salvate cu succes!`);
      } else {
        alert(`Cartea „${this.form.title}” a fost publicată cu succes pentru schimb!`);
      }
      
      this.$router.push('/my-books');
    }
  }
}