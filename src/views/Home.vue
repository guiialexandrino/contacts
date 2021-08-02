<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-4" align="center"><h1>Contatos</h1></v-col>
    <v-col cols="12" class="mb-4" align="center">
      <img class="logo" src="../../public/logo.png" />
    </v-col>
    <v-col cols="12" align="center">
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
        <v-btn elevation="0" rounded color="grey darken-1" class="white--text"
          >Adicionar</v-btn
        >
      </v-row>
    </v-col>
    <v-col cols="12" align="center">
      <v-row no-gutters justify="center">
        <v-col cols="10" lg="7" xl="5">
          <v-data-table
            class="mt-5 elevation-3"
            :headers="headers"
            :items="contacts"
            hide-default-footer
          >
            <template slot="item.actions" slot-scope="{ item }">
              <v-icon small class="mr-2" @click="handleEdit(item)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="handleDelete(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Home',
  data: () => ({
    contact: { name: '', number: '' },
    headers: [
      { text: 'Nome', value: 'name', align: 'center', sortable: false },
      { text: 'Telefone', value: 'number', align: 'center', sortable: false },
      { text: 'Ações', value: 'actions', align: 'center', sortable: false },
    ],
    contacts: [{ name: 'Guilherme', number: '48988069645' }],
  }),
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
    handleEdit(item) {
      console.log(item);
    },
    handleDelete(item) {
      console.log(item);
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
