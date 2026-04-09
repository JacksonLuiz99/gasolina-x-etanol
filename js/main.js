// --- Máscara de moeda ---
function aplicarMascara(input) {
  // Remove tudo que não for dígito
  let digits = input.value.replace(/\D/g, '');

  // Evita processamento vazio
  if (digits === '') {
    input.value = '';
    return;
  }

  // Converte para centavos e formata
  const numero = parseInt(digits, 10) / 100;
  input.value = numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function valorNumerico(input) {
  // Converte "6,35" → 6.35 para cálculo
  return parseFloat(input.value.replace(/\./g, '').replace(',', '.'));
}

// --- Cálculo ---
function calcular() {
  const gasolinaInput = document.getElementById('gasolina');
  const etanolInput   = document.getElementById('etanol');
  const erroGasolina  = document.getElementById('erro-gasolina');
  const erroEtanol    = document.getElementById('erro-etanol');
  const resultado     = document.getElementById('resultado');

  const gasolina = valorNumerico(gasolinaInput);
  const etanol   = valorNumerico(etanolInput);
  let valido = true;

  if (!gasolinaInput.value || isNaN(gasolina) || gasolina <= 0) {
    erroGasolina.classList.remove('hidden');
    valido = false;
  } else {
    erroGasolina.classList.add('hidden');
  }

  if (!etanolInput.value || isNaN(etanol) || etanol <= 0) {
    erroEtanol.classList.remove('hidden');
    valido = false;
  } else {
    erroEtanol.classList.add('hidden');
  }

  if (!valido) {
    resultado.classList.add('hidden');
    return;
  }

  const razao      = etanol / gasolina;
  const percentual = (razao * 100).toFixed(1);

  ['card-etanol', 'card-gasolina', 'card-empate'].forEach(id =>
    document.getElementById(id).classList.add('hidden')
  );

  resultado.classList.remove('hidden');
  // Reinicia animação
  resultado.style.animation = 'none';
  void resultado.offsetWidth;
  resultado.style.animation = '';

  if (razao < 0.7) {
    document.getElementById('card-etanol').classList.remove('hidden');
    document.getElementById('razao-etanol').innerHTML =
      `Razão etanol/gasolina: <strong class="text-white/80">${percentual}%</strong> (abaixo de 70%)`;
    document.getElementById('economia-etanol').textContent =
      `Economia de R$ ${(gasolina - etanol).toFixed(2).replace('.', ',')} por litro`;

  } else if (Math.abs(razao - 0.7) < 0.0001) {
    document.getElementById('card-empate').classList.remove('hidden');

  } else {
    document.getElementById('card-gasolina').classList.remove('hidden');
    document.getElementById('razao-gasolina').innerHTML =
      `Razão etanol/gasolina: <strong class="text-white/80">${percentual}%</strong> (acima de 70%)`;
    document.getElementById('economia-gasolina').textContent =
      'O etanol está caro — prefira a gasolina';
  }
}

// --- Limpar ---
function limpar() {
  document.getElementById('gasolina').value = '';
  document.getElementById('etanol').value   = '';
  document.getElementById('erro-gasolina').classList.add('hidden');
  document.getElementById('erro-etanol').classList.add('hidden');
  document.getElementById('resultado').classList.add('hidden');
  document.getElementById('gasolina').focus();
}

// --- Eventos ---
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('gasolina').addEventListener('input', e => aplicarMascara(e.target));
  document.getElementById('etanol').addEventListener('input',   e => aplicarMascara(e.target));
  document.addEventListener('keydown', e => { if (e.key === 'Enter') calcular(); });
});
