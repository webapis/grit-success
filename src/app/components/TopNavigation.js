'use client'
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation';

export default function TopNavigation({ selected }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(selected);
  const router = useRouter();

  const handleTabClick = (event, href) => {
    event.preventDefault();
    if (href === location.pathname) return;

    setLoading(true);
    setActiveTab(href);
    
    router.push(href);
  };

  const tabStyle = {
    textTransform: 'capitalize',
    minWidth: 'auto',
    padding: '12px 16px'
  };

  const labelContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%'
  };

  const progressStyle = {
    position: 'absolute',
    bottom: -12, // Position it just under the label
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'transparent' // Hide the background track
  };

  // Custom tab label component with progress bar
  const TabLabel = ({ label, showProgress }) => (
    <div style={labelContainerStyle}>
      <span>{label}</span>
      {showProgress && (
        <LinearProgress 
          style={progressStyle}
          color="primary"
        />
      )}
    </div>
  );

  return (
    <div style={{ marginTop: 70, display: 'flex' }}>
      <Tabs 
        value={selected} 
        variant="scrollable" 
        scrollButtons 
        allowScrollButtonsMobile
      >
        <Tab
          label={<TabLabel 
            label="Sponsor Kıyafeti" 
            showProgress={loading && activeTab === "/"} 
          />}
          onClick={(e) => handleTabClick(e, "/")}
          style={tabStyle}
        />
        <Tab
          label={<TabLabel 
            label="Dizi Kıyafeti" 
            showProgress={loading && activeTab === "/dizikiyafeti"} 
          />}
          onClick={(e) => handleTabClick(e, "/dizikiyafeti")}
          style={tabStyle}
        />
        <Tab
          label={<TabLabel 
            label="Dizi Sponsoru" 
            showProgress={loading && activeTab === "/dizisponsoru"} 
          />}
          onClick={(e) => handleTabClick(e, "/dizisponsoru")}
          style={tabStyle}
        />
        <Tab
          label={<TabLabel 
            label="Sponsor Kategori" 
            showProgress={loading && activeTab === "/dizi-sponsor-kategori"} 
          />}
          onClick={(e) => handleTabClick(e, "/dizi-sponsor-kategori")}
          style={tabStyle}
        />
        <Tab
          label={<TabLabel 
            label="Yapım Şirketleri" 
            showProgress={loading && activeTab === "/turk-dizi/yapim-sirketleri"} 
          />}
          onClick={(e) => handleTabClick(e, "/turk-dizi/yapim-sirketleri")}
          style={tabStyle}
        />
      </Tabs>
    </div>
  );
}