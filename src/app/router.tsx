import { createBrowserRouter } from "react-router-dom";
import { ProjectsPage } from "../pages/ProjectsPage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { KnittingPage } from "../pages/KnittingPage";
import { EditPatternPage } from "../pages/EditPatternPage";
import { LibraryPage } from "../pages/LibraryPage";
import { InsightsPage } from "../pages/InsightsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { NewProjectPage } from "../pages/NewProjectPage";


export const router = createBrowserRouter([
  { path: "/", element: <ProjectsPage /> },
  { path: "/project/:id", element: <ProjectDetailPage /> },
  { path: "/project/:id/knit", element: <KnittingPage /> },
  { path: "/project/:id/edit-pattern", element: <EditPatternPage /> },
  { path: "/library", element: <LibraryPage /> },
  { path: "/insights", element: <InsightsPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/new", element: <NewProjectPage/>},
  
]);