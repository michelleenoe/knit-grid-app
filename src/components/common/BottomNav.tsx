import { NavLink } from "react-router-dom";
import { useLocalization } from "../../localization/Localization";
import "./BottomNav.css";

export function BottomNav() {
  const localization = useLocalization();
  const navItems = [
    { to: "/", label: localization.navigation.projects },
    { to: "/library", label: localization.navigation.library },
    { to: "/insights", label: localization.navigation.insights },
    { to: "/settings", label: localization.navigation.settings },
  ];

  return (
    <nav
      className="bottom-nav"
      aria-label={localization.navigation.ariaLabel}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? " active" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
