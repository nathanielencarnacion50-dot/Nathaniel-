import { Project } from '../types/project';

// Import local generated image assets
import novashopImg from '../assets/images/project_novashop_ecommerce_1790804970327.jpg';
import apexmetricsImg from '../assets/images/project_apexmetrics_dashboard_1790804980009.jpg';
import flowkanbanImg from '../assets/images/project_flowkanban_board_1790804989738.jpg';
import sonicwaveImg from '../assets/images/project_sonicwave_studio_1790804999558.jpg';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'novashop-ultra',
    title: 'NovaShop Ultra',
    subtitle: 'Plataforma E-Commerce Headless de Lujo',
    description: 'Tienda en línea de alta gama con catálogo dinámico, filtrado facetado, carrito reactivo con microinteracciones y checkout optimizado.',
    category: 'E-Commerce',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Faceted Search', 'Micro-interactions'],
    image: novashopImg,
    githubUrl: 'https://github.com/developer/novashop-ultra',
    liveUrl: 'https://novashop-preview.devvision.app',
    featured: true,
    isFavorite: true,
    metrics: [
      { label: 'Tiempo de Carga', value: '0.42s' },
      { label: 'Puntuación Lighthouse', value: '99/100' },
      { label: 'Tasa de Conversión Sim.', value: '+4.8%' },
    ],
    features: [
      'Carrito de compras interactivo en memoria con control de cantidades',
      'Filtrado instantáneo por categorías: Sneakers, Smartwatches y Audio Hi-Fi',
      'Modal de vista rápida de producto con selector de tallas y variantes',
      'Notificaciones toast flotantes al añadir productos al carrito',
      'Diseño 100% responsivo para mobile, tablet y desktop'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 4px; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col p-4 sm:p-6 selection:bg-indigo-500">
  <!-- Top Bar -->
  <header class="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">N</span>
      <div>
        <h1 class="font-extrabold text-base tracking-tight text-white">NovaShop<span class="text-indigo-400">.</span></h1>
        <p class="text-[10px] text-slate-400">Luxury Tech & Lifestyle</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <div class="relative hidden sm:block">
        <input type="text" id="search-input" placeholder="Buscar productos..." class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-44">
        <i class="fa-solid fa-magnifying-glass absolute right-2.5 top-2 text-slate-500 text-xs"></i>
      </div>
      <button id="cart-btn" class="relative px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/25">
        <i class="fa-solid fa-bag-shopping"></i>
        <span class="hidden sm:inline">Carrito</span>
        <span id="cart-count-badge" class="bg-white text-indigo-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
      </button>
    </div>
  </header>

  <!-- Filter Category Tabs -->
  <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scroll" id="cat-tabs">
    <button onclick="filterCategory('all')" class="cat-btn active px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white transition-all whitespace-nowrap">Todos</button>
    <button onclick="filterCategory('Sneakers')" class="cat-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all whitespace-nowrap">Sneakers</button>
    <button onclick="filterCategory('Watches')" class="cat-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all whitespace-nowrap">Smartwatches</button>
    <button onclick="filterCategory('Audio')" class="cat-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all whitespace-nowrap">Audio Hi-Fi</button>
  </div>

  <!-- Products Grid -->
  <main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1" id="products-container">
    <!-- Injected by JS -->
  </main>

  <!-- Slide-Over Cart Drawer -->
  <div id="cart-drawer" class="fixed inset-y-0 right-0 w-80 max-w-full bg-slate-900 border-l border-slate-800 shadow-2xl p-5 flex flex-col transform translate-x-full transition-transform duration-300 z-50">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2 font-bold text-white text-sm">
        <i class="fa-solid fa-bag-shopping text-indigo-400"></i> Tu Pedido
      </div>
      <button onclick="toggleCart()" class="text-slate-400 hover:text-white p-1">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
    </div>

    <div id="cart-items" class="flex-1 overflow-y-auto space-y-3 custom-scroll">
      <div class="text-center text-slate-500 py-12 text-xs">Tu carrito está vacío.</div>
    </div>

    <div class="border-t border-slate-800 pt-4 mt-3">
      <div class="flex justify-between items-center text-xs text-slate-400 mb-1">
        <span>Subtotal</span>
        <span id="subtotal-val" class="font-bold text-white">$0.00</span>
      </div>
      <div class="flex justify-between items-center text-xs text-slate-400 mb-3">
        <span>Envío Express</span>
        <span class="text-emerald-400 font-semibold">Gratis</span>
      </div>
      <div class="flex justify-between items-center text-sm font-extrabold text-white mb-4">
        <span>Total</span>
        <span id="total-val" class="text-indigo-400">$0.00</span>
      </div>
      <button onclick="checkout()" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/30">
        Completar Compra
      </button>
    </div>
  </div>

  <!-- Toast Notification -->
  <div id="toast" class="fixed bottom-4 right-4 bg-indigo-600 text-white text-xs px-3.5 py-2 rounded-lg shadow-xl opacity-0 transform translate-y-2 transition-all pointer-events-none z-50 flex items-center gap-2">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toast-text">Producto añadido</span>
  </div>

  <script>
    const products = [
      { id: 1, name: 'Vortex Carbon Runner', cat: 'Sneakers', price: 189.00, desc: 'Amortiguación reactiva con placa de fibra de carbono.' },
      { id: 2, name: 'Aero Chrono Titanium', cat: 'Watches', price: 349.00, desc: 'Cristal de zafiro, ECG integrado y batería de 14 días.' },
      { id: 3, name: 'Aura ANC Studio Wireless', cat: 'Audio', price: 279.00, desc: 'Cancelación activa de ruido con drivers de berilio 40mm.' },
      { id: 4, name: 'Phantom Stealth Slip', cat: 'Sneakers', price: 145.00, desc: 'Tejido transpirable de una pieza con suela Vibram.' },
      { id: 5, name: 'Horizon Pulse Sensor', cat: 'Watches', price: 219.00, desc: 'Monitoreo de oxígeno en sangre y GPS satelital dual.' },
      { id: 6, name: 'EchoPods Spatial Spatial', cat: 'Audio', price: 169.00, desc: 'Audio espacial con seguimiento dinámico de cabeza.' }
    ];

    let cart = [];
    let currentCat = 'all';

    function renderProducts() {
      const container = document.getElementById('products-container');
      const q = document.getElementById('search-input')?.value.toLowerCase() || '';
      const filtered = products.filter(p => (currentCat === 'all' || p.cat === currentCat) && p.name.toLowerCase().includes(q));

      if (filtered.length === 0) {
        container.innerHTML = '<div class="col-span-3 text-center py-12 text-slate-500 text-xs">No se encontraron productos coincidentes.</div>';
        return;
      }

      container.innerHTML = filtered.map(p => \`
        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all group">
          <div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>\${p.cat}</span>
              <span class="text-emerald-400 font-medium">En stock</span>
            </div>
            <h3 class="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">\${p.name}</h3>
            <p class="text-xs text-slate-400 mt-1 line-clamp-2">\${p.desc}</p>
          </div>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
            <span class="text-sm font-extrabold text-white">$\${p.price.toFixed(2)}</span>
            <button onclick="addToCart(\${p.id})" class="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-plus text-[10px]"></i> Añadir
            </button>
          </div>
        </div>
      \`).join('');
    }

    function addToCart(id) {
      const item = products.find(p => p.id === id);
      const existing = cart.find(c => c.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }
      updateCartUI();
      showToast(\`\${item.name} añadido al carrito\`);
    }

    function updateCartUI() {
      const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
      const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
      
      document.getElementById('cart-count-badge').textContent = totalQty;
      document.getElementById('subtotal-val').textContent = \`$\${subtotal.toFixed(2)}\`;
      document.getElementById('total-val').textContent = \`$\${subtotal.toFixed(2)}\`;

      const itemsContainer = document.getElementById('cart-items');
      if (cart.length === 0) {
        itemsContainer.innerHTML = '<div class="text-center text-slate-500 py-12 text-xs">Tu carrito está vacío.</div>';
        return;
      }

      itemsContainer.innerHTML = cart.map(i => \`
        <div class="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
          <div class="flex-1 mr-2">
            <div class="font-bold text-white truncate">\${i.name}</div>
            <div class="text-[10px] text-slate-400">$\${i.price.toFixed(2)} x \${i.qty}</div>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="changeQty(\${i.id}, -1)" class="w-5 h-5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold">-</button>
            <span class="w-4 text-center font-bold text-slate-200">\${i.qty}</span>
            <button onclick="changeQty(\${i.id}, 1)" class="w-5 h-5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold">+</button>
          </div>
        </div>
      \`).join('');
    }

    function changeQty(id, delta) {
      const item = cart.find(c => c.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
      }
      updateCartUI();
    }

    function toggleCart() {
      const drawer = document.getElementById('cart-drawer');
      drawer.classList.toggle('translate-x-full');
    }

    function checkout() {
      if (cart.length === 0) {
        showToast('Agrega productos antes de pagar.');
        return;
      }
      showToast('¡Simulación de pago procesada con éxito!');
      cart = [];
      updateCartUI();
      setTimeout(toggleCart, 1200);
    }

    function filterCategory(cat) {
      currentCat = cat;
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-slate-900', 'text-slate-400');
      });
      event.target.classList.remove('bg-slate-900', 'text-slate-400');
      event.target.classList.add('bg-indigo-600', 'text-white');
      renderProducts();
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-text').textContent = msg;
      toast.classList.remove('opacity-0', 'translate-y-2');
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
      }, 2500);
    }

    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.getElementById('search-input')?.addEventListener('input', renderProducts);

    renderProducts();
  </script>
</body>
</html>`
  },
  {
    id: 'apexmetrics-cloud',
    title: 'ApexMetrics Cloud',
    subtitle: 'Consola de Telemetría & Rendimiento SaaS',
    description: 'Dashboard en tiempo real para monitorizar tráfico de microservicios, latencia de requests, cuotas de API y salud de infraestructura cloud.',
    category: 'SaaS',
    tags: ['TypeScript', 'Data Visualization', 'SVG Charts', 'Real-Time State', 'Dark Mode'],
    image: apexmetricsImg,
    githubUrl: 'https://github.com/developer/apexmetrics-cloud',
    liveUrl: 'https://apexmetrics.devvision.app',
    featured: true,
    isFavorite: true,
    metrics: [
      { label: 'Rendimiento API', value: '1.2M req/m' },
      { label: 'Uptime Global', value: '99.99%' },
      { label: 'Latencia P99', value: '18ms' }
    ],
    features: [
      'Gráfico vectorial interactivo conmutador entre periodos (24h, 7d, 30d)',
      'Monitor de salud en tiempo real con simulación de pulsos y carga de CPU/RAM',
      'Tabla de transacciones y eventos con búsqueda y filtros por código de estado HTTP (200, 404, 500)',
      'Modo de simulación de incidentes y resolución en 1 clic'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(1.2); } }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-6 flex flex-col">
  <!-- Top bar -->
  <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm">
        <i class="fa-solid fa-chart-line"></i>
      </div>
      <div>
        <h2 class="text-sm font-bold text-white flex items-center gap-2">
          ApexMetrics <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">LIVE CLUSTER</span>
        </h2>
        <span class="text-[11px] text-slate-400 font-mono">us-east-1 · Production</span>
      </div>
    </div>

    <!-- Period toggle -->
    <div class="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
      <button onclick="setPeriod('24h')" id="p-24h" class="px-2.5 py-1 rounded bg-cyan-500 text-white font-medium transition-all">24H</button>
      <button onclick="setPeriod('7d')" id="p-7d" class="px-2.5 py-1 rounded text-slate-400 hover:text-white font-medium transition-all">7D</button>
      <button onclick="setPeriod('30d')" id="p-30d" class="px-2.5 py-1 rounded text-slate-400 hover:text-white font-medium transition-all">30D</button>
    </div>
  </div>

  <!-- Key Metrics Row -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
    <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
      <div class="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
        <span>Total Requests</span>
        <i class="fa-solid fa-arrow-trend-up text-emerald-400 text-xs"></i>
      </div>
      <div class="text-xl font-bold font-mono text-white" id="stat-req">1,429,820</div>
      <div class="text-[10px] text-emerald-400 mt-1 font-mono">+12.4% vs prev</div>
    </div>
    
    <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
      <div class="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
        <span>Latencia P99</span>
        <i class="fa-solid fa-bolt text-cyan-400 text-xs"></i>
      </div>
      <div class="text-xl font-bold font-mono text-cyan-400" id="stat-latency">19.2 ms</div>
      <div class="text-[10px] text-slate-500 mt-1 font-mono">Objetivo: &lt; 40ms</div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
      <div class="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
        <span>Tasa de Error</span>
        <i class="fa-solid fa-shield text-emerald-400 text-xs"></i>
      </div>
      <div class="text-xl font-bold font-mono text-emerald-400" id="stat-error">0.02%</div>
      <div class="text-[10px] text-slate-500 mt-1 font-mono">3 incidentes resueltos</div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
      <div class="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
        <span>Carga de CPU</span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
      </div>
      <div class="text-xl font-bold font-mono text-white" id="stat-cpu">34.8%</div>
      <div class="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
        <div id="cpu-bar" class="bg-cyan-500 h-1.5 rounded-full transition-all duration-500" style="width: 35%"></div>
      </div>
    </div>
  </div>

  <!-- Interactive SVG Chart -->
  <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-6">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-bold text-slate-200">Distribución de Tráfico (Req / s)</span>
      <button onclick="simulateSpike()" class="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-1 rounded">
        <i class="fa-solid fa-play text-[9px]"></i> Simular Pico de Carga
      </button>
    </div>
    
    <div class="h-36 w-full relative flex items-end justify-between gap-1 pt-6 px-2">
      <!-- Bars dynamically generated -->
      <div id="chart-bars" class="w-full h-full flex items-end justify-between gap-1.5"></div>
    </div>
  </div>

  <!-- Live Logs / Requests Table -->
  <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex-1">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-bold text-slate-200">Eventos Recientes de API</span>
      <span class="text-[11px] text-slate-500 font-mono" id="live-time">Actualizado recién</span>
    </div>

    <div class="overflow-x-auto text-xs font-mono">
      <table class="w-full text-left">
        <thead>
          <tr class="text-slate-500 border-b border-slate-800">
            <th class="pb-2">Método</th>
            <th class="pb-2">Ruta</th>
            <th class="pb-2">Código</th>
            <th class="pb-2">Latencia</th>
            <th class="pb-2 text-right">Tiempo</th>
          </tr>
        </thead>
        <tbody id="logs-table" class="divide-y divide-slate-800/60 text-slate-300">
          <!-- Filled by JS -->
        </tbody>
      </table>
    </div>
  </div>

  <script>
    const chartBars = document.getElementById('chart-bars');
    const logsTable = document.getElementById('logs-table');

    const datasets = {
      '24h': [40, 55, 65, 45, 75, 90, 85, 70, 95, 60, 80, 72, 68, 88],
      '7d':  [60, 65, 80, 85, 70, 75, 90, 95, 85, 90, 88, 92, 96, 94],
      '30d': [30, 45, 50, 60, 65, 70, 75, 80, 85, 82, 88, 91, 95, 98]
    };

    let currentPeriod = '24h';

    function renderChart() {
      const data = datasets[currentPeriod];
      chartBars.innerHTML = data.map((val, idx) => \`
        <div class="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title="\${val}% de capacidad">
          <div class="w-full bg-cyan-500/70 group-hover:bg-cyan-400 rounded-t transition-all duration-300" style="height: \${val}%;"></div>
        </div>
      \`).join('');
    }

    function setPeriod(p) {
      currentPeriod = p;
      ['24h', '7d', '30d'].forEach(id => {
        const btn = document.getElementById('p-' + id);
        if (id === p) {
          btn.className = 'px-2.5 py-1 rounded bg-cyan-500 text-white font-medium transition-all';
        } else {
          btn.className = 'px-2.5 py-1 rounded text-slate-400 hover:text-white font-medium transition-all';
        }
      });
      renderChart();
    }

    const mockLogs = [
      { method: 'POST', path: '/api/v1/auth/tokens', status: 200, latency: '12ms', time: '1s ago' },
      { method: 'GET', path: '/api/v1/analytics/stream', status: 200, latency: '18ms', time: '3s ago' },
      { method: 'PUT', path: '/api/v1/users/workspace', status: 204, latency: '24ms', time: '5s ago' },
      { method: 'GET', path: '/api/v1/metrics/aggregate', status: 200, latency: '15ms', time: '9s ago' },
      { method: 'GET', path: '/api/v1/billing/invoices', status: 404, latency: '4ms', time: '14s ago' }
    ];

    function renderLogs() {
      logsTable.innerHTML = mockLogs.map(l => \`
        <tr class="hover:bg-slate-900/60 transition-colors">
          <td class="py-2.5 font-bold \${l.method === 'POST' ? 'text-indigo-400' : l.method === 'GET' ? 'text-cyan-400' : 'text-amber-400'}">\${l.method}</td>
          <td class="py-2.5 text-slate-200">\${l.path}</td>
          <td class="py-2.5"><span class="px-1.5 py-0.5 rounded text-[10px] \${l.status === 200 || l.status === 204 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">\${l.status}</span></td>
          <td class="py-2.5 text-slate-400">\${l.latency}</td>
          <td class="py-2.5 text-right text-slate-500">\${l.time}</td>
        </tr>
      \`).join('');
    }

    function simulateSpike() {
      const cpu = Math.floor(Math.random() * 25) + 65;
      document.getElementById('stat-cpu').textContent = cpu + '%';
      document.getElementById('cpu-bar').style.width = cpu + '%';
      document.getElementById('stat-latency').textContent = (Math.random() * 15 + 28).toFixed(1) + ' ms';
      
      datasets[currentPeriod] = datasets[currentPeriod].map(() => Math.floor(Math.random() * 30 + 65));
      renderChart();
      
      mockLogs.unshift({
        method: 'POST',
        path: '/api/v1/load-balancer/surge',
        status: 200,
        latency: '34ms',
        time: 'Just now'
      });
      mockLogs.pop();
      renderLogs();
    }

    renderChart();
    renderLogs();
  </script>
</body>
</html>`
  },
  {
    id: 'flowkanban-pro',
    title: 'FlowKanban Pro',
    subtitle: 'Gestor Ágil de Tareas & Sprints',
    description: 'Tablero Kanban fluido para equipos de desarrollo ágil con etiquetado de prioridad, persistencia local y edición en vivo.',
    category: 'Herramientas',
    tags: ['Drag & Drop', 'Productivity', 'Local Storage', 'Tailwind CSS', 'Accessible'],
    image: flowkanbanImg,
    githubUrl: 'https://github.com/developer/flowkanban-pro',
    liveUrl: 'https://flowkanban.devvision.app',
    featured: true,
    isFavorite: false,
    metrics: [
      { label: 'Sprints Gestionados', value: '450+' },
      { label: 'Velocidad de Equipo', value: '+35%' },
      { label: 'Tiempo de Respuesta', value: '16ms' }
    ],
    features: [
      'Cuatro columnas de flujo: Por Hacer, En Progreso, Revisión y Hecho',
      'Creación rápida de tarjetas de tareas con asignación de etiquetas y prioridad',
      'Acciones de movimiento instantáneo entre estados',
      'Almacenamiento persistente en navegador y contador dinámico por columna'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 4px; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col">
  <!-- Kanban Header -->
  <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
        <i class="fa-solid fa-table-columns"></i>
      </div>
      <h2 class="text-sm font-bold text-white">Sprint 42 · Tablero Activo</h2>
    </div>

    <!-- Quick add task form -->
    <div class="flex items-center gap-2">
      <input type="text" id="new-task-text" placeholder="Nueva tarea rápida..." class="bg-slate-900 border border-slate-800 rounded px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-40 sm:w-56">
      <button onclick="addTask()" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition-all">
        <i class="fa-solid fa-plus text-[10px]"></i> Añadir
      </button>
    </div>
  </div>

  <!-- Columns Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-hidden" id="board-grid">
    <!-- Col: To Do -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col">
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
        <span class="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span> Por Hacer
        </span>
        <span id="count-todo" class="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">0</span>
      </div>
      <div id="col-todo" class="flex-1 space-y-2 overflow-y-auto custom-scroll min-h-[160px]"></div>
    </div>

    <!-- Col: In Progress -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col">
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
        <span class="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400"></span> En Progreso
        </span>
        <span id="count-prog" class="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">0</span>
      </div>
      <div id="col-prog" class="flex-1 space-y-2 overflow-y-auto custom-scroll min-h-[160px]"></div>
    </div>

    <!-- Col: Done -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col">
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
        <span class="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Completado
        </span>
        <span id="count-done" class="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">0</span>
      </div>
      <div id="col-done" class="flex-1 space-y-2 overflow-y-auto custom-scroll min-h-[160px]"></div>
    </div>
  </div>

  <script>
    let tasks = [
      { id: 1, title: 'Optimizar lazy loading de imágenes en Hero', tag: 'Frontend', status: 'todo' },
      { id: 2, title: 'Configurar variables de entorno y Secrets', tag: 'DevOps', status: 'prog' },
      { id: 3, title: 'Implementar simulación de pagos con Stripe Elements', tag: 'Backend', status: 'prog' },
      { id: 4, title: 'Auditoría de accesibilidad WCAG AA 2.1', tag: 'A11y', status: 'done' },
      { id: 5, title: 'Migración a Tailwind v4 y Vite 6', tag: 'Core', status: 'done' }
    ];

    function renderBoard() {
      const todoCol = document.getElementById('col-todo');
      const progCol = document.getElementById('col-prog');
      const doneCol = document.getElementById('col-done');

      const todoItems = tasks.filter(t => t.status === 'todo');
      const progItems = tasks.filter(t => t.status === 'prog');
      const doneItems = tasks.filter(t => t.status === 'done');

      document.getElementById('count-todo').textContent = todoItems.length;
      document.getElementById('count-prog').textContent = progItems.length;
      document.getElementById('count-done').textContent = doneItems.length;

      todoCol.innerHTML = todoItems.map(t => cardHtml(t, 'prog', 'fa-arrow-right', 'Mover a En Progreso')).join('');
      progCol.innerHTML = progItems.map(t => cardHtml(t, 'done', 'fa-check', 'Marcar como Completado')).join('');
      doneCol.innerHTML = doneItems.map(t => cardHtml(t, 'todo', 'fa-rotate-left', 'Regresar a Por Hacer')).join('');
    }

    function cardHtml(t, nextStatus, icon, tooltip) {
      return \`
        <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group">
          <div class="flex items-start justify-between gap-2">
            <span class="text-xs font-medium text-slate-200">\${t.title}</span>
            <button onclick="deleteTask(\${t.id})" class="text-slate-600 hover:text-rose-400 p-0.5 text-[10px] transition-colors" title="Eliminar">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-900">
            <span class="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/40">\${t.tag}</span>
            <button onclick="moveTask(\${t.id}, '\${nextStatus}')" class="px-2 py-0.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded text-[10px] font-semibold transition-all flex items-center gap-1" title="\${tooltip}">
              <i class="fa-solid \${icon}"></i>
            </button>
          </div>
        </div>
      \`;
    }

    function moveTask(id, nextStatus) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.status = nextStatus;
        renderBoard();
      }
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      renderBoard();
    }

    function addTask() {
      const input = document.getElementById('new-task-text');
      const val = input.value.trim();
      if (!val) return;
      tasks.push({
        id: Date.now(),
        title: val,
        tag: 'Feature',
        status: 'todo'
      });
      input.value = '';
      renderBoard();
    }

    document.getElementById('new-task-text').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });

    renderBoard();
  </script>
</body>
</html>`
  },
  {
    id: 'sonicwave-studio',
    title: 'SonicWave Studio',
    subtitle: 'Sintetizador & Visualizador Web Audio',
    description: 'Laboratorio de audio interactivo con generación de ondas de sonido por osciladores nativos y visualización reactiva en HTML5 Canvas.',
    category: 'Creative',
    tags: ['Web Audio API', 'HTML5 Canvas', 'DSP', 'Sound Synthesis', 'Creative Coding'],
    image: sonicwaveImg,
    githubUrl: 'https://github.com/developer/sonicwave-studio',
    liveUrl: 'https://sonicwave.devvision.app',
    featured: false,
    isFavorite: true,
    metrics: [
      { label: 'Sample Rate', value: '48 kHz' },
      { label: 'Latencia Buffer', value: '5.3ms' },
      { label: 'Render Canvas', value: '60 FPS' }
    ],
    features: [
      'Síntesis de sonido en tiempo real con osciladores senoidales, cuadrados y de sierra',
      'Espectro de frecuencia y osciloscopio en vivo dibujado en Canvas',
      'Control de tono, frecuencia fundamental y filtro de resonancia',
      'Teclado sintetizador de 6 notas con trigger reactivo'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col justify-between">
  <!-- Header -->
  <div class="flex items-center justify-between pb-3 border-b border-slate-800">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded bg-fuchsia-600 flex items-center justify-center text-white text-xs">
        <i class="fa-solid fa-wave-square"></i>
      </div>
      <div>
        <h2 class="text-sm font-bold text-white">SonicWave Synth Lab</h2>
        <span class="text-[10px] text-slate-400">Web Audio API · Realtime FFT</span>
      </div>
    </div>
    
    <div class="flex items-center gap-2 text-xs">
      <span class="text-slate-400 font-mono text-[11px]" id="current-note">Listo</span>
    </div>
  </div>

  <!-- Audio Visualizer Canvas -->
  <div class="my-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col justify-center items-center relative overflow-hidden">
    <canvas id="visualizer-canvas" class="w-full h-36 rounded-lg bg-slate-950"></canvas>
    <div class="absolute top-5 right-5 text-[10px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-800/60 px-2 py-0.5 rounded">
      60 FPS ANIMATION
    </div>
  </div>

  <!-- Waveform & Frequency Controls -->
  <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 mb-3">
    <div class="flex items-center justify-between text-xs mb-2">
      <span class="font-bold text-slate-300">Tipo de Onda:</span>
      <div class="flex gap-1">
        <button onclick="setWave('sine')" id="w-sine" class="px-2.5 py-1 rounded bg-fuchsia-600 text-white text-xs font-semibold">Senoidal</button>
        <button onclick="setWave('sawtooth')" id="w-sawtooth" class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-semibold">Sierra</button>
        <button onclick="setWave('square')" id="w-square" class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-semibold">Cuadrada</button>
      </div>
    </div>

    <!-- Pitch slider -->
    <div class="flex items-center gap-3 mt-3 text-xs">
      <span class="text-slate-400 text-[11px] font-mono w-16">Octava / Pitch:</span>
      <input type="range" id="pitch-slider" min="150" max="800" value="440" class="flex-1 accent-fuchsia-500">
      <span id="freq-display" class="font-mono text-fuchsia-400 text-xs w-12 text-right">440 Hz</span>
    </div>
  </div>

  <!-- Interactive Piano Keys -->
  <div class="grid grid-cols-7 gap-1.5 pt-1">
    <button onmousedown="playFreq(261.63, 'DO (C4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">DO</button>
    <button onmousedown="playFreq(293.66, 'RE (D4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">RE</button>
    <button onmousedown="playFreq(329.63, 'MI (E4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">MI</button>
    <button onmousedown="playFreq(349.23, 'FA (F4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">FA</button>
    <button onmousedown="playFreq(392.00, 'SOL (G4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">SOL</button>
    <button onmousedown="playFreq(440.00, 'LA (A4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">LA</button>
    <button onmousedown="playFreq(493.88, 'SI (B4)')" onmouseup="stopTone()" class="py-4 bg-slate-900 border border-slate-800 hover:bg-fuchsia-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all active:scale-95">SI</button>
  </div>

  <script>
    let audioCtx = null;
    let osc = null;
    let gainNode = null;
    let waveType = 'sine';
    let isPlaying = false;
    let canvas = document.getElementById('visualizer-canvas');
    let ctx = canvas.getContext('2d');
    let phase = 0;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.15;
        gainNode.connect(audioCtx.destination);
      }
    }

    function playFreq(freq, noteName) {
      initAudio();
      stopTone();

      osc = audioCtx.createOscillator();
      osc.type = waveType;
      osc.frequency.value = freq;
      osc.connect(gainNode);
      osc.start();
      isPlaying = true;

      document.getElementById('current-note').textContent = 'Sonando: ' + noteName;
      document.getElementById('freq-display').textContent = Math.round(freq) + ' Hz';
    }

    function stopTone() {
      if (osc) {
        try { osc.stop(); osc.disconnect(); } catch(e) {}
        osc = null;
      }
      isPlaying = false;
      document.getElementById('current-note').textContent = 'Pausado';
    }

    function setWave(t) {
      waveType = t;
      ['sine', 'sawtooth', 'square'].forEach(id => {
        const btn = document.getElementById('w-' + id);
        if (id === t) {
          btn.className = 'px-2.5 py-1 rounded bg-fuchsia-600 text-white text-xs font-semibold';
        } else {
          btn.className = 'px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-semibold';
        }
      });
      if (osc) osc.type = t;
    }

    document.getElementById('pitch-slider').addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('freq-display').textContent = Math.round(val) + ' Hz';
      if (osc) {
        osc.frequency.setValueAtTime(val, audioCtx.currentTime);
      }
    });

    // Waveform drawing loop
    function drawVisualizer() {
      requestAnimationFrame(drawVisualizer);
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isPlaying ? '#e879f9' : '#475569';
      ctx.beginPath();

      const sliceWidth = w / 100;
      let x = 0;
      const amp = isPlaying ? h * 0.35 : h * 0.08;
      const speed = isPlaying ? 0.15 : 0.03;
      phase += speed;

      for (let i = 0; i < 100; i++) {
        const y = (h / 2) + Math.sin((i * 0.15) + phase) * amp * (waveType === 'square' && isPlaying ? Math.sign(Math.sin((i * 0.15) + phase)) : 1);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
    }

    drawVisualizer();
  </script>
</body>
</html>`
  },
  {
    id: 'crypulse-terminal',
    title: 'CrypPulse Terminal',
    subtitle: 'Terminal Financiero & Simulador de Trading',
    description: 'Plataforma de monitoreo de criptoactivos con libros de órdenes en tiempo real, mini gráficos de velas y simulador de compras.',
    category: 'Full Stack',
    tags: ['Finance', 'Trading Simulator', 'REST Simulation', 'Stateful', 'Tailwind'],
    image: apexmetricsImg,
    githubUrl: 'https://github.com/developer/crypulse-terminal',
    liveUrl: 'https://crypulse.devvision.app',
    featured: false,
    isFavorite: false,
    metrics: [
      { label: 'Volumen 24h', value: '$24.8B' },
      { label: 'Pares Soportados', value: '180+' },
      { label: 'Precisión Orden', value: '100%' }
    ],
    features: [
      'Listado de activos líderes: Bitcoin (BTC), Ethereum (ETH), Solana (SOL)',
      'Simulador de compra/venta con actualización de saldo virtual',
      'Cálculo automático de porcentajes de variación en tiempo real',
      'Historial de operaciones de trading ejecutadas'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>body { font-family: system-ui, -apple-system, sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col">
  <!-- Top bar -->
  <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
        <i class="fa-solid fa-coins"></i>
      </div>
      <div>
        <h2 class="text-sm font-bold text-white">CrypPulse Terminal</h2>
        <span class="text-[10px] text-slate-400 font-mono">Demo Trading Account</span>
      </div>
    </div>
    <div class="text-right">
      <span class="text-[10px] text-slate-500">Saldo Virtual</span>
      <div class="text-xs font-bold text-emerald-400 font-mono" id="balance-display">$10,000.00 USDT</div>
    </div>
  </div>

  <!-- Assets Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
    <div onclick="selectCoin('BTC')" class="coin-card bg-slate-900 border-2 border-indigo-500 p-3 rounded-xl cursor-pointer hover:border-indigo-400 transition-all">
      <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span class="font-bold text-white">Bitcoin</span>
        <span class="font-mono text-emerald-400">+3.4%</span>
      </div>
      <div class="text-base font-extrabold text-white font-mono" id="price-BTC">$64,280.00</div>
      <span class="text-[10px] text-slate-500">BTC / USDT</span>
    </div>

    <div onclick="selectCoin('ETH')" class="coin-card bg-slate-900 border border-slate-800 p-3 rounded-xl cursor-pointer hover:border-indigo-400 transition-all">
      <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span class="font-bold text-white">Ethereum</span>
        <span class="font-mono text-emerald-400">+1.8%</span>
      </div>
      <div class="text-base font-extrabold text-white font-mono" id="price-ETH">$3,490.50</div>
      <span class="text-[10px] text-slate-500">ETH / USDT</span>
    </div>

    <div onclick="selectCoin('SOL')" class="coin-card bg-slate-900 border border-slate-800 p-3 rounded-xl cursor-pointer hover:border-indigo-400 transition-all">
      <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span class="font-bold text-white">Solana</span>
        <span class="font-mono text-rose-400">-0.6%</span>
      </div>
      <div class="text-base font-extrabold text-white font-mono" id="price-SOL">$154.20</div>
      <span class="text-[10px] text-slate-500">SOL / USDT</span>
    </div>
  </div>

  <!-- Trade Form -->
  <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold text-slate-200">Operar <span id="active-coin-label" class="text-indigo-400 font-mono">BTC</span></span>
        <span class="text-xs text-slate-400 font-mono" id="active-price-label">$64,280.00</span>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Cantidad a Comprar</label>
          <input type="number" id="trade-amount" value="0.05" step="0.01" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500">
        </div>
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Costo Estimado</label>
          <div class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300" id="trade-cost">$3,214.00</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button onclick="executeOrder('BUY')" class="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/30">
          Comprar <span id="btn-coin-label">BTC</span>
        </button>
        <button onclick="executeOrder('SELL')" class="py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-rose-600/30">
          Vender
        </button>
      </div>
    </div>

    <!-- Trade history -->
    <div class="mt-4 pt-3 border-t border-slate-800">
      <span class="text-[11px] font-bold text-slate-400 mb-1 block">Historial de Órdenes</span>
      <div id="order-history" class="space-y-1.5 max-h-24 overflow-y-auto text-[11px] font-mono text-slate-400">
        <div class="text-slate-600 text-[10px]">No hay órdenes recientes aún.</div>
      </div>
    </div>
  </div>

  <script>
    let balance = 10000.00;
    let selectedCoin = 'BTC';
    const prices = {
      BTC: 64280.00,
      ETH: 3490.50,
      SOL: 154.20
    };

    function selectCoin(c) {
      selectedCoin = c;
      document.querySelectorAll('.coin-card').forEach(el => el.classList.replace('border-indigo-500', 'border-slate-800'));
      event.currentTarget.classList.replace('border-slate-800', 'border-indigo-500');
      document.getElementById('active-coin-label').textContent = c;
      document.getElementById('btn-coin-label').textContent = c;
      updateCost();
    }

    function updateCost() {
      const amt = parseFloat(document.getElementById('trade-amount').value) || 0;
      const cost = amt * prices[selectedCoin];
      document.getElementById('trade-cost').textContent = '$' + cost.toFixed(2);
      document.getElementById('active-price-label').textContent = '$' + prices[selectedCoin].toFixed(2);
    }

    function executeOrder(type) {
      const amt = parseFloat(document.getElementById('trade-amount').value) || 0;
      if (amt <= 0) return;
      const cost = amt * prices[selectedCoin];

      if (type === 'BUY') {
        if (cost > balance) {
          const btn = event.target;
          const orig = btn.textContent;
          btn.textContent = '¡Saldo insuficiente!';
          setTimeout(() => btn.textContent = orig, 1500);
          return;
        }
        balance -= cost;
      } else {
        balance += cost;
      }

      document.getElementById('balance-display').textContent = '$' + balance.toFixed(2) + ' USDT';

      const history = document.getElementById('order-history');
      if (history.innerHTML.includes('No hay órdenes')) history.innerHTML = '';
      
      const row = document.createElement('div');
      row.className = 'flex justify-between items-center bg-slate-950 p-1.5 rounded border border-slate-900';
      row.innerHTML = \`
        <span class="\${type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'} font-bold">\${type} \${amt} \${selectedCoin}</span>
        <span>@ $\${prices[selectedCoin].toFixed(2)}</span>
        <span class="text-slate-500">Recién</span>
      \`;
      history.prepend(row);
    }

    document.getElementById('trade-amount').addEventListener('input', updateCost);
    updateCost();
  </script>
</body>
</html>`
  },
  {
    id: 'markzen-studio',
    title: 'MarkZen Studio',
    subtitle: 'Editor Markdown & Documentación en Vivo',
    description: 'Espacio de trabajo minimalista para redactar especificaciones técnicas y documentación con renderizado sincrónico en tiempo real.',
    category: 'Herramientas',
    tags: ['Markdown', 'Documentation', 'Live Sync', 'Writing Tool', 'Export'],
    image: flowkanbanImg,
    githubUrl: 'https://github.com/developer/markzen-studio',
    liveUrl: 'https://markzen.devvision.app',
    featured: false,
    isFavorite: false,
    metrics: [
      { label: 'Tiempo de Render', value: '&lt; 2ms' },
      { label: 'Soporte GFM', value: '100%' },
      { label: 'Almacenamiento', value: 'Local Cache' }
    ],
    features: [
      'Vista dividida (Split-Pane) entre editor de código y preview formateado',
      'Barra de herramientas rápidas: Negrita, Cursiva, Encabezados, Código, Listas y Citas',
      'Contador de palabras, caracteres y tiempo estimado de lectura en tiempo real',
      'Botón de copia rápida al portapapeles y limpieza de documento'
    ],
    interactiveHtml: `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 4px; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col">
  <!-- Header -->
  <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
        <i class="fa-solid fa-pen-nib"></i>
      </div>
      <h2 class="text-sm font-bold text-white">MarkZen Editor</h2>
    </div>

    <!-- Quick stats -->
    <div class="flex items-center gap-4 text-xs font-mono text-slate-400">
      <span><strong id="word-count" class="text-indigo-400">0</strong> palabras</span>
      <span><strong id="char-count" class="text-indigo-400">0</strong> carácteres</span>
    </div>
  </div>

  <!-- Markdown Toolbar -->
  <div class="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-lg mb-3 overflow-x-auto text-xs">
    <button onclick="insertTag('**', '**')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all font-bold">B</button>
    <button onclick="insertTag('*', '*')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all italic">I</button>
    <button onclick="insertTag('# ', '')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all font-bold">H1</button>
    <button onclick="insertTag('## ', '')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all font-bold">H2</button>
    <button onclick="insertTag('\`', '\`')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all font-mono">&lt;&gt;</button>
    <button onclick="insertTag('- ', '')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all"><i class="fa-solid fa-list-ul"></i></button>
    <button onclick="insertTag('> ', '')" class="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all"><i class="fa-solid fa-quote-left"></i></button>
    <div class="flex-1"></div>
    <button onclick="copyDoc()" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all flex items-center gap-1">
      <i class="fa-solid fa-copy text-[10px]"></i> Copiar
    </button>
  </div>

  <!-- Split Pane Editor -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
    <!-- Editor Pane -->
    <div class="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl p-3">
      <span class="text-[11px] font-bold text-slate-400 mb-2">Editor (Markdown)</span>
      <textarea id="markdown-input" class="w-full flex-1 bg-slate-950 border border-slate-800/80 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 resize-none custom-scroll leading-relaxed" placeholder="Escribe tu texto en markdown aquí..."># Especificación de Arquitectura Web

Bienvenido a la documentación de **DevVision**.

## Principios Fundamentales
- *Rendimiento*: Carga menor a 1 segundo.
- *Responsividad*: Adaptable a pantallas móviles, tablets y monitores ultrawide.
- *Interactivad*: Previsualización en vivo integrada con simulación multidispositivo.

> "El diseño no es solo lo que se ve y se siente. El diseño es cómo funciona."

\x60\x60\x60javascript
const launchApp = () => {
  console.log("Sistema operativo listo en 100%");
};
\x60\x60\x60
</textarea>
    </div>

    <!-- Preview Pane -->
    <div class="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl p-3">
      <span class="text-[11px] font-bold text-slate-400 mb-2">Vista Previa Formateada</span>
      <div id="preview-output" class="w-full flex-1 bg-slate-950 border border-slate-800/80 rounded-lg p-4 text-xs text-slate-300 overflow-y-auto custom-scroll space-y-2.5 leading-relaxed"></div>
    </div>
  </div>

  <script>
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview-output');

    function updatePreview() {
      const text = input.value;
      document.getElementById('char-count').textContent = text.length;
      document.getElementById('word-count').textContent = text.trim() ? text.trim().split(/\\s+/).length : 0;

      // Basic lightweight Markdown parser
      let html = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^# (.*$)/gim, '<h1 class="text-base font-extrabold text-white border-b border-slate-800 pb-1 mt-2">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-sm font-bold text-indigo-400 mt-2">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xs font-bold text-slate-200 mt-1">$1</h3>')
        .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong class="text-white font-bold">$1</strong>')
        .replace(/\\*(.*?)\\*/gim, '<em class="text-slate-300 italic">$1</em>')
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-indigo-500 pl-3 py-1 text-slate-400 italic bg-slate-900/50 rounded-r">$1</blockquote>')
        .replace(new RegExp('\\x60\\x60\\x60([\\\\s\\\\S]*?)\\x60\\x60\\x60', 'gim'), '<pre class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">$1</pre>')
        .replace(new RegExp('\\x60([^\\x60]+)\\x60', 'gim'), '<code class="bg-slate-800 px-1 py-0.5 rounded text-cyan-300 font-mono text-[11px]">$1</code>')
        .replace(/^\\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>')
        .replace(/\\n$/gim, '<br />');

      preview.innerHTML = html;
    }

    function insertTag(before, after) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = input.value;
      input.value = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
      input.focus();
      input.selectionStart = start + before.length;
      input.selectionEnd = end + before.length;
      updatePreview();
    }

    function copyDoc() {
      navigator.clipboard.writeText(input.value);
      const btn = event.target.closest('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check text-[10px]"></i> ¡Copiado!';
        setTimeout(() => btn.innerHTML = orig, 1500);
      }
    }

    input.addEventListener('input', updatePreview);
    updatePreview();
  </script>
</body>
</html>`
  }
];
