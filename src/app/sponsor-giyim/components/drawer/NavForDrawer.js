// app/components/Drawer.jsx
import DrawerNavigation from './DrawerNavigation';

export default function Drawer({ navData, selectedGender }) {
  return (
    <DrawerNavigation 
      navData={navData} 
      selectedGender={selectedGender} 
    />
  );
}