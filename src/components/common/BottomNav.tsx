import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const navItems = [
  { to: "/", label: "Projects" },
  { to: "/library", label: "Library" },
  { to: "/insights", label: "Insights" },
  { to: "/settings", label: "Settings" },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
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
