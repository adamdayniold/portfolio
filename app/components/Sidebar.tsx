"use client";

import { useState } from "react";
import { FileIcon } from "@/app/components/FileIcon";
import type { FileItem } from "@/lib/getFiles";
import { Folder, FolderOpen } from "lucide-react";

interface SidebarProps {
  files: FileItem[];
  active: FileItem | null;
  onSelect: (file: FileItem) => void;
  isOpen: boolean;
  isBooting: boolean;
}

export default function Sidebar({
  files,
  active,
  onSelect,
  isOpen,
  isBooting,
}: SidebarProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  function toggleFolder(path: string) {
    setOpenFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  }

  function renderTree(items: FileItem[], depth = 0) {
    return items.map((item) => {
      const paddingLeft = 12 + depth * 16;

      if (item.type === "folder") {
        const isExpanded = openFolders[item.path];

        return (
          <div key={item.path}>
            <div
              className="file folder"
              style={{ paddingLeft }}
              onClick={() => toggleFolder(item.path)}
            >
              <span className={`chevron ${isExpanded ? "open" : ""}`}>
                &gt;
              </span>

              {isExpanded ?
                (<FolderOpen size={14} className="folder-icon open" />) : (<Folder size={14} className="folder-icon" />)
              }

              {item.name}
            </div>
            
            {isExpanded && item.children && 
              <div className="folder-children">
                {renderTree(item.children, depth + 1)}
              </div>
            }
          </div>
        );
      }

      return (
        <div
          key={item.path}
          className={`file ${active?.path === item.path ? "active" : ""}`}
          style={{ paddingLeft }}
          onClick={() => onSelect(item)}
        >
          <FileIcon filename={item.name} />
          <span>{item.name}</span>
        </div>
      );
    });
  }

  return (
    <aside
      className={`sidebar ${isOpen ? "open" : ""} ${
        isBooting ? "preload" : "animate"
      }`}
    >
      <div className="explorer">EXPLORER</div>
      {renderTree(files)}
    </aside>
  );
}