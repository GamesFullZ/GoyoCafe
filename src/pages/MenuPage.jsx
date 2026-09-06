import React from 'react';
import MenuSection from '../components/MenuSection';

export default function MenuPage({ onOpenQRMenu }) {
  return (
    <div className="menu-page" style={{ paddingTop: '70px' }}>
      <MenuSection onOpenQRMenu={onOpenQRMenu} />
    </div>
  );
}
