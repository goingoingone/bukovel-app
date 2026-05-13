import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const assets = {
  hero: 'https://www.figma.com/api/mcp/asset/df8fcea4-251f-4dda-955f-9e1878d3d026',
  lake: 'https://www.figma.com/api/mcp/asset/b1f20561-5d2d-4900-bb37-1a80bfe413f8',
  hike: 'https://www.figma.com/api/mcp/asset/efe11beb-118e-4c89-a750-4298ecd94fe4',
  concert: 'https://www.figma.com/api/mcp/asset/610fec05-881b-4191-9857-e7e4c3772d5b',
  storyImage: 'https://www.figma.com/api/mcp/asset/3255a802-21fd-4ad7-8168-d3c1ab1dc597',
  storyImageAlt: 'https://www.figma.com/api/mcp/asset/181bb9d6-3fb9-41ca-b5d9-bb7ef449bf96',
  insurance: 'https://www.figma.com/api/mcp/asset/6d03c33c-cc79-4126-90dd-10f46ed84b02',
  aiTrees: 'https://www.figma.com/api/mcp/asset/3770ff4a-cc79-4b50-8ba9-60b2130c551c',
  aiCloud: 'https://www.figma.com/api/mcp/asset/2ab85bca-6d87-4324-a87d-e5ca0ca99e2f',
  logo: 'https://www.figma.com/api/mcp/asset/614501d3-2e35-4fba-acff-8a975369bc87',
  chevron: 'https://www.figma.com/api/mcp/asset/3807aa1c-3514-4c2f-94a6-8bf3d28c7858',
  chevronGreen: 'https://www.figma.com/api/mcp/asset/bda321f2-3720-451b-aeab-675e0aa5b177',
  parkingIcon: 'https://www.figma.com/api/mcp/asset/c6ded265-81af-45d7-8dbb-d041ea424dc4',
  foodIcon: 'https://www.figma.com/api/mcp/asset/e4f12ef2-200b-4603-b185-a60138a6abca',
  camIcon: 'https://www.figma.com/api/mcp/asset/0fa178d0-9d7b-4c20-afc8-52945518900a',
  tonightIcon: 'https://www.figma.com/api/mcp/asset/62da3b9f-02df-4bde-b631-8c97e4c92831',
  timeIcon: 'https://www.figma.com/api/mcp/asset/1ea97d07-9e27-4806-aac7-af2584ad30e6',
  placeIcon: 'https://www.figma.com/api/mcp/asset/c1aa4ea0-2b7a-4bc1-aa6a-9573445cb721',
  liveTimeIcon: 'https://www.figma.com/api/mcp/asset/c83fd45a-c5a8-49ca-be01-090da2ea7b3d',
  topActionA: 'https://www.figma.com/api/mcp/asset/61e3317a-67d3-4b62-a539-ea29d66f727a',
  topActionB: 'https://www.figma.com/api/mcp/asset/69caf671-be5c-4070-9ca8-5f0691ed0fc0',
  navToday: 'https://www.figma.com/api/mcp/asset/7bbcc8f6-218f-4f57-8841-cc9379b97fec',
  navExplore: 'https://www.figma.com/api/mcp/asset/e1648d87-1e9a-43d6-bd12-e99b8ae1476e',
  navMap: 'https://www.figma.com/api/mcp/asset/3e0c3554-0648-403b-8423-307feb8e91a0',
  navTrips: 'https://www.figma.com/api/mcp/asset/8aaeea8d-ccdd-4136-bad3-143258e397b1',
  navProfile: 'https://www.figma.com/api/mcp/asset/982ea3b8-c97e-4438-bc02-3eeb892832cb',
  aiBadge: 'https://www.figma.com/api/mcp/asset/8833db8b-bac9-40e3-8f50-01f3c1ba3c72',
};

const quickActions = [
  ['Parking', 'Find free spots', assets.parkingIcon, 166],
  ['Food nearby', 'Places to eat', assets.foodIcon, 164],
  ['Live cams', 'Check the view', assets.camIcon, 172],
  ['Tonight', 'Events & live music', assets.tonightIcon, 188],
];

const fitCards = [
  ['OUTDOOR', 'Lake activities', 'Best before 16:00', assets.lake, null, false],
  ['HIKE', 'Ridge hike', '12:00 next group start', assets.hike, { height: '236.11%', left: '-128.04%', top: '-64.24%', width: '349.55%' }, true],
  ['EVENTS', 'Lake stage concert', 'Starts in 3 hours', assets.concert, { height: '264.04%', left: '-279.79%', top: '-75.49%', width: '396.06%' }, false],
];

const liveActivities = [
  [
    'Fishing tournament',
    'Bike Park',
    'Just started',
    assets.storyImage,
    '85 8',
    { height: '223.18%', left: '-266.38%', top: '-61.59%', width: '396.55%' },
  ],
  [
    'Live music at the terrace',
    'Mountain Terrace',
    'Until 17:00',
    assets.storyImage,
    '25 8',
    { height: '291.1%', left: '-208.62%', top: '-95.55%', width: '517.24%' },
  ],
  [
    'Yoga by the lake',
    'Lake Area',
    'Until 15:30',
    assets.storyImage,
    null,
    { height: '275.86%', left: '-42.36%', top: '-94.28%', width: '490.16%' },
  ],
  [
    'Fishing tournament',
    'Bike Park',
    'Just started',
    assets.storyImageAlt,
    '85 8',
    { height: '226.91%', left: '-274.44%', top: '-57.9%', width: '406.4%' },
  ],
];

const navItems = [
  ['Today', assets.navToday],
  ['Explore', assets.navExplore],
  ['Map', assets.navMap],
  ['Plan trips', assets.navTrips],
  ['Profile', assets.navProfile],
];

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.055 },
  },
};

const riseIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });

function App() {
  const [activeTab, setActiveTab] = useState('Today');
  const [toast, setToast] = useState('');
  const [topBarDark, setTopBarDark] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const criticalAssets = [
      assets.hero,
      assets.logo,
      assets.topActionA,
      assets.topActionB,
      assets.lake,
      assets.hike,
      assets.insurance,
      assets.storyImage,
      assets.aiCloud,
    ];
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 2200));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.race([Promise.all([fontsReady, ...criticalAssets.map(preloadImage)]), timeout]).then(() => {
      if (mounted) setAppReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__bukovelToast);
    window.__bukovelToast = window.setTimeout(() => setToast(''), 2200);
  };

  return (
    <main className="min-h-[100dvh] bg-white text-[#2c3624] lg:bg-[#dfe8e6]">
      <div className="mx-auto flex min-h-[100dvh] w-full justify-center lg:items-start lg:gap-12 lg:px-10 lg:py-8">
        {!appReady ? (
          <LoadingShell />
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onScroll={(event) => setTopBarDark(event.currentTarget.scrollTop > 250)}
            className="ios-scroll relative h-[100dvh] w-full max-w-[402px] overflow-y-auto overflow-x-hidden bg-white shadow-2xl lg:h-[874px] lg:rounded-[38px] no-scrollbar"
          >
            <HomeSummer notify={notify} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TopBar notify={notify} dark={topBarDark} />
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -14, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -10, x: '-50%' }}
                className="fixed left-1/2 top-5 z-50 w-[min(342px,calc(100vw-40px))] rounded-full bg-[#2c3624] px-5 py-3 text-center text-sm font-semibold text-white shadow-2xl"
              >
                {toast}
              </motion.div>
            )}
          </motion.section>
        )}

      </div>
    </main>
  );
}

function LoadingShell() {
  return (
    <section className="relative h-[100dvh] min-h-[100svh] w-full max-w-[402px] overflow-hidden bg-white shadow-2xl lg:h-[874px] lg:min-h-0 lg:rounded-[38px]">
      <div className="relative h-[459px] overflow-hidden bg-[#e7ecea]">
        <div className="skeleton absolute left-5 top-16 h-8 w-8 rounded-lg" />
        <div className="absolute right-5 top-16 flex gap-2">
          <div className="skeleton h-[54px] w-[54px] rounded-full" />
          <div className="skeleton h-[54px] w-[54px] rounded-full" />
        </div>
        <div className="skeleton absolute left-5 top-[148px] h-4 w-[214px] rounded-full" />
        <div className="skeleton absolute left-5 top-[182px] h-14 w-[260px] rounded-2xl" />
        <div className="absolute left-0 top-[266px] w-full overflow-hidden px-5">
          <div className="flex w-max gap-1">
            <div className="skeleton h-16 w-[166px] shrink-0 rounded-[18px]" />
            <div className="skeleton h-16 w-[164px] shrink-0 rounded-[18px]" />
            <div className="skeleton h-16 w-[172px] shrink-0 rounded-[18px]" />
          </div>
        </div>
      </div>
      <div className="relative -mt-[88px] min-h-[calc(100dvh-371px)] rounded-t-[32px] bg-white px-5 pt-5">
        <div className="skeleton h-9 w-[230px] rounded-xl" />
        <div className="skeleton mt-2 h-5 w-[260px] rounded-lg" />
        <div className="mt-5 flex gap-1 overflow-hidden">
          <div className="skeleton h-[222px] w-[222px] shrink-0 rounded-[24px]" />
          <div className="skeleton h-[222px] w-[222px] shrink-0 rounded-[24px]" />
        </div>
        <div className="skeleton mt-3 h-5 w-[152px] rounded-lg" />
        <div className="skeleton mt-2 h-4 w-[136px] rounded-lg" />
        <div className="skeleton mt-8 h-[84px] rounded-[24px]" />
        <div className="mt-8 flex items-center justify-between">
          <div className="skeleton h-9 w-[190px] rounded-xl" />
          <div className="skeleton h-5 w-[64px] rounded-lg" />
        </div>
        <div className="mt-3 flex gap-5 overflow-hidden">
          <div className="skeleton h-[126px] w-[126px] shrink-0 rounded-full" />
          <div className="skeleton h-[126px] w-[126px] shrink-0 rounded-full" />
          <div className="skeleton h-[126px] w-[126px] shrink-0 rounded-full" />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 z-40 h-[50px] w-full px-4 pb-[21px] pt-[10px]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)',
        }}
      >
        <div className="absolute left-5 top-[-31px] h-[60px] w-[362px] rounded-[72px] bg-white p-1">
          <div className="flex h-full items-center justify-between">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="flex h-[52px] flex-1 flex-col items-center justify-end rounded-[64px] pb-[6px] pt-[10px]">
                <div className="skeleton h-6 w-6 rounded-md" />
                <div className="skeleton mt-1 h-3 w-9 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeSummer({ notify, activeTab, setActiveTab }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="relative min-h-[1900px] overflow-hidden bg-white pb-[136px]">
      <Hero notify={notify} />

      <motion.section variants={riseIn} className="relative z-10 -mt-[88px] rounded-t-[32px] bg-white px-5 pt-5">
          <SectionHeader title="What fits today" subtitle="Curated for the weather and your pace" />
          <div className="-mx-5 mt-5 flex gap-1 overflow-x-auto px-5 no-scrollbar">
            {fitCards.map(([tag, title, time, image, cropStyle, hasOverlay]) => (
              <motion.button
                key={title}
                variants={riseIn}
                whileTap={{ scale: 0.98 }}
                onClick={() => notify(`${title} added to your day`)}
                className="w-[222px] shrink-0 text-left"
              >
                <div className="relative h-[222px] overflow-hidden rounded-[24px] bg-[#d7e3dc]">
                  {cropStyle ? (
                    <img src={image} alt="" className="absolute max-w-none" style={cropStyle} />
                  ) : (
                    <img src={image} alt="" className="absolute inset-0 h-full w-full max-w-none object-cover" />
                  )}
                  {hasOverlay && <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-black/0 to-black/40" />}
                  <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-md">
                    {tag}
                  </span>
                </div>
                <p className="mt-3 text-[18px] font-bold leading-5 tracking-[-0.01em]">{title}</p>
                <p className="mt-2 flex items-center gap-1 text-[12px] font-medium leading-4 text-[#78846e]">
                  <IconAsset src={assets.timeIcon} size={16} /> {time}
                </p>
              </motion.button>
            ))}
          </div>

          <motion.button
            variants={riseIn}
            whileTap={{ scale: 0.985 }}
            onClick={() => notify('Insurance offer opened')}
            className="mt-8 flex w-full items-center justify-between rounded-[24px] bg-[#edf2f0] p-4 text-left"
          >
          <span className="flex items-center gap-2.5">
            <span className="grid h-[52px] w-[52px] place-items-center overflow-hidden rounded-2xl">
              <img src={assets.insurance} alt="" className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="block text-[18px] font-bold leading-5">Insurance</span>
              <span className="mt-1 block text-[12px] font-medium leading-4 text-[#69775e]">Enjoy Bukovel worry-free</span>
            </span>
          </span>
          <span className="flex items-center gap-1 text-left text-[#009652]">
            <span className="text-[12px] font-medium leading-[17px]">
              from<br />
              <strong className="text-[14px] font-black">90</strong> UAH<br />
              /day
            </span>
            <IconAsset src={assets.chevronGreen} size={16} />
          </span>
          </motion.button>

          <motion.div variants={riseIn} className="mt-8">
            <SectionHeader title="Live activities" seeAllTop subtitle="" />
            <div className="-mx-5 mt-3 flex gap-5 overflow-x-auto px-5 no-scrollbar">
              {liveActivities.map(([title, place, time, image, dashPattern, imageStyle], index) => (
                <motion.button
                  key={`${title}-${index}`}
                  variants={riseIn}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => notify(`${title} opened`)}
                  className="relative w-[126px] shrink-0 text-left"
                >
                  <div className="relative h-[142px] w-[126px]">
                    <div className="absolute left-0 top-2 h-[126px] w-[126px] overflow-hidden rounded-full bg-[#dce6df]">
                      <img src={image} alt="" className="absolute max-w-none" style={imageStyle} />
                    </div>
                    {dashPattern && (
                      <svg className="pointer-events-none absolute left-[-5px] top-[3px] h-[136px] w-[136px] -rotate-90 overflow-visible" viewBox="0 0 136 136" aria-hidden="true">
                        <circle
                          cx="68"
                          cy="68"
                          r="67"
                          fill="none"
                          stroke="#009652"
                          strokeWidth="2"
                          strokeDasharray={dashPattern}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="mt-2 w-[126px] text-[18px] font-bold leading-5 tracking-[-0.01em]">{title}</p>
                  <p className="mt-3 flex items-center gap-1 text-[12px] font-medium leading-4 text-[#7d8676]">
                    <IconAsset src={assets.placeIcon} size={16} /> {place}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium leading-4 text-[#7d8676]">
                    <IconAsset src={assets.liveTimeIcon} size={16} /> {time}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AiPlanner notify={notify} />
      </motion.section>
    </motion.div>
  );
}

function Hero({ notify }) {
  return (
    <motion.header variants={riseIn} className="sticky top-0 z-0 h-[459px] overflow-hidden">
      <img
        src={assets.hero}
        alt=""
        className="absolute left-1/2 top-0 h-[558px] w-[935px] max-w-none -translate-x-[31%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/18" />
      <div className="absolute left-5 top-[137px] text-white">
        <p className="flex items-center gap-2 text-sm font-medium opacity-70">
          Sunday <span className="h-0.5 w-0.5 rounded-full bg-white" /> 24º Clear skies until sunset
        </p>
        <h1 className="mt-1 w-[347px] text-[40px] font-bold leading-10 tracking-[-0.05em]">
          Good morning, Joseph
        </h1>
      </div>

      <div className="absolute left-0 top-[266px] w-full overflow-x-auto px-5 no-scrollbar">
        <div className="flex w-max gap-1">
          {quickActions.map(([title, subtitle, icon, width]) => (
            <motion.button
              key={title}
              variants={riseIn}
              whileTap={{ scale: 0.97 }}
              onClick={() => notify(`${title} selected`)}
              className="flex h-16 shrink-0 items-center gap-3.5 rounded-[18px] bg-white/20 px-5 py-4 text-left text-white backdrop-blur-xl"
              style={{ width }}
            >
              <IconAsset src={icon} size={24} />
              <span>
                <span className="block text-sm font-bold leading-4">{title}</span>
                <span className="block whitespace-nowrap text-xs leading-4 text-white/60" style={{ fontWeight: 500 }}>
                  {subtitle}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}

function TopBar({ notify, dark }) {
  const iconFilter = dark
    ? 'brightness(0) saturate(100%) invert(16%) sepia(14%) saturate(1136%) hue-rotate(53deg) brightness(92%) contrast(88%)'
    : undefined;

  return (
    <div className="pointer-events-none fixed left-1/2 top-0 z-40 h-[123px] w-full max-w-[402px] -translate-x-1/2 lg:absolute lg:left-0 lg:top-0 lg:translate-x-0">
      <nav className="absolute left-5 right-5 top-16 flex items-center justify-between">
        <img src={assets.logo} alt="Bukovel" className="h-8 w-8 object-contain transition-[filter] duration-200" style={{ filter: iconFilter }} />
        <div className="pointer-events-auto flex items-center gap-2">
          <IconButton label="Menu" onClick={() => notify('Menu opened')} dark={dark}>
            <IconAsset src={assets.topActionA} size={20} style={{ filter: iconFilter }} />
          </IconButton>
          <IconButton label="Notifications" onClick={() => notify('No new alerts')} dark={dark}>
            <IconAsset src={assets.topActionB} size={20} style={{ filter: iconFilter }} />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}

function SectionHeader({ title, subtitle, seeAllTop = false }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold leading-[1.4] tracking-[-0.02em]">{title}</h2>
        {subtitle && <p className="text-sm font-medium text-[#2c3624]/60">{subtitle}</p>}
      </div>
      <button className={`${seeAllTop ? 'mt-3' : 'mt-[31px]'} flex items-center gap-1`}>
        <span className="text-[14px] font-bold leading-normal">See all</span>
        <IconAsset src={assets.chevron} size={16} />
      </button>
    </div>
  );
}

function AiPlanner({ notify }) {
  const cardRef = useRef(null);
  const enterProgress = useMotionValue(0);
  const borderRadius = useTransform(enterProgress, [0, 1], [16, 32]);
  const imageY = useTransform(enterProgress, [0, 1], [18, -10]);
  const imageScale = useTransform(enterProgress, [0, 1], [1.06, 1]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const scroller = card.closest('.ios-scroll');
    const updateProgress = () => {
      const cardRect = card.getBoundingClientRect();
      const viewportBottom = scroller ? scroller.getBoundingClientRect().bottom : window.innerHeight;
      const visibleTopAmount = viewportBottom - cardRect.top;
      enterProgress.set(Math.min(1, Math.max(0, visibleTopAmount / 100)));
    };

    updateProgress();
    scroller?.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      scroller?.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [enterProgress]);

  return (
    <motion.section
      ref={cardRef}
      variants={riseIn}
      className="relative mt-8 h-[586px] overflow-hidden bg-[#009bf5] px-4 pb-[52px] pt-[221px] text-center text-white shadow-none"
      style={{ borderRadius }}
    >
      <motion.img
        src={assets.aiCloud}
        alt=""
        className="absolute left-[-6px] top-[-9px] h-[606px] w-[374px] max-w-none object-cover"
        style={{ y: imageY, scale: imageScale }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-between">
        <div>
          <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase leading-4 tracking-[0.08em]">
            <IconAsset src={assets.aiBadge} size={16} /> Bukovel AI
          </p>
          <h2 className="mx-auto mt-2 w-[322px] text-[44px] font-bold leading-[1.1] tracking-[-0.04em]">
            Plan your
            <br />
            perfect day
          </h2>
          <p className="mx-auto mt-5 w-[266px] text-sm font-medium leading-5 text-white/90">
            Tell us your mood and we&apos;ll build a personalized Bukovel experience around weather, activities, and pace.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => notify('AI planning started')}
          className="rounded-full bg-white px-16 py-7 text-base text-[#2c3624] shadow-none"
          style={{ fontWeight: 700 }}
        >
          Start planning
        </motion.button>
      </div>
    </motion.section>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 h-[50px] w-full max-w-[402px] -translate-x-1/2 px-4 pb-[21px] pt-[10px] lg:absolute lg:left-0 lg:translate-x-0"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)',
      }}
    >
      <div
        className="absolute left-5 top-[-31px] flex h-[60px] w-[362px] items-center justify-between rounded-[72px] bg-white p-1 shadow-none"
        style={{
          background: '#ffffff',
        }}
      >
        {navItems.map(([label, icon]) => {
          const isActive = activeTab === label;
          return (
            <motion.button
              key={label}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveTab(label)}
              className={`flex h-[52px] min-w-0 flex-1 flex-col items-center justify-end rounded-[64px] pb-[6px] pt-[10px] ${
                isActive ? 'bg-[rgba(44,54,36,0.1)] text-[#2c3624]' : 'text-[rgba(44,54,36,0.7)]'
              }`}
            >
              <IconAsset src={icon} size={24} />
              <span className="shrink-0 whitespace-nowrap text-[11px] font-medium leading-[1.4]">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function IconButton({ children, label, onClick, dark = false }) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="grid h-[54px] w-[54px] place-items-center rounded-full transition-colors duration-200"
      style={{
        background: dark ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
        backdropFilter: `blur(${dark ? 12 : 8}px)`,
        WebkitBackdropFilter: `blur(${dark ? 12 : 8}px)`,
        boxShadow: dark ? '0 4px 84px rgba(0,0,0,0.16)' : 'none',
        color: dark ? '#2c3624' : '#ffffff',
      }}
    >
      {children}
    </motion.button>
  );
}

function IconAsset({ src, size = 20, className = '', style }) {
  return <img src={src} alt="" className={`shrink-0 object-contain ${className}`} style={{ width: size, height: size, ...style }} />;
}

export default App;
