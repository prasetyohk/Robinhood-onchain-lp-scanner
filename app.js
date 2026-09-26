/**
 * UniLP Lens — Multichain Uniswap V3 & V4 Position Intelligence
 * Built with passion by Prasetyo HK
 * GitHub: https://github.com/prasetyohk
 * X (Twitter): https://x.com/prasetyohk
 */

// ============================================================================
// Smart Contract ABIs
// ============================================================================
const V4_ABI = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function getPositionLiquidity(uint256 tokenId) view returns (uint128)',
  'function getPoolAndPositionInfo(uint256 tokenId) view returns (tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks),tuple(uint256 packed))',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const V3_ABI = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function positions(uint256 tokenId) view returns (uint96 nonce,address operator,address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function name() view returns (string)'
];

// ============================================================================
// Multichain Configurations (22 Networks)
// ============================================================================
const NETWORKS = {
  monad: {
    name: 'Monad Mainnet',
    chainId: 143,
    rpc: 'https://rpc.monad.xyz',
    explorer: 'https://monadscan.com',
    v4Manager: '0x3Bb14E3D0Cd50aBe3EdACa06d06c29C78676C31A',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    defaultProtocol: 'v4',
    uniswapSlug: 'monad',
    nativeCurrency: 'MON'
  },
  megaeth: {
    name: 'MegaETH',
    chainId: 4326,
    rpc: 'https://mainnet.megaeth.com/rpc',
    explorer: 'https://mega.etherscan.io',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'megaeth',
    nativeCurrency: 'ETH'
  },
  arc: {
    name: 'Arc Mainnet',
    chainId: 5042,
    rpc: 'https://rpc.mainnet.arc.io',
    explorer: 'https://explorer.arc.io',
    v3Manager: '0x6049c9a0e26405C0985f9E3685C87d0aE917f82B',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'arc',
    nativeCurrency: 'USDC'
  },
  tempo: {
    name: 'Tempo',
    chainId: 4217,
    rpc: 'https://rpc.tempo.xyz',
    explorer: 'https://explore.tempo.xyz',
    v4Manager: '0x3fc79444f8eacc1894775493ff3fa41f1e35ce11',
    v3Manager: '',
    defaultProtocol: 'v4',
    uniswapSlug: 'tempo',
    nativeCurrency: 'USD'
  },
  robinhood: {
    name: 'Robinhood Chain',
    chainId: 4663,
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://explorer.mainnet.chain.robinhood.com',
    v4Manager: '0x58daec3116aae6D93017bAAea7749052E8a04fA7',
    v3Manager: '0x73991a25c818bf1f1128deaab1492d45638DE0D3',
    defaultProtocol: 'v4',
    uniswapSlug: 'robinhood',
    nativeCurrency: 'ETH'
  },
  base: {
    name: 'Base',
    chainId: 8453,
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    v3Manager: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
    v4Manager: '0x7C40c3a61b4A5A30598816c17e33555Ec9BE39d5',
    defaultProtocol: 'v3',
    uniswapSlug: 'base',
    nativeCurrency: 'ETH'
  },
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'arbitrum',
    nativeCurrency: 'ETH'
  },
  optimism: {
    name: 'OP Mainnet',
    chainId: 10,
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'optimism',
    nativeCurrency: 'ETH'
  },
  unichain: {
    name: 'Unichain',
    chainId: 130,
    rpc: 'https://mainnet.unichain.org',
    explorer: 'https://uniscan.xyz',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v4',
    uniswapSlug: 'unichain',
    nativeCurrency: 'ETH'
  },
  ink: {
    name: 'Ink',
    chainId: 57073,
    rpc: 'https://rpc-gel.inkonchain.com',
    explorer: 'https://explorer.inkonchain.com',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'ink',
    nativeCurrency: 'ETH'
  },
  soneium: {
    name: 'Soneium',
    chainId: 1868,
    rpc: 'https://rpc.soneium.org',
    explorer: 'https://soneium.blockscout.com',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'soneium',
    nativeCurrency: 'ETH'
  },
  blast: {
    name: 'Blast',
    chainId: 81457,
    rpc: 'https://rpc.blast.io',
    explorer: 'https://blastscan.io',
    v3Manager: '0xB210EB856285A52A183e8b0a1A26e857Fe4F0b3F',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'blast',
    nativeCurrency: 'ETH'
  },
  linea: {
    name: 'Linea',
    chainId: 59144,
    rpc: 'https://rpc.linea.build',
    explorer: 'https://lineascan.build',
    v3Manager: '0x48524e8e9db4f257bf3089d71dc0155b40d7c7fa',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'linea',
    nativeCurrency: 'ETH'
  },
  zksync: {
    name: 'zkSync Era',
    chainId: 324,
    rpc: 'https://mainnet.era.zksync.io',
    explorer: 'https://era.zksync.network',
    v3Manager: '0x94833299c85b85e05a8166946ce235541ba3c78a',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'zksync',
    nativeCurrency: 'ETH'
  },
  worldchain: {
    name: 'World Chain',
    chainId: 480,
    rpc: 'https://worldchain-mainnet.g.alchemy.com/public',
    explorer: 'https://worldscan.org',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'worldchain',
    nativeCurrency: 'ETH'
  },
  zora: {
    name: 'Zora',
    chainId: 7777777,
    rpc: 'https://rpc.zora.energy',
    explorer: 'https://explorer.zora.energy',
    v3Manager: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'zora',
    nativeCurrency: 'ETH'
  },
  xlayer: {
    name: 'X Layer',
    chainId: 196,
    rpc: 'https://rpc.xlayer.tech',
    explorer: 'https://www.oklink.com/xlayer',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'xlayer',
    nativeCurrency: 'OKB'
  },
  ethereum: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpc: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0xbD216513d74C8cf14cf4747E6AaA6420FF64ee9e',
    defaultProtocol: 'v3',
    uniswapSlug: 'ethereum',
    nativeCurrency: 'ETH'
  },
  polygon: {
    name: 'Polygon PoS',
    chainId: 137,
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    v3Manager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'polygon',
    nativeCurrency: 'POL'
  },
  bnb: {
    name: 'BNB Chain',
    chainId: 56,
    rpc: 'https://binance.llamarpc.com',
    explorer: 'https://bscscan.com',
    v3Manager: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
    v4Manager: '0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32',
    defaultProtocol: 'v3',
    uniswapSlug: 'bnb',
    nativeCurrency: 'BNB'
  },
  avalanche: {
    name: 'Avalanche C-Chain',
    chainId: 43114,
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io',
    v3Manager: '0x655C406EBFa14EE2006250925e54ec43AD184f8B',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'avalanche',
    nativeCurrency: 'AVAX'
  },
  celo: {
    name: 'Celo',
    chainId: 42220,
    rpc: 'https://forno.celo.org',
    explorer: 'https://celoscan.io',
    v3Manager: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
    v4Manager: '',
    defaultProtocol: 'v3',
    uniswapSlug: 'celo',
    nativeCurrency: 'CELO'
  }
};

// Map slug variants to network keys
const SLUG_TO_NETWORK = {
  monad: 'monad',
  megaeth: 'megaeth',
  arc: 'arc',
  tempo: 'tempo',
  robinhood: 'robinhood',
  rh: 'robinhood',
  mainnet: 'ethereum',
  eth: 'ethereum',
  ethereum: 'ethereum',
  base: 'base',
  arbitrum: 'arbitrum',
  'arbitrum-one': 'arbitrum',
  arb: 'arbitrum',
  optimism: 'optimism',
  op: 'optimism',
  polygon: 'polygon',
  matic: 'polygon',
  bnb: 'bnb',
  bsc: 'bnb',
  avalanche: 'avalanche',
  avax: 'avalanche',
  celo: 'celo',
  blast: 'blast',
  zksync: 'zksync',
  era: 'zksync',
  linea: 'linea',
  worldchain: 'worldchain',
  world: 'worldchain',
  zora: 'zora',
  soneium: 'soneium',
  unichain: 'unichain',
  ink: 'ink',
  xlayer: 'xlayer'
};

// Known common token addresses for instant resolution
const KNOWN_TOKENS = {
  // Robinhood
  '0x4200000000000000000000000000000000000006': 'WETH',
  '0x028ab6487e3ca655d81b37ec8a855364806a6c2f': 'USDG',
  '0x643194a20a6726553df5e902b3c2e78070ca0c6e': 'UBIK',
  // Base
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': 'USDC',
  // Ethereum
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'USDC',
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'USDT',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'WETH'
};

const tokenSymbolCache = { ...KNOWN_TOKENS };

// ============================================================================
// Internationalization (i18n) Dictionary
// ============================================================================
const I18N = {
  id: {
    inputSectionTitle: 'Input Posisi NFT',
    inputSectionDesc: 'Paste URL Uniswap atau masukkan ID token.',
    urlDetectedStrong: 'URL Uniswap Terdeteksi!',
    applyBtn: 'Terapkan',
    quickLabel: 'PRESET CEPAT:',
    networkSectionTitle: 'Pilih Chain & Protokol',
    networkSectionDesc: '22+ Jaringan EVM didukung penuh.',
    selectChainLabel: 'Jaringan Blockchain',
    protocolLabel: 'Versi Uniswap',
    protoAuto: 'Auto',
    walletFilterLabel: 'Filter Wallet Pemilik (Opsional)',
    scanButtonText: 'Scan Posisi',
    scanningText: 'Memindai Posisi...',
    settingsTitle: 'Pengaturan RPC & Kontrak',
    rpcLabel: 'RPC Endpoint URL',
    managerLabel: 'PositionManager Contract',
    blockStartLabel: 'From Block (Scan Event Transfer)',
    settingsHint: 'Preset otomatis diisi sesuai chain yang dipilih. Anda dapat mengganti RPC dengan custom node (Alchemy/Infura/QuickNode).',
    historyTitle: 'Riwayat Scan',
    clearHistory: 'Hapus',
    historyEmpty: 'Belum ada riwayat scan.',
    builtWith: 'Built with passion by',
    metricTotal: 'Total Dipindai',
    metricActive: 'Posisi Aktif (In-Range)',
    metricClosed: 'Ditutup / Diburn',
    metricNetwork: 'Jaringan & Status',
    resultTitleEmpty: 'Belum ada scan',
    filterPlaceholder: 'Cari token, wallet...',
    copyAllOwners: 'Salin Semua Wallet',
    emptyStateStrong: 'Siap memindai posisi likuiditas',
    emptyStateSpan: 'Pilih chain (Monad, MegaETH, Arc, Base, dll), masukkan nomor token NFT atau paste URL Uniswap pada panel sebelah kiri untuk memulai.',
    footerText1: 'UNILP LENS MULTICHAIN × ON-CHAIN LIQUIDITY TRACER',
    footerText2: 'DATA DIBACA LANGSUNG DARI BLOCKCHAIN (RPC & INDEXER)',
    toastCopied: 'Wallet berhasil disalin!',
    toastCopiedAll: 'Semua alamat wallet berhasil disalin!',
    toastCopyFail: 'Gagal menyalin.',
    errValidRpcManager: 'Isi RPC URL dan alamat PositionManager yang valid terlebih dahulu.',
    errInvalidTokenId: 'Position ID harus berupa angka atau URL Uniswap yang valid.',
    errInvalidWallet: 'Filter wallet bukan alamat EVM yang valid.',
    positionsFound: (n) => `${n} posisi ditemukan`,
    statusOpen: 'IN RANGE',
    statusOutOfRange: 'OUT OF RANGE',
    statusClosed: 'CLOSED',
    statusError: 'ERROR',
    ownerContract: 'PEMILIK SAAT INI',
    ownerTransfer: 'PEMILIK TERAKHIR (TRANSFER LOG)',
    ownerIndexer: 'UNISWAP INDEXER',
    liquidity: 'Likuiditas',
    feeTier: 'Fee Tier',
    tokenPair: 'Pasangan Token',
    lastTransfer: 'Transfer Terakhir',
    tickRange: 'Rentang Tick',
    viewUniswap: 'Uniswap',
    viewExplorer: 'Explorer'
  },
  en: {
    inputSectionTitle: 'Enter Position NFTs',
    inputSectionDesc: 'Paste Uniswap URL or enter token IDs.',
    urlDetectedStrong: 'Uniswap URL Detected!',
    applyBtn: 'Apply',
    quickLabel: 'QUICK DEMO:',
    networkSectionTitle: 'Select Chain & Protocol',
    networkSectionDesc: '22+ EVM Networks fully supported.',
    selectChainLabel: 'Blockchain Network',
    protocolLabel: 'Uniswap Version',
    protoAuto: 'Auto',
    walletFilterLabel: 'Filter Owner Wallet (Optional)',
    scanButtonText: 'Scan Positions',
    scanningText: 'Scanning Positions...',
    settingsTitle: 'RPC & Contract Settings',
    rpcLabel: 'RPC Endpoint URL',
    managerLabel: 'PositionManager Contract',
    blockStartLabel: 'From Block (Scan Event Transfer)',
    settingsHint: 'Presets are auto-filled for the selected chain. Override with custom RPC (Alchemy/Infura/QuickNode) anytime.',
    historyTitle: 'Scan History',
    clearHistory: 'Clear',
    historyEmpty: 'No recent scan history.',
    builtWith: 'Built with passion by',
    metricTotal: 'Total Scanned',
    metricActive: 'Active (In-Range)',
    metricClosed: 'Closed / Burned',
    metricNetwork: 'Network Status',
    resultTitleEmpty: 'No scans yet',
    filterPlaceholder: 'Filter tokens, wallets...',
    copyAllOwners: 'Copy All Wallets',
    emptyStateStrong: 'Ready to track liquidity positions',
    emptyStateSpan: 'Select a chain (Monad, MegaETH, Arc, Base, etc), enter NFT position IDs or paste a Uniswap position URL on the left panel to begin.',
    footerText1: 'UNILP LENS MULTICHAIN × ON-CHAIN LIQUIDITY TRACER',
    footerText2: 'DATA FETCHED DIRECTLY FROM BLOCKCHAIN (RPC & INDEXER)',
    toastCopied: 'Wallet address copied!',
    toastCopiedAll: 'All wallet addresses copied!',
    toastCopyFail: 'Failed to copy.',
    errValidRpcManager: 'Please enter a valid RPC URL and PositionManager address.',
    errInvalidTokenId: 'Position IDs must be numbers or a valid Uniswap URL.',
    errInvalidWallet: 'Wallet filter is not a valid EVM address.',
    positionsFound: (n) => `${n} position${n === 1 ? '' : 's'} found`,
    statusOpen: 'IN RANGE',
    statusOutOfRange: 'OUT OF RANGE',
    statusClosed: 'CLOSED',
    statusError: 'ERROR',
    ownerContract: 'CURRENT ON-CHAIN OWNER',
    ownerTransfer: 'LAST HOLDER FROM TRANSFER LOG',
    ownerIndexer: 'UNISWAP INDEXER',
    liquidity: 'Liquidity',
    feeTier: 'Fee Tier',
    tokenPair: 'Token Pair',
    lastTransfer: 'Last Transfer',
    tickRange: 'Tick Range',
    viewUniswap: 'Uniswap',
    viewExplorer: 'Explorer'
  }
};

// ============================================================================
// State Management
// ============================================================================
let currentLang = localStorage.getItem('unilp_lang') || 'id';
let currentProtocol = 'v4';
let activeNetworkKey = 'monad';
let lastScannedData = [];
let pendingParsedUrl = null;

const $ = (id) => document.getElementById(id);
const t = () => I18N[currentLang];
const shortAddr = (val) => val && val.length > 10 ? `${val.slice(0, 6)}...${val.slice(-4)}` : (val || '—');
const validAddress = (val) => /^0x[a-fA-F0-9]{40}$/.test(val);

// Toast Notification
function showToast(message, type = 'info') {
  const container = $('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// Language Switcher
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('unilp_lang', lang);
  document.documentElement.lang = lang;
  $('langId').classList.toggle('active', lang === 'id');
  $('langEn').classList.toggle('active', lang === 'en');

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });

  updateNetworkUI();
}

$('langId').addEventListener('click', () => setLanguage('id'));
$('langEn').addEventListener('click', () => setLanguage('en'));

// Network UI update
function updateNetworkUI() {
  const net = NETWORKS[activeNetworkKey];
  if (!net) return;

  $('networkPillName').textContent = net.name;
  $('networkPillChainId').textContent = `#${net.chainId}`;
  $('rpcUrl').value = net.rpc;

  const targetManager = (currentProtocol === 'v4' && net.v4Manager) 
    ? net.v4Manager 
    : (net.v3Manager || net.v4Manager || '');

  $('positionManager').value = targetManager;
  $('statNetwork').textContent = `${net.name} (${net.chainId})`;

  pingRpcLatency(net.rpc);
}

function setProtocol(proto) {
  currentProtocol = proto;
  ['protoV4', 'protoV3', 'protoAuto'].forEach((btnId) => {
    const btn = $(btnId);
    if (btn) btn.classList.toggle('active', btn.dataset.proto === proto);
  });

  const net = NETWORKS[activeNetworkKey];
  if (net) {
    if (proto === 'v4' && net.v4Manager) {
      $('positionManager').value = net.v4Manager;
    } else if (proto === 'v3' && net.v3Manager) {
      $('positionManager').value = net.v3Manager;
    }
  }
}

$('chainSelect').addEventListener('change', (e) => {
  activeNetworkKey = e.target.value;
  const net = NETWORKS[activeNetworkKey];
  if (net) {
    setProtocol(net.defaultProtocol || 'v3');
  }
  updateNetworkUI();
});

$('protoV4').addEventListener('click', () => setProtocol('v4'));
$('protoV3').addEventListener('click', () => setProtocol('v3'));
$('protoAuto').addEventListener('click', () => setProtocol('auto'));

// Latency Ping
async function pingRpcLatency(url) {
  const dot = $('networkPingDot');
  const pingLabel = $('networkPingMs');
  const start = performance.now();
  try {
    const provider = new ethers.JsonRpcProvider(url);
    const blockNum = await Promise.race([
      provider.getBlockNumber(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))
    ]);
    const duration = Math.round(performance.now() - start);
    pingLabel.textContent = `${duration}ms`;
    $('statBlock').textContent = `Block #${blockNum.toLocaleString()}`;
    if (duration < 300) {
      dot.className = 'ping-dot';
      pingLabel.style.color = 'var(--neon-lime)';
    } else {
      dot.className = 'ping-dot warning';
      pingLabel.style.color = 'var(--status-warning)';
    }
  } catch (_) {
    pingLabel.textContent = 'err';
    dot.className = 'ping-dot error';
    pingLabel.style.color = 'var(--status-error)';
  }
}

$('pingRpcBtn').addEventListener('click', () => {
  pingRpcLatency($('rpcUrl').value.trim());
});

// URL Parser
function detectUniswapUrl(text) {
  if (!text) return null;
  const clean = text.trim();
  const posRegex = /(?:https?:\/\/)?(?:app\.)?uniswap\.org\/positions\/(v3|v4)\/([a-zA-Z0-9_-]+)\/(\d+)/i;
  const match = clean.match(posRegex);
  if (match) {
    return {
      version: match[1].toLowerCase(),
      chainRaw: match[2].toLowerCase(),
      tokenId: match[3]
    };
  }

  const poolRegex = /(?:https?:\/\/)?(?:app\.)?uniswap\.org\/explore\/pools\/([a-zA-Z0-9_-]+)\/(0x[a-fA-F0-9]{40})/i;
  const poolMatch = clean.match(poolRegex);
  if (poolMatch) {
    return {
      isPool: true,
      chainRaw: poolMatch[1].toLowerCase(),
      poolAddress: poolMatch[2]
    };
  }

  return null;
}

function handleUrlInputCheck() {
  const text = $('tokenIds').value;
  const detected = detectUniswapUrl(text);
  const banner = $('urlParserAlert');
  if (detected && !detected.isPool) {
    const mappedChainKey = SLUG_TO_NETWORK[detected.chainRaw] || 'ethereum';
    const chainName = NETWORKS[mappedChainKey]?.name || detected.chainRaw;
    pendingParsedUrl = {
      chainKey: mappedChainKey,
      protocol: detected.version,
      tokenId: detected.tokenId
    };
    $('urlParserDetails').textContent = `Chain: ${chainName} · ${detected.version.toUpperCase()} · Token #${detected.tokenId}`;
    banner.hidden = false;
  } else {
    banner.hidden = true;
    pendingParsedUrl = null;
  }
}

$('tokenIds').addEventListener('input', handleUrlInputCheck);
$('tokenIds').addEventListener('paste', () => setTimeout(handleUrlInputCheck, 50));

$('applyUrlBtn').addEventListener('click', () => {
  if (!pendingParsedUrl) return;
  activeNetworkKey = pendingParsedUrl.chainKey;
  $('chainSelect').value = activeNetworkKey;
  setProtocol(pendingParsedUrl.protocol);
  updateNetworkUI();
  $('tokenIds').value = pendingParsedUrl.tokenId;
  $('urlParserAlert').hidden = true;
  showToast(`Switched to ${NETWORKS[activeNetworkKey].name} (${pendingParsedUrl.protocol.toUpperCase()})`, 'success');
  scan();
});

$('clearInputBtn').addEventListener('click', () => {
  $('tokenIds').value = '';
  $('urlParserAlert').hidden = true;
  pendingParsedUrl = null;
});

// Quick preset chips
document.querySelectorAll('.tag-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const chain = chip.dataset.chain;
    const proto = chip.dataset.protocol;
    const token = chip.dataset.token;
    if (chain && NETWORKS[chain]) {
      activeNetworkKey = chain;
      $('chainSelect').value = chain;
      setProtocol(proto || 'v3');
      updateNetworkUI();
    }
    $('tokenIds').value = token;
    $('urlParserAlert').hidden = true;
    scan();
  });
});

// Top Nav Pills
$('navOverview').addEventListener('click', () => {
  $('navOverview').classList.add('active');
  $('navPositions').classList.remove('active');
  $('navHistory').classList.remove('active');
  document.querySelector('.metrics-ribbon')?.scrollIntoView({ behavior: 'smooth' });
});

$('navPositions').addEventListener('click', () => {
  $('navPositions').classList.add('active');
  $('navOverview').classList.remove('active');
  $('navHistory').classList.remove('active');
  $('tokenIds').focus();
});

$('navHistory').addEventListener('click', () => {
  $('navHistory').classList.add('active');
  $('navOverview').classList.remove('active');
  $('navPositions').classList.remove('active');
  $('historyCard')?.scrollIntoView({ behavior: 'smooth' });
});

// ERC-20 Symbol Resolver
async function resolveTokenSymbol(provider, tokenAddress) {
  if (!tokenAddress || !validAddress(tokenAddress)) return '—';
  const lower = tokenAddress.toLowerCase();
  if (tokenSymbolCache[lower]) return tokenSymbolCache[lower];

  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const sym = await Promise.race([
      contract.symbol(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500))
    ]);
    if (sym && typeof sym === 'string') {
      tokenSymbolCache[lower] = sym;
      return sym;
    }
  } catch (_) {}
  return shortAddr(tokenAddress);
}

// Format fee tier
function formatFeeTier(fee) {
  if (!fee || fee === '—') return '';
  const num = Number(fee);
  if (isNaN(num)) return fee;
  if (num === 100) return '0.01% Fee';
  if (num === 500) return '0.05% Fee';
  if (num === 3000) return '0.30% Fee';
  if (num === 10000) return '1.00% Fee';
  return `${(num / 10000).toFixed(2)}% Fee`;
}

// Local History
function loadHistory() {
  try {
    const raw = localStorage.getItem('unilp_history_v2');
    const items = raw ? JSON.parse(raw) : [];
    const list = $('historyList');
    if (!items.length) {
      list.innerHTML = `<div class="history-empty">${t().historyEmpty}</div>`;
      return;
    }
    list.innerHTML = items.map((item, idx) => `
      <div class="history-item" data-idx="${idx}">
        <span class="history-tag">${NETWORKS[item.chain]?.name || item.chain} #${item.tokenIds.slice(0, 2).join(', ')}${item.tokenIds.length > 2 ? '...' : ''}</span>
        <span class="history-time">${item.time}</span>
      </div>
    `).join('');

    list.querySelectorAll('.history-item').forEach((el) => {
      el.addEventListener('click', () => {
        const item = items[el.dataset.idx];
        if (!item) return;
        activeNetworkKey = item.chain;
        $('chainSelect').value = item.chain;
        setProtocol(item.protocol);
        updateNetworkUI();
        $('tokenIds').value = item.tokenIds.join('\n');
        scan();
      });
    });
  } catch (_) {}
}

function saveHistoryItem(chain, protocol, tokenIds) {
  try {
    const raw = localStorage.getItem('unilp_history_v2');
    let items = raw ? JSON.parse(raw) : [];
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    items.unshift({ chain, protocol, tokenIds, time });
    items = items.slice(0, 8);
    localStorage.setItem('unilp_history_v2', JSON.stringify(items));
    loadHistory();
  } catch (_) {}
}

$('clearHistoryBtn').addEventListener('click', () => {
  localStorage.removeItem('unilp_history_v2');
  loadHistory();
});

// Transfer log search for burned NFTs
async function findTransfers(provider, manager, tokenId, fromBlock) {
  const latest = await provider.getBlockNumber();
  const tokenTopic = ethers.zeroPadValue(ethers.toBeHex(tokenId), 32);
  const transferTopic = ethers.id('Transfer(address,address,uint256)');
  const events = [];
  const chunkSize = 80000;
  for (let end = latest; end >= fromBlock; end -= chunkSize) {
    const start = Math.max(fromBlock, end - chunkSize + 1);
    try {
      const logs = await provider.getLogs({
        address: manager.target,
        topics: [transferTopic, null, null, tokenTopic],
        fromBlock: start,
        toBlock: end
      });
      events.unshift(...logs.map((log) => manager.interface.parseLog(log)));
      if (events.length) break;
    } catch (_) {
      break;
    }
  }
  return events;
}

// Uniswap Indexer Client
async function getIndexedPosition(network, protocol, tokenId) {
  const chainIdParam = network.uniswapSlug ? network.uniswapSlug.toUpperCase() : 'ETHEREUM';
  const response = await fetch('/api/positions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chainId: chainIdParam,
      version: protocol.toUpperCase(),
      tokenId: String(tokenId)
    })
  });
  if (!response.ok) throw new Error(`Uniswap indexer returned ${response.status}`);
  const payload = await response.json();
  if (!payload.position) throw new Error(`Position #${tokenId} not found in Uniswap indexer.`);
  return payload.position;
}

// Skeleton loading cards
function renderSkeleton() {
  return [1, 2, 3].map(() => `
    <div class="skeleton-card">
      <div class="skeleton-line h-24 w-40"></div>
      <div class="skeleton-line h-40"></div>
      <div class="skeleton-line h-24 w-80"></div>
      <div class="skeleton-line h-24 w-60"></div>
    </div>
  `).join('');
}

// Render position card (Obsidian & Lime Theme)
function renderCard(data) {
  const dict = t();
  const net = NETWORKS[data.networkKey] || NETWORKS.monad;
  
  if (data.error) {
    return `
      <article class="result-card" data-token="${data.tokenId}" data-owner="">
        <div class="card-top">
          <div class="card-chain-pill">
            <span>${net.name}</span>
            <span class="card-token-id">#${data.tokenId}</span>
          </div>
          <span class="status-pill error">${dict.statusError}</span>
        </div>
        <div class="data-row" style="padding: 12px 0; color: var(--status-error);">
          <span>${data.error}</span>
        </div>
      </article>
    `;
  }

  let statusClass = 'open in-range';
  let statusText = dict.statusOpen;
  if (data.status === 'POSITION_STATUS_CLOSED' || data.liquidity === '0' || data.isClosed) {
    statusClass = 'closed';
    statusText = dict.statusClosed;
  } else if (data.inRange === false) {
    statusClass = 'out-range';
    statusText = dict.statusOutOfRange;
  }

  let ownerSourceLabel = dict.ownerContract;
  if (data.ownerSource === 'transfer-history') ownerSourceLabel = dict.ownerTransfer;
  if (data.ownerSource === 'uniswap-indexer') ownerSourceLabel = dict.ownerIndexer;

  const uniswapUrl = `https://app.uniswap.org/positions/${data.protocol}/${net.uniswapSlug}/${data.tokenId}`;
  const explorerUrl = `${net.explorer}/address/${data.owner}`;
  const feeDisplay = formatFeeTier(data.fee);

  return `
    <article class="result-card" data-token="${data.tokenId}" data-owner="${data.owner}">
      <!-- Card Top: Chain, Token ID & Status Badge -->
      <div class="card-top">
        <div class="card-chain-pill">
          <span>${net.name}</span>
          <span class="card-token-id">#${data.tokenId}</span>
          <span class="proto-tag">${data.protocol.toUpperCase()}</span>
        </div>
        <span class="status-pill ${statusClass}">${statusText}</span>
      </div>

      <!-- Token Pair Banner -->
      <div class="card-pair-box">
        <div class="pair-names">
          <span>${data.symbol0 || shortAddr(data.currency0)}</span>
          <span style="color: var(--text-dim);">/</span>
          <span>${data.symbol1 || shortAddr(data.currency1)}</span>
        </div>
        ${feeDisplay ? `<span class="pair-fee-badge">${feeDisplay}</span>` : ''}
      </div>

      <!-- Owner Wallet Box -->
      <div class="card-owner-box">
        <div class="owner-label-row">
          <span>${ownerSourceLabel}</span>
          ${data.block ? `<span class="mono-font">${data.block}</span>` : ''}
        </div>
        <div class="owner-address-wrap">
          <span class="owner-address mono-font" title="${data.owner}">${data.owner}</span>
          <button class="card-copy-btn" type="button" data-wallet="${data.owner}" title="Copy wallet address">Copy</button>
        </div>
      </div>

      <!-- Details List -->
      <div class="card-data-grid">
        <div class="data-row">
          <span class="data-row-label">${dict.liquidity}</span>
          <span class="data-row-value" title="${data.liquidity}">${data.liquidityFormatted || data.liquidity}</span>
        </div>
        ${data.tickLower !== undefined && data.tickUpper !== undefined ? `
          <div class="data-row">
            <span class="data-row-label">${dict.tickRange}</span>
            <span class="data-row-value">[${data.tickLower}, ${data.tickUpper}]</span>
          </div>
        ` : ''}
        <div class="data-row">
          <span class="data-row-label">Token 0</span>
          <span class="data-row-value mono-font" title="${data.currency0}">${shortAddr(data.currency0)}</span>
        </div>
        <div class="data-row">
          <span class="data-row-label">Token 1</span>
          <span class="data-row-value mono-font" title="${data.currency1}">${shortAddr(data.currency1)}</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card-footer-actions">
        <a href="${uniswapUrl}" target="_blank" rel="noopener noreferrer" class="ext-link-btn" title="View in Uniswap App">
          <span>${dict.viewUniswap}</span>
          <span style="color: var(--neon-lime);">↗</span>
        </a>
        <a href="${explorerUrl}" target="_blank" rel="noopener noreferrer" class="ext-link-btn" title="View Owner on Explorer">
          <span>${dict.viewExplorer}</span>
          <span style="color: var(--neon-lime);">↗</span>
        </a>
      </div>
    </article>
  `;
}

// Copy single wallet
document.addEventListener('click', async (event) => {
  const btn = event.target.closest('.card-copy-btn');
  if (btn) {
    const wallet = btn.dataset.wallet;
    try {
      await navigator.clipboard.writeText(wallet);
      btn.textContent = 'Copied!';
      showToast(t().toastCopied, 'success');
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    } catch (_) {
      showToast(t().toastCopyFail, 'error');
    }
  }
});

// Copy all discovered owners
$('copyAllOwnersBtn').addEventListener('click', async () => {
  const owners = [...new Set(lastScannedData.map((d) => d.owner).filter(Boolean))];
  if (!owners.length) return;
  try {
    await navigator.clipboard.writeText(owners.join('\n'));
    showToast(`${owners.length} ${t().toastCopiedAll}`, 'success');
  } catch (_) {
    showToast(t().toastCopyFail, 'error');
  }
});

// Results filter bar inside view
$('resultsFilter').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll('#results .result-card');
  cards.forEach((card) => {
    const token = card.dataset.token || '';
    const owner = (card.dataset.owner || '').toLowerCase();
    const text = card.textContent.toLowerCase();
    const match = !q || token.includes(q) || owner.includes(q) || text.includes(q);
    card.style.display = match ? '' : 'none';
  });
});

// Core Scan Engine
async function scan() {
  const dict = t();
  const net = NETWORKS[activeNetworkKey] || NETWORKS.monad;
  const rpc = $('rpcUrl').value.trim() || net.rpc;
  const managerAddress = $('positionManager').value.trim();
  const walletFilter = $('walletFilter').value.trim().toLowerCase();

  if (!rpc || !managerAddress || !validAddress(managerAddress)) {
    showToast(dict.errValidRpcManager, 'error');
    return;
  }
  if (walletFilter && !validAddress(walletFilter)) {
    showToast(dict.errInvalidWallet, 'error');
    return;
  }

  const rawInput = $('tokenIds').value;
  const detectedUrl = detectUniswapUrl(rawInput);
  let ids = [];
  if (detectedUrl && !detectedUrl.isPool) {
    ids = [detectedUrl.tokenId];
  } else {
    ids = [...new Set(rawInput.split(/[\s,]+/).map((s) => s.trim()).filter((s) => /^\d+$/.test(s)))];
  }

  if (!ids.length) {
    showToast(dict.errInvalidTokenId, 'error');
    return;
  }

  let proto = currentProtocol;
  if (proto === 'auto') {
    proto = net.defaultProtocol || 'v3';
  }

  $('scanButton').disabled = true;
  $('scanButtonText').textContent = dict.scanningText;
  $('results').innerHTML = renderSkeleton();
  $('statusBox').hidden = true;

  try {
    const provider = new ethers.JsonRpcProvider(rpc);
    saveHistoryItem(activeNetworkKey, proto, ids);

    let usedIndexer = false;
    let results = [];

    // Try Uniswap indexer first for supported mainnets
    if (proto === 'v4' && (net.uniswapSlug === 'robinhood' || net.uniswapSlug === 'base' || net.uniswapSlug === 'ethereum')) {
      try {
        const indexerResults = await Promise.all(ids.map(async (tokenId) => {
          try {
            const pos = await getIndexedPosition(net, proto, tokenId);
            if (walletFilter && pos.owner.toLowerCase() !== walletFilter) return null;
            return {
              networkKey: activeNetworkKey,
              protocol: proto,
              tokenId,
              owner: pos.owner,
              ownerSource: 'uniswap-indexer',
              liquidity: pos.liquidity || '0',
              currency0: pos.token0Address,
              currency1: pos.token1Address,
              symbol0: KNOWN_TOKENS[pos.token0Address?.toLowerCase()] || shortAddr(pos.token0Address),
              symbol1: KNOWN_TOKENS[pos.token1Address?.toLowerCase()] || shortAddr(pos.token1Address),
              fee: pos.feeTier,
              status: pos.status,
              isClosed: pos.status === 'POSITION_STATUS_CLOSED' || pos.liquidity === '0',
              block: 'Uniswap Indexer'
            };
          } catch (e) {
            return null;
          }
        }));

        if (indexerResults.some(Boolean)) {
          results = indexerResults.filter(Boolean);
          usedIndexer = true;
        }
      } catch (_) {}
    }

    // Direct On-Chain Contract Scan (Universal EVM Engine)
    if (!results.length) {
      const manager = new ethers.Contract(managerAddress, proto === 'v3' ? V3_ABI : V4_ABI, provider);
      const fromBlock = Number($('fromBlock').value || 0);

      results = await Promise.all(ids.map(async (tokenId) => {
        try {
          let owner = null;
          let ownerSource = 'contract';

          try {
            owner = await manager.ownerOf(tokenId);
          } catch (err) {
            ownerSource = 'transfer-history';
          }

          let lastTransfer = null;
          if (!owner) {
            const transfers = await findTransfers(provider, manager, tokenId, fromBlock);
            lastTransfer = transfers.at(-1);
            if (lastTransfer) {
              const transferTo = lastTransfer.args.to;
              const zeroAddr = ethers.ZeroAddress.toLowerCase();
              owner = transferTo.toLowerCase() === zeroAddr ? lastTransfer.args.from : transferTo;
            }
          }

          if (!owner) {
            throw new Error(`Position #${tokenId} is not registered on ${net.name}.`);
          }

          if (walletFilter && owner.toLowerCase() !== walletFilter) {
            return null;
          }

          let liquidity = '0';
          let currency0 = '—';
          let currency1 = '—';
          let fee = '—';
          let tickLower = undefined;
          let tickUpper = undefined;

          if (proto === 'v3') {
            const pos = await manager.positions(tokenId);
            currency0 = pos.token0;
            currency1 = pos.token1;
            fee = pos.fee.toString();
            liquidity = pos.liquidity.toString();
            tickLower = Number(pos.tickLower);
            tickUpper = Number(pos.tickUpper);
          } else {
            try {
              liquidity = (await manager.getPositionLiquidity(tokenId)).toString();
            } catch (_) {}
            try {
              const pool = await manager.getPoolAndPositionInfo(tokenId);
              currency0 = pool[0].currency0;
              currency1 = pool[0].currency1;
              fee = pool[0].fee.toString();
            } catch (_) {}
          }

          const [symbol0, symbol1] = await Promise.all([
            resolveTokenSymbol(provider, currency0),
            resolveTokenSymbol(provider, currency1)
          ]);

          return {
            networkKey: activeNetworkKey,
            protocol: proto,
            tokenId,
            owner,
            ownerSource,
            liquidity,
            currency0,
            currency1,
            symbol0,
            symbol1,
            fee,
            tickLower,
            tickUpper,
            isClosed: liquidity === '0',
            block: lastTransfer ? `Tx Block #${lastTransfer.blockNumber}` : ''
          };
        } catch (error) {
          return {
            networkKey: activeNetworkKey,
            protocol: proto,
            tokenId,
            error: error.shortMessage || error.message
          };
        }
      }));
    }

    const filtered = results.filter(Boolean);
    lastScannedData = filtered;

    if (filtered.length) {
      $('results').innerHTML = filtered.map(renderCard).join('');
      $('copyAllOwnersBtn').hidden = false;
    } else {
      $('results').innerHTML = `
        <div class="empty-state">
          <strong class="empty-title">Tidak ada hasil cocok</strong>
          <span class="empty-desc">Tidak ada posisi yang sesuai dengan filter wallet yang dimasukkan.</span>
        </div>
      `;
      $('copyAllOwnersBtn').hidden = true;
    }

    const activeCount = filtered.filter((d) => !d.error && !d.isClosed).length;
    const closedCount = filtered.filter((d) => !d.error && d.isClosed).length;
    $('statTotal').textContent = filtered.length;
    $('statActive').textContent = activeCount;
    $('statClosed').textContent = closedCount;

    $('resultTitle').textContent = dict.positionsFound(filtered.length);
    const nowStr = new Date().toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US');
    $('scanMeta').textContent = `${nowStr} · ${net.name} (${net.chainId}) · ${usedIndexer ? 'Uniswap Indexer' : 'Direct RPC'}`;

    showToast(`Scan selesai: ${filtered.length} posisi dimuat.`, 'success');

  } catch (error) {
    $('results').innerHTML = `
      <div class="empty-state">
        <strong class="empty-title" style="color: var(--status-error);">Scan Gagal</strong>
        <span class="empty-desc">${error.shortMessage || error.message}</span>
      </div>
    `;
    showToast(error.shortMessage || error.message, 'error');
  } finally {
    $('scanButton').disabled = false;
    $('scanButtonText').textContent = dict.scanButtonText;
  }
}

// Global Keyboard Shortcut: Ctrl + Enter / Cmd + Enter
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    scan();
  }
});

$('scanButton').addEventListener('click', scan);

// Mobile Sidebar Toggle
$('sidebarToggle').addEventListener('click', () => {
  $('appSidebar').classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const sidebar = $('appSidebar');
  const toggle = $('sidebarToggle');
  if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  updateNetworkUI();
  loadHistory();
  handleUrlInputCheck();
});
