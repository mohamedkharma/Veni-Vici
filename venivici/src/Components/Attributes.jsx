
const Attributes = ({ attribute, isBanned, onSubmit }) => {
  return (
    <button className={isBanned ? "banned-attribute-card" : "attribute-card"} onClick={onSubmit}>
      {attribute}
    </button>
  );
};

export default Attributes;