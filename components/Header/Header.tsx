import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link
        href="/"
        className={css.headerLink}
      >
        NoteHub
      </Link>
      <nav aria-label="Main navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link
              href="/"
              className={css.navigationLink}
            >
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
