const watchlist = [
  {
    symbol: "AAPL",
    name: "Apple",
    price: "189.12",
    change: "+1.4%",
    sentiment: "positive",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: "424.07",
    change: "-0.6%",
    sentiment: "negative",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: "921.34",
    change: "+2.1%",
    sentiment: "positive",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: "174.22",
    change: "+0.2%",
    sentiment: "positive",
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: "182.31",
    change: "-0.3%",
    sentiment: "negative",
  },
];

const feedItems = [
  {
    time: "08:42",
    headline: "Apple supply chain points to AI iPhone refresh as margins climb",
    summary: "Component partners flag accelerated orders tied to on-device AI rollout.",
    source: "Bloomberg",
    webUrl: "https://www.bloomberg.com/technology",
    appUrl: "bloomberg://",
  },
  {
    time: "08:25",
    headline: "Microsoft pushes Copilot pricing tiers ahead of earnings call",
    summary: "Enterprise buyers weigh a broader rollout amid cost optimization.",
    source: "WSJ",
    webUrl: "https://www.wsj.com/tech",
    appUrl: "wsj://",
  },
  {
    time: "08:03",
    headline: "Nvidia channel checks show persistent data center demand",
    summary: "Partners report tight supply despite incremental capacity adds.",
    source: "SeekingAlpha",
    webUrl: "https://seekingalpha.com/market-news",
    appUrl: "seekingalpha://",
  },
  {
    time: "07:44",
    headline: "Inside the quiet race for AI infrastructure dominance",
    summary: "Hyperscalers renegotiate long-term GPU capacity contracts.",
    source: "The Information",
    webUrl: "https://www.theinformation.com/",
    appUrl: "theinformation://",
  },
  {
    time: "07:15",
    headline: "Tesla cuts delivery estimates for premium trim models",
    summary: "Investors focus on mix shift ahead of quarterly guidance.",
    source: "CNBC",
    webUrl: "https://www.cnbc.com/transportation/",
    appUrl: "cnbc://",
  },
  {
    time: "06:58",
    headline: "Substack finance writers debate soft-landing probability",
    summary: "Macro newsletters highlight divergence in inflation expectations.",
    source: "Substack",
    webUrl: "https://substack.com/finance",
    appUrl: "substack://",
  },
  {
    time: "06:40",
    headline: "MarketWatch tracks credit spreads as rate cuts linger",
    summary: "Bond desks see tighter spreads despite slower issuance.",
    source: "MarketWatch",
    webUrl: "https://www.marketwatch.com/markets",
    appUrl: "marketwatch://",
  },
  {
    time: "06:12",
    headline: "Barron's: Energy names rebound as refinery margins rise",
    summary: "Analysts raise near-term EPS estimates for integrated majors.",
    source: "Barron's",
    webUrl: "https://www.barrons.com/market-data",
    appUrl: "barrons://",
  },
  {
    time: "05:55",
    headline: "Yahoo Finance: Mega-cap valuations stretch as futures tick up",
    summary: "Traders watch CPI revisions for directional cues.",
    source: "Yahoo Finance",
    webUrl: "https://finance.yahoo.com/",
    appUrl: "yahoofinance://",
  },
];

const watchlistEl = document.getElementById("watchlist");
const feedEl = document.getElementById("feed");
const clockEl = document.getElementById("clock");

const formatClock = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
  clockEl.textContent = `${date} ${time} ET`;
};

const renderWatchlist = () => {
  watchlistEl.innerHTML = watchlist
    .map(
      (item) => `
      <article class="watch-card">
        <h2>${item.symbol}</h2>
        <p>${item.name}</p>
        <div class="watch-meta">
          <span>${item.price}</span>
          <span class="change ${item.sentiment}">${item.change}</span>
        </div>
      </article>
    `,
    )
    .join("");
};

const openAppOrWeb = (appUrl, webUrl) => {
  if (!appUrl) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const timeout = setTimeout(() => {
    window.open(webUrl, "_blank", "noopener,noreferrer");
  }, 650);

  window.location = appUrl;

  window.addEventListener(
    "blur",
    () => {
      clearTimeout(timeout);
    },
    { once: true },
  );
};

const renderFeed = () => {
  feedEl.innerHTML = feedItems
    .map(
      (item) => `
      <article class="feed-item">
        <time>${item.time} ET</time>
        <div>
          <h3>
            <a href="${item.webUrl}" data-app-url="${item.appUrl}" data-web-url="${item.webUrl}">
              ${item.headline}
            </a>
          </h3>
          <p>${item.summary}</p>
        </div>
        <div class="feed-source">${item.source}</div>
      </article>
    `,
    )
    .join("");
};

const attachLinkHandlers = () => {
  feedEl.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) {
      return;
    }

    event.preventDefault();
    const appUrl = link.dataset.appUrl;
    const webUrl = link.dataset.webUrl;

    openAppOrWeb(appUrl, webUrl);
  });
};

formatClock();
setInterval(formatClock, 1000);
renderWatchlist();
renderFeed();
attachLinkHandlers();
