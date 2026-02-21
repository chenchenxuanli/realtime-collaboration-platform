import { type HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article';
}

export default function Card({
  as: Component = 'div',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Component className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
