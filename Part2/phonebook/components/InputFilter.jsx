const InputFilter = ({ personFilter, change }) => {
  return (
    <div>
      filter shown with <input value={personFilter} onChange={change} />
    </div>
  );
};

export default InputFilter;
