import type { ReactNode } from 'react';
import css from './LayoutNotes.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function NotesFilterLayout({ children }: LayoutProps) {
  return (
    <div className={css.container}>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
