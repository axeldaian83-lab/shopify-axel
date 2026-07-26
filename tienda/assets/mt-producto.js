document.addEventListener('DOMContentLoaded', function () {
  initGaleria();
  initVariantes();
});

function initGaleria() {
  var thumbs = document.querySelectorAll('[data-mt-thumb]');
  if (!thumbs.length) return;
  var mainImg = document.getElementById('mt-main-image');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('mt-activa'); });
      thumb.classList.add('mt-activa');
      var full = thumb.dataset.full;
      if (mainImg && mainImg.tagName === 'IMG' && full) {
        mainImg.src = full;
      }
    });
  });
}

function initVariantes() {
  var form = document.getElementById('mt-producto-form');
  if (!form) return;

  var variantsScript = form.querySelector('[data-mt-variants]');
  if (!variantsScript) return;

  var variants = JSON.parse(variantsScript.textContent);
  var scope = form.closest('.mt-producto__compra') || form;
  var optionGroups = form.querySelectorAll('[data-mt-option]');
  var variantIdInput = form.querySelector('[data-mt-variant-id]');
  var priceEl = scope.querySelector('[data-mt-price]');
  var comparePriceEl = scope.querySelector('[data-mt-compare-price]');
  var addButton = form.querySelector('[data-mt-add-button]');
  var addText = form.querySelector('[data-mt-add-text]');

  function selectedOptions() {
    var selected = [];
    optionGroups.forEach(function (group) {
      var active = group.querySelector('.mt-activa');
      var position = parseInt(group.dataset.mtOption, 10);
      selected[position - 1] = active ? active.dataset.value : null;
    });
    return selected;
  }

  function findMatchingVariant() {
    var selected = selectedOptions();
    return variants.find(function (variant) {
      return selected.every(function (value, i) {
        return value === null || variant['option' + (i + 1)] === value;
      });
    });
  }

  function formatMoney(cents) {
    return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: window.Shopify && Shopify.currency ? Shopify.currency.active : 'USD' });
  }

  function updateForVariant(variant) {
    if (!variant) return;
    variantIdInput.value = variant.id;

    if (priceEl) {
      try { priceEl.textContent = formatMoney(variant.price); } catch (e) {}
    }
    if (comparePriceEl) {
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        comparePriceEl.style.display = '';
        try { comparePriceEl.textContent = formatMoney(variant.compare_at_price); } catch (e) {}
      } else {
        comparePriceEl.style.display = 'none';
      }
    }

    if (variant.available) {
      addButton.disabled = false;
      if (addText) addText.textContent = addButton.dataset.mtLabelDisponible || addText.textContent;
    } else {
      addButton.disabled = true;
      if (addText) addText.textContent = addButton.dataset.mtLabelAgotado || addText.textContent;
    }
  }

  if (!optionGroups.length) return;

  optionGroups.forEach(function (group) {
    var pills = group.querySelectorAll('[data-value]');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('mt-activa'); });
        pill.classList.add('mt-activa');
        var variant = findMatchingVariant();
        if (variant) updateForVariant(variant);
      });
    });
  });
}
