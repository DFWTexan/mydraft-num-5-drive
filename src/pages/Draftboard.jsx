import '../styles/index.scss'
import  DraftPlyrList from '../components/draft-list'
import  DraftInfo from '../components/draft-info'
import  DraftNews from '../components/draft-news'

const Draftboard = () => {
  return (
    <div className='container'>
      <div className='displayCol'><DraftPlyrList/></div>
      <div className='displayCol'><DraftInfo/></div>
      <div className='displayCol'><DraftNews/></div>
    </div>
  );
};

export default Draftboard;
