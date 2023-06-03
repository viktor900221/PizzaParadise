<template>
  <main class="mainN">
    <table>
      <thead>
        <tr class="titel">
          <h1>Einnahme</h1>
          <h3>{{ this.date2 }}</h3>
        </tr>
      </thead>

      <tbody>
        Tag:
        <input
          id="einnahme-tag"
          type="text"
          :value="summeTagDisplay"
          readonly
        />
        Woche:
        <input
          id="einnahme-woche"
          type="text"
          :value="summeWocheDisplay"
          readonly
        />
        Monat:
        <input
          id="einnahme-monat"
          type="text"
          :value="summeMonatDisplay"
          readonly
        />
        Gesamt:
        <input
          id="einnahme-gesamt"
          type="text"
          :value="summeGesamtDisplay"
          readonly
        />
        <!--  <input id="einnahme" type="text" :value="summe + ' €'" readonly>-->

        <br />
        <div v-if="einnahme.length > 0">
          <div v-for="einnahmeDaten in einnahme" :key="einnahmeDaten">
            <input
              type="text"
              value="Bestellnummer:"
              class="feldname"
              readonly
            />
            <input v-model="einnahmeDaten.BESTELL_NR" readonly />
            <input type="text" value="KundenID:" class="feldname" readonly />
            <input v-model="einnahmeDaten.KUNDEN_ID" readonly />
            <input type="text" value="Summe:" class="feldname" readonly />
            <input :value="einnahmeDaten.SUMME.toFixed(2)" readonly />
          </div>
        </div>
        <div v-else>
          <p>Keine Einnahmedaten verfügbar</p>
        </div>
      </tbody>
    </table>

    <table>
      <thead>
        <tr class="titel">
          <h1>Tag:</h1>
        </tr>
      </thead>
      <tbody>
        <br />
        <div v-if="einnahme.length">
          <div v-for="einnahmeDaten in einnahme" :key="einnahmeDaten">
            <template v-if="isCurrentDay(new Date(einnahmeDaten.DATUM))">
              <input
                type="text"
                value="Bestellnummer:"
                class="feldname"
                readonly
              />
              <input v-model="einnahmeDaten.BESTELL_NR" readonly />
              <input type="text" value="KundenID:" class="feldname" readonly />
              <input v-model="einnahmeDaten.KUNDEN_ID" readonly />
              <input type="text" value="Summe:" class="feldname" readonly />
              <input :value="einnahmeDaten.SUMME.toFixed(2)" readonly />
            </template>
          </div>
        </div>
        <div v-else>
          <p>Keine Einnahmedaten verfügbar</p>
        </div>
      </tbody>
    </table>

    <table>
      <thead>
        <tr class="titel">
          <h1>Woche:</h1>
        </tr>
      </thead>
      <tbody>
        <br />
        <div v-if="einnahme.length">
          <div v-for="einnahmeDaten in einnahme" :key="einnahmeDaten">
            <template v-if="isCurrentWeek(new Date(einnahmeDaten.DATUM))">
              <input
                type="text"
                value="Bestellnummer:"
                class="feldname"
                readonly
              />
              <input v-model="einnahmeDaten.BESTELL_NR" readonly />
              <input type="text" value="KundenID:" class="feldname" readonly />
              <input v-model="einnahmeDaten.KUNDEN_ID" readonly />
              <input type="text" value="Summe:" class="feldname" readonly />
              <input :value="einnahmeDaten.SUMME.toFixed(2)" readonly />
            </template>
          </div>
        </div>
        <div v-else>
          <p>Keine Einnahmedaten verfügbar</p>
        </div>
      </tbody>
    </table>

    <table>
      <thead>
        <tr class="titel">
          <h1>Monat:</h1>
        </tr>
      </thead>
      <tbody>
        <!-- <input id="einnahme" type="text" :value="summeDisplay" readonly />
-->
        <br />

        <div v-if="einnahme.length">
          <div v-for="einnahmeDaten in einnahme" :key="einnahmeDaten">
            <template v-if="isCurrentMonth(new Date(einnahmeDaten.DATUM))">
              <input
                type="text"
                value="Bestellnummer:"
                class="feldname"
                readonly
              />
              <input v-model="einnahmeDaten.BESTELL_NR" readonly />
              <input type="text" value="KundenID:" class="feldname" readonly />
              <input v-model="einnahmeDaten.KUNDEN_ID" readonly />
              <input type="text" value="Summe:" class="feldname" readonly />
              <input :value="einnahmeDaten.SUMME.toFixed(2)" readonly />
            </template>
          </div>
        </div>
        <div v-else>
          <p>Keine Einnahmedaten verfügbar</p>
        </div>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Einnahme in 12 Monaten:</th>
          <th></th>
        </tr>
        <tr>
          <th>Monat</th>
          <th>Einnahme</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(month, index) in 12" :key="index">
          <td
            style="background-color: #2f4e49; color: white; text-align: center"
          >
            {{ monthNames[index] }}
          </td>
          <td style="background-color: #ba3d3d; color: white">
            {{ getIncomeForMonth(index + 1) }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
 
 <script>
import axios from "axios";
//import { ref } from "vue";

export default {
  name: "EinnahmeView",
  components: {},
  data: () => {
  const date2 = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const germanDate = date2.toLocaleDateString('de-DE', options);
    return {
      einnahme: [],
      monthNames: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
      bestellung: [],
      summe: 0,
      summeTag: 0,
      summeWoche: 0,
      summeMonat: 0,
      summeGesamt: 0,
      //date datenbank spezifisch
      date: new Date(),
      //date für Deutschland
      date2: germanDate,
    };
  },
  computed: {
    /*summeDisplay() {
      return this.summe.toFixed(2) + " €";
    },*/
    summeTagDisplay() {
      return this.summeTag.toFixed(2) + " €";
    },
    summeWocheDisplay() {
      return this.summeWoche.toFixed(2) + " €";
    },
    summeMonatDisplay() {
      return this.summeMonat.toFixed(2) + " €";
    },
    summeGesamtDisplay() {
      return this.summeGesamt.toFixed(2) + " €";
    },
  },
  mounted() {
    this.readData();
    this.calculateSum();
  },

  methods: {
    //READ ALL
    async readData() {
      try {
        const response = await axios.get("http://localhost:3000/rechnungen");
        const response2 = await axios.get("http://localhost:3000/bestellung");
        this.einnahme = response.data;
        this.bestellung = response2.data;
        this.calculateSum();
      } catch (error) {
        console.error(error);
      }
    },
    //einnahme function
    calculateSum() {
      this.summeTag = 0;
      this.summeWoche = 0;
      this.summeMonat = 0;
      this.summeGesamt = 0;

      for (let i = 0; i < this.einnahme.length; i++) {
        const orderDate = new Date(this.einnahme[i].DATUM);
        this.summeGesamt += this.einnahme[i].SUMME;
        if (this.isCurrentDay(orderDate)) {
          this.summeTag += this.einnahme[i].SUMME;
        }
        if (this.isCurrentWeek(orderDate)) {
          this.summeWoche += this.einnahme[i].SUMME;
        }
        if (this.isCurrentMonth(orderDate)) {
          this.summeMonat += this.einnahme[i].SUMME;
        }
      }
    },

    //Bestellungen sortieren nach TAG_WOCHE_MONAT
    isCurrentDay(orderDate) {
      console.log(orderDate);
      return (
        orderDate.getDate() === this.date.getDate() &&
        orderDate.getMonth() === this.date.getMonth() &&
        orderDate.getFullYear() === this.date.getFullYear()
      );
    },
    isCurrentWeek(orderDate) {
      const firstDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate() - this.date.getDay()
      );
      const lastDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate() + (6 - this.date.getDay())
      );
      return orderDate >= firstDayOfWeek && orderDate <= lastDayOfWeek;
    },
    isCurrentMonth(orderDate) {
      return (
        orderDate.getMonth() === this.date.getMonth() &&
        orderDate.getFullYear() === this.date.getFullYear()
      );
    },
    getIncomeForMonth(month) {
      let totalIncome = 0;
      for (let i = 0; i < this.einnahme.length; i++) {
        const orderDate = new Date(this.einnahme[i].DATUM);
        if (orderDate.getMonth() + 1 === month) {
          totalIncome += this.einnahme[i].SUMME;
        }
      }
      return totalIncome;
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
  background-color: #b9ae16d4;
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