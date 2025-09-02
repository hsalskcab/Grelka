import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryGroup, Gender } from '../../lib/types';
import styles from './styles.module.css';

interface MegaMenuProps {
  groups: CategoryGroup[];
  gender: Gender;
  onLinkClick?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ groups, gender, onLinkClick }) => {
  const genderText = gender === 'male' ? 'Мужское' : 'Женское';

  // Функция для формирования URL
  const getCategoryUrl = (categorySlug: string) => {
    return `/catalog?gender=${gender}&category=${categorySlug}`;
  };
  const getGroupUrl = (groupSlug: string) => {
    return `/catalog?gender=${gender}&category_group=${groupSlug}`;
  };

  return (
    <div className={styles.megaMenu}>
      {/* Обертка для центрирования содержимого */}
      <div className={styles.megaMenuContent}>
        {/* Заголовок */}
        <h3 className={styles.title}>Список категорий: {genderText}</h3>

        {/* Сетка групп */}
        <div className={styles.grid}>
          {groups.map((group) => (
            <div key={group.id} className={styles.group}>
              {/* Заголовок группы (тоже ссылка) */}
              <Link
                to={getGroupUrl(group.slug)}
                className={styles.groupTitle}
                onClick={onLinkClick}
              >
                {group.title}
              </Link>

              {/* Список категорий в группе */}
              <div className={styles.items}>
                {group.items.map((category) => (
                  <Link
                    key={category.id}
                    to={getCategoryUrl(category.slug)}
                    className={styles.link}
                    onClick={onLinkClick}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Увидеть всё" */}
        <div className={styles.seeAll}>
          <Link
            to={`/catalog?gender=${gender}`}
            className={styles.seeAllLink}
            onClick={onLinkClick}
          >
            Увидеть всё
          </Link>
        </div>
      </div>
    </div>
  );
};