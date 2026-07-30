"use client";
import {
  FileCode2,
  FileText,
  FileType,
  Braces
} from "lucide-react";

type Props = {
  filename: string;
  size?: number;
};

export function FileIcon({ filename, size = 16 }: Props) {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "ts":
    case "tsx":
      return <FileCode2 size={size} className="icon-ts" />;

    case "json":
      return <Braces size={size} className="icon-json" />;

    case "md":
      return <FileText size={size} className="icon-md" />;

    case "yml":
    case "yaml":
      return <FileType size={size} className="icon-yaml" />;

    default:
      return <FileText size={size} />;
  }
}
