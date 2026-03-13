import { useState } from "react";
import { postPermissions } from "../../API/permissions";
import TextInput from "../Inputs/TextInput";

export default function CollaboratorForm({ projectId,addCollaborator, setAddCollaborator }) {
  const [permissionsData, setPermissionsData] = useState({
    email: "",
    role: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPermissionsData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postPermissions(projectId, permissionsData);
      
      //maybe set permissions if we need to display them
      setPermissionsData({
        email: "",
        role: "",
      });
    } catch (err) {
      console.error("Error setting new Collaborator:", err);
    }
  }

  return (
  addCollaborator && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-(--color-secondary) rounded-xl shadow-lg w-full max-w-md p-6 mx-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div className="flex justify-between items-center">
            <label
              htmlFor="Roles"
              className="block text-m font-medium text-(--color-font-primary)"
            >
              Add Section
            </label>

            <button
              type="button"
              onClick={() => setAddCollaborator(false)}
              className="text-(--color-font-secondary) hover:text-(--color-font-primary) rounded-lg w-8 h-8 inline-flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <TextInput
            name="email"
            inputLabel="Enter Collaborators E-Mail"
            data={permissionsData.email}
            handleChange={handleChange}
          />

          <select
            id="Roles"
            name="role"
            defaultValue=""
            onChange={handleChange}
            className="bg-(--color-secondary) border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-lg
                       focus:ring-(--color-button-focus) focus:border-(--color-button-focus) block w-full p-2.5"
          >
            <option value="" disabled>
              Choose Permission Type
            </option>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
          </select>

          <button
            type="submit"
            className="mt-2 text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover) 
                       focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  )
);}