<template>
  <div class="container">
    <Title title="Paysheet" />
    <div class="row right-align">
      <button class="btn green darken-1 left" v-on:click="this.export">
        <i class="material-icons left">file_download</i> Export to excel
      </button>
    </div>
    <table id="tabla" class="responsive-table centered">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nomina in nominas" :key="nomina">
          <td>{{ nomina.nombre }}</td>
          <td>{{ nomina.apellido }}</td>
          <td>
            {{
              nomina.sueldoBruto.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
          <td>
            {{
              nomina.ars.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
          <td>
            {{
              nomina.afp.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
          <td>
            {{
              nomina.totalRetenciones.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
          <td>
            {{
              nomina.sueldoNeto.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
        </tr>
        <tr>
          <td colspan="10">
            <h4>
              EL MONTO TOTAL A PAGAR ES DE:
              {{
                total.toLocaleString('en-DO', {
                  style: 'currency',
                  currency: 'DOP',
                })
              }}
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Title from '../components/Title.vue';
  export default {
    data() {
      return {
        total: 0,
        nominas: [],
        nomina: {
          nombre: String,
          apellido: String,
          sueldoBruto: Number,
          ars: Number,
          afp: Number,
          totalRetenciones: Number,
          sueldoNeto: Number,
        },

        headers: [
          'Nombre',
          'Apellido',
          'Sueldo bruto',
          'ARS 3.04%',
          'AFP 2.87%',
          'Total retenciones',
          'Sueldo neto',
        ],
      };
    },
    components: {
      Title,
    },
    computed: {
      ...mapState(['employees']),
    },
    methods: {
      calcularARS(salario) {
        // 2.87 porciento
        return (2.87 * salario) / 100;
      },
      calcularAFP(salario) {
        //3.04 porciento
        return (3.04 * salario) / 100;
      },
      export() {
        const $tabla = document.querySelector('#tabla');
        let tableExport = new TableExport($tabla, {
          exportButtons: false, // No queremos botones
          filename: 'Nomina de prueba', //Nombre del archivo de Excel
          sheetname: 'Reporte de nomina', //Título de la hoja
        });
        let datos = tableExport.getExportData();
        let preferenciasDocumento = datos.tabla.xlsx;
        tableExport.export2file(
          preferenciasDocumento.data,
          preferenciasDocumento.mimeType,
          preferenciasDocumento.filename,
          preferenciasDocumento.fileExtension,
          preferenciasDocumento.merges,
          preferenciasDocumento.RTL,
          preferenciasDocumento.sheetname
        );
      },
    },

    created() {
      this.employees.forEach((employee) => {
        this.nomina.nombre = employee.firstName;
        this.nomina.apellido = employee.lastName;
        this.nomina.sueldoBruto = employee.salary;
        this.nomina.afp = this.calcularAFP(employee.salary);
        this.nomina.ars = this.calcularARS(employee.salary);
        this.nomina.totalRetenciones = this.nomina.ars + this.nomina.afp;
        this.nomina.sueldoNeto = this.nomina.sueldoBruto - this.nomina.totalRetenciones;
        this.nominas.push(Object.assign({}, this.nomina));
      });
      this.nominas.forEach((nomi) => {
        this.total += nomi.sueldoNeto;
      });
    },
  };
</script>

<style></style>
