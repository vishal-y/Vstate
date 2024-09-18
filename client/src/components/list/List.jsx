import './list.scss'; 
import ProfileCard from '../../routes/profilePage/ProfilePageCard';
import { Link } from 'react-router-dom';

function List({ view, posts }) {

  const gridClasses = view ? 'flex gap-3' : 'grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-1 px-1 md:gap-5 md:px-3';
  
  return (
    <div className={`list grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-1 px-1 md:gap-5 md:px-3`}>
      {posts.map(item => (
        <ProfileCard view={view} key={item.id} item={item} />
      ))}
      <Link 
        to="/add" 
        className={`h-14 flex justify-center items-center transition-all duration-75 rounded-xl ${ 
          view ? 'bg-[#f49c61] border-[#f9cbbe] hover:shadow-lg hover:scale-[1.01] h-14' : 'bg-[#f6985a] ssm:h-[30vh] ssm:w-full h-[20vh] smd:h-[30vh] mt-2 w-[40vw] md:h-[35vh] lg:h-[40vh] md:w-auto border border-[#f9cbbe] hover:shadow-2xl hover:scale-[1.01]'
        }`}
      >
        <p className={`font-bold ${view ? 'text-base' : 'md:text-xl'}`}>Add a new post +</p>   
      </Link>
    </div>
  );
}

export default List;
