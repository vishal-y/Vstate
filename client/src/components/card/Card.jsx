import { Link } from "react-router-dom";
import "./card.scss";
import { useOpenPopup } from "../../lib/markerpopup";

function Card({ item }) {

  const { OpenPopup , setOpenPopup } = useOpenPopup()

  return (
    <div className="card" onClick={()=>{setOpenPopup(true,item.id) , console.log(OpenPopup)}}>
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0] ? item.images[0] : "/noavatar.jpg"} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title flex justify-between items-center">
          <Link to={`/${item.id}`} className="capitalize">{item.title}</Link>
            <p className="price">$ {item.price}</p>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
       
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

        
          {/* <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Card;
