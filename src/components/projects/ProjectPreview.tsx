import type { Project } from "../../types/project";
import "./ProjectPreview.css";

type ProjectPreviewProps = {
  project: Project;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const palette = project.palette.length
    ? project.palette
    : ["#EFC7BA", "#DF4B3F", "#355FBE", "#E5CDA9", "#3A2320"];

  return (
    <div className="project-preview">
      <div
        className="shape shape--quarter"
        style={{ background: palette[0] }}
      />
      <div
        className="shape shape--arch"
        style={{ background: palette[1] || palette[0] }}
      />
      <div
        className="shape shape--blob"
        style={{ background: palette[2] || palette[0] }}
      />
      <div
        className="shape shape--circle"
        style={{ background: palette[3] || palette[1] || palette[0] }}
      />
      <div
        className="shape shape--semi"
        style={{ background: palette[4] || palette[2] || palette[0] }}
      />
    </div>
  );
}
