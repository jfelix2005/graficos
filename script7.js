document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('data-form');
    const container = document.getElementById('container');
  
    dataForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const chartDataInput = document.getElementById('chart-data').value;
      let chartData;
  
      try {
        // Analiza el JSON con JSON.parse
        chartData = JSON.parse(chartDataInput); 
  
        // Genera el gráfico utilizando Highcharts
        generateChart(chartData);
  
      } catch (error) {
        console.error('Error al analizar el código JSON:', error);
        alert(error.message);
        return;
      }
    });
  
    // Función para generar el gráfico dinámicamente
    function generateChart(chartData) {
      // Elimina cualquier gráfico existente en el contenedor
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
  
      if (chartData.chart.type == 'timeline'){
        // Reemplaza las variables con los valores reales
        const beforeChartFormat = chartData.accessibility.screenReaderSection.beforeChartFormat
          .replace('{chartTitle}', chartData.title.text)
          .replace('{typeDescription}', chartData.chart.type) // Suponiendo que 'typeDescription' es el tipo de gráfico
          .replace('{chartSubtitle}', chartData.subtitle.text)
          .replace('{chartLongdesc}', ' ') // Reemplaza por una cadena vacía o un texto si hay una descripción larga
          .replace('{viewTableButton}', ' '); // Reemplaza por una cadena vacía o un texto si hay un botón
    
        // Actualiza el JSON con la nueva configuración
        chartData.accessibility.screenReaderSection.beforeChartFormat = beforeChartFormat;
      }
      // Crea el gráfico usando el JSON del usuario directamente
      Highcharts.chart('container', chartData);
    }
  });