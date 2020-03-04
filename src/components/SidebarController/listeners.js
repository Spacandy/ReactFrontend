export default function(window, setAccountSidebarState, setDashboardSidebarState) {
  if (typeof window === 'object') {
    if (window.innerWidth < 767) {
      setAccountSidebarState(1);
      setDashboardSidebarState(1);
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 420 && window.innerWidth < 767) {
          setAccountSidebarState(0);
          setDashboardSidebarState(0);
        }
        if (window.innerWidth >= 767) {
          setAccountSidebarState(2);
          setDashboardSidebarState(2);
        }
      });
    }
    if (window.innerWidth > 767) {
      setAccountSidebarState(2);
      setDashboardSidebarState(2);
      window.addEventListener('resize', () => {
        if (window.innerWidth < 767) {
          setAccountSidebarState(0);
          setDashboardSidebarState(0);
        }
        if (window.innerWidth >= 767) {
          setAccountSidebarState(2);
          setDashboardSidebarState(2);
        }
      });
    }
  } else {
    console.warn(
      'Cannot find window object in componentDidMount of SidebarController.jsx',
    );
  }
}
