/**
 * GOYO REAL COFFEE — LÓGICA DE INTERACCIÓN Y COMPONENTES DINÁMICOS
 * Cumple con PRD.md, Arquitectura.md y Wireframes
 */

document.addEventListener('DOMContentLoaded', () => {
  initStatusBadge();
  initMenuTabs();
  initMobileMenu();
  initAddressCopy();
  initDayHighlight();
});

/**
 * 1. STATUS BADGE DINÁMICO & TABLA DE HORARIOS
 * Zona Horaria: America/Hermosillo (UTC-7 permanente)
 * Horarios: L-V: 07:00 - 21:00 | S-D: 09:00 - 21:00
 */
function getHermosilloTime() {
  const now = new Date();
  // Formatear en zona horaria de Sonora / Hermosillo
  const hermosilloDateStr = now.toLocaleString('en-US', { timeZone: 'America/Hermosillo' });
  return new Date(hermosilloDateStr);
}

function initStatusBadge() {
  const badge = document.getElementById('statusBadge');
  if (!badge) return;

  const hTime = getHermosilloTime();
  const day = hTime.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const hour = hTime.getHours();
  const minute = hTime.getMinutes();
  const currentTimeInMinutes = hour * 60 + minute;

  const isWeekend = (day === 0 || day === 6);
  const openTimeInMinutes = isWeekend ? 9 * 60 : 7 * 60; // 09:00 o 07:00
  const closeTimeInMinutes = 21 * 60; // 21:00

  const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

  const dot = badge.querySelector('.status-dot');
  const textMobile = badge.querySelector('.status-text-mobile');
  const textDesktop = badge.querySelector('.status-text-desktop');

  if (isOpen) {
    badge.classList.remove('closed');
    badge.classList.add('open');
    if (textMobile) textMobile.textContent = 'Abierto';
    if (textDesktop) {
      textDesktop.textContent = isWeekend 
        ? 'Abierto ahora • S-D 9:00 am - 9:00 pm' 
        : 'Abierto ahora • L-V 7:00 am - 9:00 pm';
    }
  } else {
    badge.classList.remove('open');
    badge.classList.add('closed');
    if (textMobile) textMobile.textContent = 'Cerrado';
    
    // Determinar siguiente apertura
    const nextDay = (day + 1) % 7;
    const nextOpensAt = (nextDay === 0 || nextDay === 6) ? '9:00 a.m.' : '7:00 a.m.';
    if (textDesktop) {
      textDesktop.textContent = `Cerrado ahora • Abre mañana a las ${nextOpensAt}`;
    }
  }
}

/**
 * Resaltar automáticamente el día actual en la tabla semanal de horarios
 */
function initDayHighlight() {
  const hTime = getHermosilloTime();
  const day = hTime.getDay(); // 0 = Domingo, 1 = Lunes, etc.
  
  // Mapa hacia data-day (0 = dom, 1 = lun, 2 = mar, 3 = mie, 4 = jue, 5 = vie, 6 = sab)
  const dayRows = document.querySelectorAll('.hours-row[data-day]');
  dayRows.forEach(row => {
    const rowDay = parseInt(row.getAttribute('data-day'), 10);
    if (rowDay === day) {
      row.classList.add('current-day');
      const label = row.querySelector('.day-label');
      if (label && !label.textContent.includes('(Hoy)')) {
        label.textContent += ' (Hoy)';
      }
    } else {
      row.classList.remove('current-day');
    }
  });
}

/**
 * 2. TABS DE CATEGORÍAS DEL MENÚ (#menu)
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const cards = document.querySelectorAll('.menu-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      // Actualizar estado de tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filtrar tarjetas con animación suave
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/**
 * 3. MENÚ MÓVIL HAMBURGUESA
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileMenuDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    // Cambiar icono entre hamburguesa y X
    const icon = toggleBtn.querySelector('svg');
    if (icon) {
      if (isOpen) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      }
    }
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Cerrar al pulsar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 4. COPIAR DIRECCIÓN AL PORTAPAPELES
 */
function initAddressCopy() {
  const copyBtn = document.getElementById('copyAddressBtn');
  const toast = document.getElementById('toastNotice');

  if (!copyBtn) return;

  const addressText = "Av. Nayarit y Yáñez 102, Colonia Nayarit, C.P. 83190, Hermosillo, Sonora";

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(addressText);
      } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement("textarea");
        textArea.value = addressText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast("¡Dirección copiada al portapapeles!");
    } catch (err) {
      showToast("Dirección: " + addressText);
    }
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}
