export default function Input({
  label,
  inputType,
  inputId,
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  inputType: string;
  inputId: string;
  placeholder: string;
  required: boolean;
  autoComplete?: string;
}) {
  return (
    <>
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={inputType}
        id={inputId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </>
  );
}
