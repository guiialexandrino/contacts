<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-4 mt-5" align="center"><h1>Contatos</h1></v-col>
    <v-col cols="12" class="mb-4" align="center">
      <img class="logo" src="../../public/logo.png" />
    </v-col>
    <v-col cols="12" align="center">
      <v-row v-if="editMode" no-gutters justify="center" class="my-4"
        ><span
          ><v-icon class="pb-1 pr-2">mdi-pencil</v-icon>Você está editando:
          <b>{{ itemToEdit.name }} - {{ itemToEdit.number }}</b></span
        >
      </v-row>
      <v-row no-gutters justify="center">
        <v-text-field
          color="grey darken-3"
          prepend-inner-icon="mdi-account"
          class="formSize mr-3"
          label="Nome"
          v-model="contact.name"
          solo
          dense
        />
        <v-text-field
          color="grey darken-3"
          prepend-inner-icon="mdi-phone"
          class="formSize mr-3"
          label="Telefone"
          maxlength="13"
          @paste="$event.preventDefault()"
          @keypress="validation($event)"
          v-model="contact.number"
          solo
          dense
        />
        <v-btn
          v-if="!editMode"
          :disabled="!contact.name || contact.number.length != 13"
          elevation="0"
          rounded
          color="green lighten-1"
          class="white--text"
          @click="handleAdd"
          >Adicionar</v-btn
        >
        <v-btn
          v-if="editMode"
          :disabled="!contact.name || contact.number.length != 13"
          elevation="0"
          rounded
          color="blue darken-1"
          class="white--text mr-2 px-5"
          @click="editContact(itemToEdit)"
          >Editar</v-btn
        >
        <v-btn
          v-if="editMode"
          :disabled="!contact.name || contact.number.length != 13"
          elevation="0"
          rounded
          color="red lighten-1"
          class="white--text"
          @click="cancel"
          >Cancelar</v-btn
        >
      </v-row>
    </v-col>
    <v-col v-if="contacts.length > 0" cols="12" align="center">
      <v-row no-gutters justify="center">
        <v-col cols="10" lg="7" xl="5">
          <v-data-table
            class="mt-5 mb-12 elevation-3"
            :headers="headers"
            :items="contacts"
            disable-pagination
            hide-default-footer
          >
            <template slot="item.actions" slot-scope="{ item }">
              <v-icon
                :disabled="editMode"
                small
                class="mr-2"
                @click="handleEdit(item)"
                >mdi-pencil</v-icon
              >
              <v-icon :disabled="editMode" small @click="handleDelete(item)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else align="center" class="my-12">
      <h3>Ops.. parece que você ainda não tem nenhum contato :(</h3>
    </v-col>
    <!-- Loading -->
    <Loading v-if="loading" />
  </v-row>
</template>

<script>
/* eslint-disable */
import Reqs from '../utils/reqs';
import Loading from '../components/Loading.vue';

export default {
  name: 'Home',
  components: { Loading },
  data: () => ({
    contact: { name: '', number: '' },
    headers: [
      { text: 'Nome', value: 'name', align: 'center', sortable: false },
      { text: 'Telefone', value: 'number', align: 'center', sortable: false },
      { text: 'Ações', value: 'actions', align: 'center', sortable: false },
    ],
    contacts: [],
    loading: false,
    editMode: false,
    itemToEdit: {},
  }),

  async created() {
    await this.init();
  },

  methods: {
    validation($event) {
      if (this.contact.number.length == 0) {
        this.contact.number += '(';
      }
      if (this.contact.number.length == 3) {
        this.contact.number += ')';
      }
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // only allow numbers
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    async handleAdd() {
      try {
        this.loading = true;
        let data = this.contact;
        let req = await Reqs.addContact(data);
        if (req.success) {
          this.contact.name = '';
          this.contact.number = '';
          this.init();
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    handleEdit(item) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.editMode = true;
        this.itemToEdit = item;
        this.contact.name = item.name;
        this.contact.number = item.number;
      }, 250);
    },

    async editContact(item) {
      try {
        this.loading = true;
        let data = {
          id: item.id,
          name: this.contact.name,
          number: this.contact.number,
        };
        let req = await Reqs.editContact(data);
      } catch (error) {
      } finally {
        this.loading = false;
        this.editMode = false;
        this.itemToEdit = {};
        this.contact.name = '';
        this.contact.number = '';
        this.init();
      }
    },

    cancel() {
      this.editMode = false;
      this.itemToEdit = {};
      this.contact.name = '';
      this.contact.number = '';
    },

    async handleDelete(item) {
      try {
        this.loading = true;
        let req = await Reqs.deleteContact(item.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.init();
      }
    },

    //integração backend
    async init() {
      try {
        this.loading = true;
        let req = await Reqs.readAllContacts();
        if (req.success) {
          this.contacts = req.data;
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
  },
};
</script>

<style>
.logo {
  max-width: 8%;
  min-width: 130px;
}

.formSize {
  max-width: 13% !important;
  min-width: 180px !important;
}

/* responsividade */
@media all and (max-width: 920px) {
}
</style>
