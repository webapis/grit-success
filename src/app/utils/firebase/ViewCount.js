import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';


const ViewCount = ({ linkId,userViewData }) => {

const viewCount =userViewData &&  userViewData['data'].find(f=> f.href.includes(linkId))


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton disabled >
        <VisibilityIcon />
        <span style={{ marginLeft: '8px', fontSize: 14 }}> {viewCount&& viewCount.count}</span>
      </IconButton>

    </div>
  );





};

export default ViewCount;
