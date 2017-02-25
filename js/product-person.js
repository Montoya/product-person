/*
  I just love JavaScript so much
*/

function updateData() {

  var new_data = [];
  var sum = 0;
  for(var i = 0; i < inputs.length; i++) {
    var new_value = parseInt(inputs[i].value);
    new_data.push(new_value);
    sum += new_value;
  }
  data.datasets[0].data = new_data;
  radar_chart.update();

  var remainder = 20 - sum;
  if(remainder < 0) {
    form_helper.textContent = Math.abs(remainder) + ' points over \u26a0\ufe0f';
    form_helper.className = 'warning';
  }
  else {
    form_helper.textContent = remainder + ' points left';
    form_helper.className = '';
  }

  if(window.history.replaceState) {
    try {
      window.history.replaceState({}, {}, location.origin+location.pathname+'?data='+new_data.join(','));
    } catch(err) {
      /* probably user is running this in a local file, which won't work */
    }
  }

  /* update tweet intent */
  document.getElementById('tweet').href = "https://twitter.com/intent/tweet?text=Just%20found%20my%20product%20person%20passions%2C%20take%20a%20look%3A&amp;url=https%3A%2F%2Fmontoya.github.io%2Fproduct-person%2F"+location.search+"&amp;via=cm0nt0y4&amp;related=uriharamati";
}

function updateFormBottomPadding() {
  if(window.innerWidth > 959) {
    document.getElementById('form').style.paddingBottom = 24 + document.getElementById('about').offsetHeight + 'px';
  }
  else {
    document.getElementById('form').style.paddingBottom = '24px';
  }
}

window.onresize = updateFormBottomPadding;

updateFormBottomPadding();

var canvas = document.getElementById('radar-chart');
var gradient = canvas.getContext('2d').createLinearGradient(240, 0, 240, 320);
gradient.addColorStop(0, '#9be15d');
gradient.addColorStop(1, '#00e3ae');

var data = {
  labels: ['Technical', 'User Experience', 'User Psychology', 'Data', 'Project Management', 'Wackiness'],
  datasets: [
    {
      label: 'Product Passions',
      data: [4, 4, 3, 3, 3, 3],
      backgroundColor: gradient, /* "#c6dfb6", */
      borderColor: "rgba(0,0,0,0)",
      pointRadius: 0,
      lineCap: 'round',
      lineJoin: 'round'
    }
  ]
};

var radar_chart = new Chart(canvas, {
  type: 'radar',
  data: data,
  options: {
    responsive: false,
    animationSteps: 2,
    legend: {
      display: true,
      labels: {
        boxWidth: 0,
        fontSize: 18,
        fontStyle: "300",
        fontColor: "#333",
        fontFamily: "'Work Sans',sans-serif",
        padding: 8
      }
    },
    tooltips: {
      enabled: false
    },
    scale: {
      ticks: {
        /* beginAtZero: true, */
        min: 0,
        suggestedMax: 6,
        stepSize: 1,
        display: false,
        fontFamily: "'Work Sans',sans-serif"
      },
      gridLines: {
        display: true,
        drawBorder: true,
        drawTicks: false
      },
      pointLabels: {
        fontSize: 12,
        fontStyle: "300",
        fontColor: "#333",
        fontFamily: "'Work Sans',sans-serif"
      }
    }
  }
});

var inputs = document.querySelectorAll('.passion-value');
for(var i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  input.addEventListener('input', updateData);
}

var form_helper = document.getElementById('form-helper');

document.getElementById('download').addEventListener('click', function(e) {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'product-passion.png');
  });
});

var check_for_data;
if(check_for_data = gup('data')) {
  if(check_for_data.match(/^[1-8,]{11}$/) !== null) {
    check_for_data = check_for_data.split(',');
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].value = parseInt(check_for_data.shift());
    }
    updateData();
  }
}