export default function SelectInput( { name, inputLabel, data, handleChange} ) {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Do you want to set this Project to Public?
      </label>
      <select
        id={name}
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option selected>Select an Option</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </>
  );
}
