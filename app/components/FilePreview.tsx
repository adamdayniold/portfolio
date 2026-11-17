import type { ReactNode } from "react";
import type { FileItem } from "@/lib/getFiles";
import ExperienceList from "@/app/components/ExperienceList";
import ProjectList from "@/app/components/ProjectList";
import SkillsList from "@/app/components/SkillsList";
import MarkdownView from "@/app/components/MarkdownView";
import ContactView from "@/app/components/ContactView";
import EducationList from "@/app/components/EducationList";

// filename -> how to render it. Files not listed here use the code editor.
const previews: Record<string, (content: string) => ReactNode> = {
  "experience.json": (content) => <ExperienceList data={JSON.parse(content)} />,
  "projects.json": (content) => <ProjectList data={JSON.parse(content)} />,
  "skills.json": (content) => <SkillsList data={JSON.parse(content)} />,
  "about_me.md": (content) => <MarkdownView content={content} />,
  "contact.md": (content) => <ContactView content={content} />,
  "education.json": (content) => <EducationList data={JSON.parse(content)} />,
};

export function renderPreview(file: FileItem): ReactNode {
  const preview = previews[file.name];
  if (!preview) return null;

  try {
    return <div className="preview">{preview(file.content ?? "[]")}</div>;
  } catch {
    return null; // broken JSON falls back to the raw editor
  }
}
