<template>
  <table class="score-board">
    <tbody>
      <tr
        v-for="(throwDataRow, index) in throwData"
        :key="throwDataRow.throwId"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ throwDataRow.firstName }} {{ throwDataRow.lastName }}</td>
        <td>
          {{ roundToOneDecimal(throwDataRow.speed) }} km/h
          <span class="american-value"
            >{{
              roundToOneDecimal(speedInMilesPerHour(throwDataRow.speed))
            }}
            mph</span
          >
        </td>
        <td>{{ roundToOneDecimal(throwDataRow.rpm) }} rpm</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import axios from "axios";
import { sortBy } from "lodash";

export default {
  mounted() {
    // Fetch throw data
    this.fetchThrowData();

    // Setup refreshing of the data
    (this as any).sockets.subscribe("throw-data-updated", () => {
      console.log("throw data updated");
      this.fetchThrowData();
    });
  },
  data() {
    return {
      throwData: [] as any[],
    };
  },
  methods: {
    fetchThrowData() {
      axios.get("http://localhost:8081/throw-data").then((response) => {
        const throwDataSortedBySpeed = sortBy(response.data, [
          (x: any) => -x.speed, // Sort primarily by speed in descending order
          (x: any) => -x.rpm, // // Sort secondarily by rpm in descending order
        ]);
        this.throwData = throwDataSortedBySpeed;
      });
    },
    speedInMilesPerHour(speedInKilometersPerHour: number): number {
      return speedInKilometersPerHour * 0.621371;
    },
    roundToOneDecimal(value: number): number {
      return Math.round(value * 10) / 10;
    },
  },
};
</script>

<style scoped>
table {
  background-color: #efe;
}
tbody td {
  padding: 10px 20px 10px 20px;
}

.american-value {
  padding-left: 10px;
  color: gray;
}
</style>
