// Deploy Settings
export const productionBuild = true;

// Debug Settings
export const isRelease = productionBuild;
export const isDebug = !productionBuild;
export const isVerbose = false;
export const isAnalyze = false;

// Debug Tools
export const logger = false;

// Debug Console Statements
export const formDebugging = false;
export const createEventValues = false;
export const printHomePageEvents = false;
export const printIMGBrightness = false;

// Feature Toggles
export const cancelEvent = true;
export const refunds = true;
export const create = true;
export const currentTickets = false;
export const detailShareIcons = true;
export const donations = false; // show donation option in ticket type dropdown
export const edit = true;
export const billing = false;
export const tickets = true;
export const favoriteButton = false; // show PinIcon in Navbar
export const followerCount = false; // show PinIcon in Navbar
export const mediaImages = false;
export const notifications = false;
export const organizations = false;
export const pinnedEvents = false; // show PinIcon in Navbar
export const profileTab = true;
export const changePasswordTab = true;
export const checkin = false;
export const signOutButton = true;
export const publishEvent = true;
export const dashboardAttendees = true;
export const dashboardSponsorships = true;
// NAV MENU
export const browsePage = false; // show Browse in Account Navigation Menu
export const footerNavLinks = true;
export const homeNavButton = true;
export const profilePage = false;

// HOMEPAGE CAROUSELS
export const featuredEventsCarousel = true; // show FeaturedEventsCarousel in Home Route
export const freeEventsCarousel = true; // show FreeEventsCarousel in Home Route
export const popularEventsCarousel = true; // show PopularEventsCarousel in Home Route
