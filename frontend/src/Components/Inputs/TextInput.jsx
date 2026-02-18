export default function TextInput({ name, inputLabel, data, handleChange}) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name={name}
        id={name}
        className="text-(--color-font-primary) block pt-2.5 pb-1 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
        value={data}
        onChange={handleChange}
        placeholder=""
        required
      />
      <label
        htmlFor={name}
        className="text-(--color-font-primary) absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {inputLabel}
      </label>
    </div>
  );
}
