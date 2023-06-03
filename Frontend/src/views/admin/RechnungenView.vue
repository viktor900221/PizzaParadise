<template>
  <main class="mainN">
    <table>
      <thead>
        <tr class="titel">
          <h1>Überblick</h1>
          <h3>Vollständige Rechnung => bitte auf ausdrucken klicken</h3>
        </tr>
      </thead>

      <tbody>
        <div v-if="rechnungen.length > 0">
          <div v-for="rechnungenDaten in rechnungen" :key="rechnungenDaten">
            <input
              type="text"
              value="Bestellnummer:"
              class="feldname"
              readonly
            />
            <input v-model="rechnungenDaten.BESTELL_NR" readonly />
            <input type="text" value="KundenID:" class="feldname" readonly />
            <input v-model="rechnungenDaten.KUNDEN_ID" readonly />
            <input type="text" value="Summe:" class="feldname" readonly />
            <input :value="rechnungenDaten.SUMME.toFixed(2)" readonly />
        
            <button @click="printRechnung(rechnungenDaten)" class="button">
              ausdrucken
            </button>
          </div>
        </div>

        <div v-else>
          <p>Keine Rechnungen verfügbar</p>
        </div>
      </tbody>
    </table>
  </main>
</template>
 
 <script>
import axios from "axios";
import jsPDF from "jspdf";
import { ref } from "vue";

export default {
  name: "RechnungenView",
  components: {},
  data: () => {
    return {
      rechnungen: ref([]),
      bestellung: ref([]),
    
    };
  },
  mounted() {
    this.readData();
  },

  methods: {
    //READ ALL
    async readData() {
      try {
        const response = await axios.get("http://localhost:3000/rechnungen");
        const response2 = await axios.get("http://localhost:3000/bestellung");
        this.rechnungen = response.data;
        this.bestellung = response2.data;
      } catch (error) {
        console.error(error);
      }
    },

   
    printRechnung(rechnungenDaten) {
      const pdf = new jsPDF();
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      pdf.text("Max Mustermann", 120, 10);
      pdf.text("Mahlzeit", 120, 20);
      pdf.text("Fiktiv Straße 43", 120, 30);
      pdf.text("7077 Göttingen", 120, 40);
      pdf.text("Telefon: 030 - 12 34 56-9", 120, 50);
      pdf.text("Telefax: 030 - 12 34 56-8", 120, 60);
      pdf.text("USt-Id-Nr.: DE 986534232 ", 120, 70);

      pdf.text(
        "Rechnungsnummer: " +
          2023 +
          "-" +
          rechnungenDaten.KUNDEN_ID +
          rechnungenDaten.BESTELL_NR,
        10,
        90
      );
      pdf.text("Datum: " + formattedDate, 120, 90);
      pdf.text("KundenID: " + rechnungenDaten.KUNDEN_ID, 10, 100);
      pdf.text(
        "Kunden Adresse: " +
          this.bestellung.find(
            (b) => b.BESTELL_NR === rechnungenDaten.BESTELL_NR
          ).KUNDEN_ADRESSE,
        10,
        110
      );
      pdf.text("Bestellnummer: " + rechnungenDaten.BESTELL_NR, 10, 120);
      pdf.text(
        "Bestelldatum: " +
          this.bestellung.find(
            (b) => b.BESTELL_NR === rechnungenDaten.BESTELL_NR
          ).DATUM,
        10,
        130
      );

      pdf.text("Summe: " + rechnungenDaten.SUMME, 10, 140);

      pdf.text(
        "Bitte überweisen Sie den Rechnungsbetrag ohne Abzüge auf mein Konto:",
        10,
        160
      );
      pdf.text("IBAN: " + "DE921005000012322", 10, 170);
      pdf.text("BIC: " + "BELADEBEXXX", 10, 180);
      pdf.text(
        "Mit freundlichen Grüßen" + "\n" + "\n" + "    " + "Max Mustermann",
        10,
        200
      );

      pdf.save("rechnung.pdf");
    },
  },
};
</script>
 <style scoped>
* {
  box-sizing: border-box;
}

input {
  margin: 2px;
  border-radius: 5px;
  background-color: #103454;
  color: white;
  max-width: 170px;
  font-size: 20px;
  padding: 10px;
  cursor: default;
}

main {
  margin-bottom: 20px;
}
.mainN {
  background-color: #8b70a7;
  box-shadow: 0 0 15px #000000b8;
  padding: 10px;
  border: ridge;
}
h1 {
  text-align: center;
  font-weight: 300;
  color: white;
  font-weight: bold;
}

table {
  display: block;
  text-align: center;
}
table {
  width: 100%;
}

tr,
tbody {
  display: block;
}

thead {
  display: none;
}

tr {
  padding-bottom: 10px;
}

th {
  text-align: left;
  font-weight: 700;
}

thead th {
  background-color: #202932;
  color: #fff;
  border: 1px solid #202932;
}

.button {
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #4b908f;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.feldname {
  background-color: #ba3d3d;
}
@media (min-width: 460px) {
  td {
    text-align: left;
  }
  td:before {
    display: inline-block;
    text-align: right;
    width: 140px;
  }

  .select {
    padding-left: 160px;
  }
}
@media (min-width: 720px) {
  table {
    display: table;
  }

  tr {
    display: table-row;
  }

  td,
  th {
    display: table-cell;
  }

  tbody {
    display: table-row-group;
  }

  thead {
    display: table-header-group;
  }

  th {
    padding: 5px;
  }

  tr:nth-child(2n + 2) td {
    background-color: #242e39;
  }
  .select {
    padding: 5px;
  }
}
</style>