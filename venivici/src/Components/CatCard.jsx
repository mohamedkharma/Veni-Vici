import Attributes from "./Attributes";

const CatCard = ({catname, attributes, image, banAttribute, onClickName }) => {
  return (
    <div className="card">
        <button onClick={() => onClickName} className="name-button" role="button">
        {catname}
        </button>
      <div className="attribute-list">
        {attributes.map((attribute, index) => (
          <Attributes key={index} attribute={attribute} isBanned={false}  />
        ))}
      </div>
      <img className="catImage" src={image} />
    </div>
  );
};

export default CatCard;